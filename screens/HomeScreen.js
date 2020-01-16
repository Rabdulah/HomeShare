import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PaymentConfig from '../configs/paymentConfig';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = { payments: [] };
  }

  create = () => {
    PaymentConfig.shared.createPayment();
  };
  read = () => {
    PaymentConfig.shared.getPayments(payment => {
      console.log('homeascreen', payment);
      this.setState(previousState => {
        return {
          payments: [...previousState.payments, payment]
        };
      });
    });
  };
  update = () => {
    PaymentConfig.shared.updatePayment('vmZ2ZeGtzgxotVar4CXz', {
      cost: 4,
      name: 'updatedfood'
    });
  };
  delete = () => {
    PaymentConfig.shared.deletePayment('vECUNTlwFY87pTK1ndqF');
  };
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <FlatList
          keyExtractor={item => item._id}
          data={this.state.payments}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>
                  ID: {item._id} name: {item.name} cost: {item.cost}
                </Text>
              </View>
            );
          }}
        />
        <Button title="add" onPress={this.create} />
        <Button title="read" onPress={this.read} />
        <Button title="update" onPress={this.update} />
        <Button title="delete" onPress={this.delete} />
      </View>
    );
  }

  componentDidMount() {
    // PaymentConfig.shared.getPayments(payment => {
    //   console.log('homeascreen', payment);
    //   this.setState(previousState => ({
    //     payments: [...previousState, payment]
    //   }));
    // });
  }
  componentWillUnmount() {
    PaymentConfig.shared.off();
  }
}

export default HomeScreen;
