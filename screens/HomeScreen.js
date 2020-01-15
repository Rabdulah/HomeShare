import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PaymentConfig from '../configs/paymentConfig';

class HomeScreen extends Component {
  onButtonPress = () => {
    PaymentConfig.shared.createPayment();
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
        <Button
          title="add"
          onPress={this.onButtonPress}
        />
      </View>
    );
  }
}

export default HomeScreen;
