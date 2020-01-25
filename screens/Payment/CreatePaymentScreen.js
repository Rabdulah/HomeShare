import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Input as KittenInput, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createPayment } from '../../actions';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

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
      cost: ''
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

  onCheckmarkPress = () => {
    const { paymentDescription, cost } = this.state;
    const payment = {
      name: paymentDescription,
      cost,
      payees: []
    };
    this.props.createPayment(payment);
  };

  numToTwoDecimalPlaces = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  renderCostPerPerson = totalCost => {
    const costPerPerson = totalCost / 3; // hard coded, should be fixed later
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
            <Text>{this.props.payments.length}</Text>
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
  const { user, groupInfo } = auth;
  const { payments } = payment;

  return { user, groupInfo, payments };
};
export default connect(mapStateToProps, { createPayment })(CreatePaymentScreen);
