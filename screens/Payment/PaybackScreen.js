import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Input as KittenInput, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { createPayment } from '../../actions';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import { DARK_BLUE } from '../../styles/colours';

class PaybackScreen extends Component {
  constructor(props) {
    super(props);

    this.firstInput = React.createRef();
    this.state = {
      payment: '',
      loading: false,
      currentPaymentPayee: null
    };
  }

  componentDidMount() {
    this.firstInput.current.focus();
    const currentPaymentPayee = {
      ...this.props.currentPayment.payees.find(
        payee => payee.user.id === this.props.user
      )
    };
    this.setState({ payment: currentPaymentPayee.amount, currentPaymentPayee });
    const usersRef = firebase.firestore().collection('users');
    usersRef
      .doc(this.props.currentPayment.owner)
      .get()
      .then(userDocument => {
        const { address, email, name } = userDocument.data();
        this.setState({ paymentOwnerDetails: { address, email, name } });
      });
  }

  usersRef = () => {
    return firebase.firestore().collection('users');
  };

  onPaymentChange = num => {
    this.setState({ payment: num });
  };

  onCheckmarkPress = () => {
    const { payment, currentPaymentPayee } = this.state;
    const { currentPayment, user, navigation } = this.props;
    // create updatedFields object:
    // create copy of payees arr
    let updatedPayees = [...currentPayment.payees];

    // find payee in arr, update property
    updatedPayees = updatedPayees.map(payee => {
      if (payee.user.id === user) {
        /* 
          return new copy of payee with
          "isPaid" === true (if they paid in full)
        */
        return {
          ...payee,
          isPaid: payment === currentPaymentPayee.amount
        };
      }
      return payee;
    });

    const updatedFields = {
      payees: updatedPayees
    };

    // update firebase
    console.log(currentPayment);
    firebase
      .firestore()
      .collection('payments')
      .doc(currentPayment.id)
      .update(updatedFields)
      .then(() => {
        navigation.navigate('readPayment');
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  onClosePress = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  numToTwoDecimalPlaces = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  renderIcon = () => {
    return <Text style={{ position: 'absolute', lineHeight: 25 }}>$</Text>;
  };

  render() {
    const { payment, currentPaymentPayee } = this.state;
    const { currentPayment } = this.props;
    const paymentOwnerDetails = this.state.paymentOwnerDetails
      ? this.state.paymentOwnerDetails
      : '';
    const firstName = paymentOwnerDetails
      ? paymentOwnerDetails.name.firstName
      : '';
    const amountOwed = currentPaymentPayee ? currentPaymentPayee.amount : 0;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            scrollEnabled={false}
          >
            <Text
              style={{
                fontSize: 25,
                lineHeight: 25,
                marginBottom: 15,
                textAlign: 'center'
              }}
            >
              You are paying {`${firstName}`} for: {'\n'}
              {currentPayment.name}
            </Text>
            <KittenInput
              placeholder="0.00"
              onChangeText={this.onPaymentChange}
              value={`${payment.toString()}`}
              keyboardType="number-pad"
              textStyle={{ paddingLeft: 5 }}
              style={{
                fontSize: 16,
                backgroundColor: '#f0eeee',
                width: '60%'
              }}
              icon={this.renderIcon}
              size="large"
              ref={this.firstInput}
              returnKeyType="go"
            />
            <Text style={{ margin: 10 }}>
              (${`${this.numToTwoDecimalPlaces(amountOwed - payment)}`} still
              owed)
            </Text>
            <Layout
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '60%'
              }}
            >
              <TouchableOpacity onPress={this.onClosePress}>
                <Ionicons name="md-close" size={40} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onCheckmarkPress}>
                <Ionicons name="md-checkmark" size={40} color="green" />
              </TouchableOpacity>
            </Layout>
          </ScrollView>
          <View style={{ flex: 0.25 }} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth, payment }) => {
  const { currentPayment } = payment;
  const { user } = auth;

  return { currentPayment, user };
};
export default connect(mapStateToProps, { createPayment })(PaybackScreen);
