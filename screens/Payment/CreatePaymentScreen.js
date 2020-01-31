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

class CreatePaymentScreen extends Component {
  // specify custom header in navigationOptions
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const address = params ? params.address : null;
    return {
      header: () => {
        return (
          <Header
            style={{ backgroundColor: 'white' }}
            title={`${address}`}
            subtitle="Enter a Payment"
          />
        );
      }
    };
  };

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
    const { groupInfo, navigation } = this.props;
    navigation.setParams({
      address: groupInfo.address
    });

    this.firstInput.current.focus();
  }

  onDescriptionChange = text => {
    this.setState({ paymentDescription: text });
  };

  onCostChange = num => {
    this.setState({ cost: num });
  };

  createPayment = payment => {
    const paymentsRef = firebase.firestore().collection('payments');
    paymentsRef
      .add(payment)
      .then(() => {
        this.props.navigation.navigate('payments');
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log('err', err);
      });
  };

  onCheckmarkPress = () => {
    this.setState({ loading: true });
    const { paymentDescription, cost } = this.state;
    const { user } = this.props;
    const costPerPerson = cost / this.props.allUsersInGroup.length;
    const payees = this.props.allUsersInGroup.map(userInGroup => {
      return {
        isPaid: user === userInGroup.id,
        amount: costPerPerson,
        user: userInGroup
      };
    });

    // ADD OWNER PROPERTY
    const payment = {
      cost,
      date: new Date().getTime(),
      group: this.props.group,
      name: paymentDescription,
      payees,
      owner: this.props.user
    };
    this.createPayment(payment);
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
    const { paymentDescription, cost } = this.state;

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
              <TouchableOpacity>
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
  const { user, groupInfo, allUsersInGroup, group } = auth;
  const { payments } = payment;

  return { user, groupInfo, payments, group, allUsersInGroup };
};
export default connect(mapStateToProps, { createPayment })(CreatePaymentScreen);
