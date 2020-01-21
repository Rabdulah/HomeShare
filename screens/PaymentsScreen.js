import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import PaymentFunctions from '../server/payment/PaymentFunctions';

class PaymentScreen extends Component {
  constructor() {
    super();
    this.state = { payments: [] };
  }

  create = () => {
    PaymentFunctions.shared.createPayment();
  };
  read = () => {
    PaymentFunctions.shared.getPayments(payment => {
      this.setState(previousState => {
        return {
          payments: [...previousState.payments, payment]
        };
      });
    });
  };
  update = () => {
    PaymentFunctions.shared.updatePayment('vmZ2ZeGtzgxotVar4CXz', {
      cost: 4,
      name: 'updatedfood'
    });
  };
  delete = () => {
    PaymentFunctions.shared.deletePayment('vECUNTlwFY87pTK1ndqF');
  };
  render() {
    return (
      <View>
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
    PaymentFunctions.shared.getPayments(payment => {
      this.setState(previousState => {
        return {
          payments: [...previousState.payments, payment]
        };
      });
    });
  }

  componentWillUnmount() {
    PaymentFunctions.shared.off();
  }
}

export default PaymentScreen;
