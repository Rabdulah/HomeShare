import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text, Input as KittenInput } from '@ui-kitten/components';
import firebase from 'firebase';
import { DARK_BLUE } from '../../styles/colours';

class UpdatePaymentScreen extends Component {
  // specify custom header in navigationOptions
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'white'
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color={DARK_BLUE}
            style={{ paddingHorizontal: 16 }}
          />
        </TouchableOpacity>
      );
    },
    headerTitle: () => (
      <Text style={{ fontWeight: 'bold' }}>Edit Payment Info</Text>
    )
  });

  constructor(props) {
    super(props);

    this.firstInput = React.createRef();
    this.secondInput = React.createRef();
    this.state = {
      paymentDescription: '',
      cost: '',
      loading: false
    };
  }

  componentDidMount() {
    // create shallow copy
    const currentPaymentCopy = { ...this.props.currentPayment };
    this.setState({
      paymentDescription: currentPaymentCopy.name,
      cost: currentPaymentCopy.cost
    });
    this.firstInput.current.focus();
  }

  onDescriptionChange = text => {
    this.setState({ paymentDescription: text });
  };

  onCostChange = num => {
    this.setState({ cost: num });
  };

  onCheckmarkPress = () => {
    const { paymentDescription, cost } = this.state;
    const { currentPayment, navigation, allUsersInGroup, user } = this.props;
    // create updatedFields object:
    /*
      1.) update cost and name, 
      2.) update payees array cuz each
          person now has a different share to pay
    */

    // create copy of payees arr
    let updatedPayees = [...currentPayment.payees];

    // get cost per person
    const costPerPerson = cost / allUsersInGroup.length;

    // map oldPayees arr with new cost
    // set all other users' isPaid flag to false for now
    updatedPayees = updatedPayees.map(payee => {
      const isPaid = payee.user.id === user;
      return { ...payee, amount: costPerPerson, isPaid };
    });
    const updatedFields = {
      cost,
      name: paymentDescription,
      payees: updatedPayees
    };

    // update firebase
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

  renderCostPerPerson = totalCost => {
    const { allUsersInGroup } = this.props;
    const costPerPerson = totalCost / allUsersInGroup.length;
    return `($${this.numToTwoDecimalPlaces(costPerPerson)}/person)`;
  };

  render() {
    const { cost, paymentDescription } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <Layout style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            scrollEnabled={false}
          >
            <KittenInput
              placeholder="Payment description"
              onChangeText={this.onDescriptionChange}
              ref={this.firstInput}
              style={{
                fontSize: 16,
                backgroundColor: '#f0eeee',
                width: '60%'
              }}
              size="large"
              returnKeyType="next"
              value={paymentDescription}
              onSubmitEditing={() => {
                this.secondInput.current.focus();
              }}
              autoCorrect={false}
            />
            <KittenInput
              placeholder="0.00"
              onChangeText={this.onCostChange}
              value={cost}
              keyboardType="number-pad"
              style={{
                fontSize: 16,
                backgroundColor: '#f0eeee',
                width: '60%'
              }}
              size="large"
              ref={this.secondInput}
              returnKeyType="go"
            />
            <Text style={{ margin: 10 }}>{this.renderCostPerPerson(cost)}</Text>
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
        </Layout>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth, payment }) => {
  const { currentPayment } = payment;
  const { allUsersInGroup, user } = auth;

  return { currentPayment, allUsersInGroup, user };
};
export default connect(mapStateToProps, null)(UpdatePaymentScreen);
