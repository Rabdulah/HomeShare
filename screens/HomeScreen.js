import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PaymentConfig from '../configs/paymentConfig';

class HomeScreen extends Component {
  create = () => {
    PaymentConfig.shared.createPayment();
  };
  read = () => {
    PaymentConfig.shared.getPayments();
  };
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Button title="add" onPress={this.create} />
        <Button title="read" onPress={this.read} />
      </View>
    );
  }
}

export default HomeScreen;
