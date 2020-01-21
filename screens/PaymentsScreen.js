import React, { Component } from 'react';
import { Icon, Button, Layout, Text, Card } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import HeaderCard from '../components/HeaderCard';

const payments = [
  {
    amount: 90,
    name: 'Internet'
  },
  {
    amount: 60,
    name: 'Furnace'
  },
  {
    amount: 30,
    name: 'Hydro'
  }
  // {
  //   amount: 30,
  //   name: 'Miscellaneous'
  // }
];

const ItemCard = ({ amount, name }) => {
  return (
    <Card>
      <Text>{amount}</Text>
      <Text>{name}</Text>
    </Card>
  );
};

class PaymentsScreen extends Component {
  renderPayments = () => {
    return payments.map((payment, index) => {
      return (
        <Card style={{ marginBottom: 10 }} key={payment.name}>
          <Text>{payment.amount}</Text>
          <Text>{payment.name}</Text>
        </Card>
      );
    });
  };

  render() {
    return (
      <Layout style={{ padding: 16, flex: 1, flexDirection: 'column' }}>
        <HeaderCard />
        <ScrollView vertical>{this.renderPayments()}</ScrollView>
        <Button status="success">Add a payment</Button>
      </Layout>
    );
  }
}

export default PaymentsScreen;
