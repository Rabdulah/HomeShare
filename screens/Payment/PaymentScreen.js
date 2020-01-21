import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Layout, Text, Card } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import HeaderCard from '../../components/HeaderCard';
import ItemCard from '../../components/ItemCard';
import { viewPayment } from '../../actions';

const payments = [
  {
    _id: 0,
    cost: 30,
    name: 'Internet',
    payees: [
      {
        amount: 10,
        isPaid: false,
        user: 'matt'
      },
      {
        amount: 10,
        isPaid: false,
        user: 'spencer'
      }
    ]
  },
  {
    _id: 1,
    cost: 36,
    name: 'Furnace',
    payees: [
      {
        amount: 10,
        isPaid: false,
        user: 'spencer'
      },
      {
        amount: 10,
        isPaid: false,
        user: 'ramzi'
      }
    ]
  },
  {
    _id: 2,
    cost: 18,
    name: 'Hydro',
    payees: [
      {
        amount: 10,
        isPaid: false,
        user: 'matt'
      },
      {
        amount: 10,
        isPaid: false,
        user: 'ramzi'
      }
    ]
  }
];

class PaymentScreen extends Component {
  componentDidMount() {
    // get list of payments from backend
  }

  onPaymentPress = paymentId => {
    // get payment
    const selectedPayment = payments.find(payment => payment._id === paymentId);

    // dispatch action to set current payment being viewed
    this.props.viewPayment(selectedPayment);

    // navigate to ViewPaymentScreen
    this.props.navigation.navigate('readPayment');
  };

  renderPayments = () => {
    return payments.map((payment, index) => {
      return (
        <ItemCard
          key={payment._id}
          cost={payment.cost}
          name={payment.name}
          _id={payment._id}
          onPress={this.onPaymentPress}
        />
      );
    });
  };

  render() {
    return (
      <Layout style={{ padding: 16, flex: 1, flexDirection: 'column' }}>
        <HeaderCard />
        <ScrollView vertical>{this.renderPayments()}</ScrollView>
        <Button
          status="success"
          onPress={() => {
            this.props.navigation.navigate('addPayment');
          }}
        >
          Add a payment
        </Button>
      </Layout>
    );
  }
}

export default connect(null, { viewPayment })(PaymentScreen);
