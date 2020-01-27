import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import firebase from 'firebase';
import { NavigationEvents } from 'react-navigation';
import HeaderCard from '../../components/HeaderCard';
import ItemCard from '../../components/ItemCard';
import Spinner from '../../components/Spinner';
import { viewPayment, retrievePayments } from '../../actions';
import { DARK_BLUE } from '../../styles/colours';

// import React, { Component } from 'react';
// import { View, Text, Button, FlatList } from 'react-native';

// class PaymentScreen extends Component {

//   create = () => {
//     PaymentFunctions.shared.createPayment();
//   };

//   update = () => {
//     PaymentFunctions.shared.updatePayment('vmZ2ZeGtzgxotVar4CXz', {
//       cost: 4,
//       name: 'updatedfood'
//     });
//   };
//   delete = () => {
//     PaymentFunctions.shared.deletePayment('vECUNTlwFY87pTK1ndqF');
//   };
//   render() {
//     return (
//       <View>
//         <FlatList
//           keyExtractor={item => item._id}
//           data={this.state.payments}
//           renderItem={({ item }) => {
//             return (
//               <View>
//                 <Text>
//                   ID: {item._id} name: {item.name} cost: {item.cost}
//                 </Text>
//               </View>
//             );
//           }}
//         />
//         <Button title="add" onPress={this.create} />
//         <Button title="read" onPress={this.read} />
//         <Button title="update" onPress={this.update} />
//         <Button title="delete" onPress={this.delete} />
//       </View>
//     );
//   }

//   componentDidMount() {
//     PaymentFunctions.shared.getPayments(payment => {
//       this.setState(previousState => {
//         return {
//           payments: [...previousState.payments, payment]
//         };
//       });
//     });
//   }

//   componentWillUnmount() {
//     PaymentFunctions.shared.off();
//   }
// }

// export default PaymentScreen;

class PaymentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0
    };
  }

  componentDidMount() {
    this.retrievePaymentsHelper();
  }

  retrievePaymentsHelper = () => {
    const { group, retrievePayments } = this.props;
    firebase
      .firestore()
      .collection('payments')
      .where('group', '==', group)
      .get()
      .then(snapshot => {
        let payments = snapshot.docs.map(doc => {
          const { cost, date, name, owner, payees } = doc.data();
          return {
            cost,
            date,
            name,
            owner,
            payees,
            id: doc.id
          };
        });
        payments = payments.sort((a, b) => b.date - a.date);
        this.calculateBalance(payments);
        retrievePayments(payments);
      });
  };

  calculateBalance = payments => {
    const { user } = this.props;
    const balance = payments.reduce((totalBalance, currentPayment) => {
      // check if the currentPayment belongs to the logged in user
      const sign = currentPayment.owner === user ? 1 : -1;
      const currentPaymentBalance = currentPayment.payees.reduce(
        (currPaymentBalance, payee) => {
          return (payee.isPaid ? 0 : payee.amount) + currPaymentBalance;
        },
        0
      );

      return totalBalance + currentPaymentBalance * sign;
    }, 0);
    this.setState({ balance });
  };

  onPaymentPress = paymentId => {
    // get payment
    const { payments, viewPayment, navigation } = this.props;
    const selectedPayment = payments.find(payment => payment.id === paymentId);

    // dispatch action to set current payment being viewed
    viewPayment(selectedPayment);

    // navigate to ViewPaymentScreen
    navigation.navigate('readPayment');
  };

  renderPayments = () => {
    const { payments } = this.props;
    if (payments.length === 0) {
      return <Spinner size="small" colour={DARK_BLUE} />;
    }
    return payments.map((payment, index) => {
      return (
        <ItemCard
          key={payment.id}
          cost={payment.cost}
          name={payment.name}
          id={payment.id}
          onPress={this.onPaymentPress}
        />
      );
    });
  };

  render() {
    const { payments, navigation } = this.props;
    const { balance } = this.state;
    const headerCardSubtitle =
      balance >= 0 ? 'is owed to you.' : 'is the total you owe.';

    return (
      <Layout style={{ padding: 16, flex: 1, flexDirection: 'column' }}>
        <NavigationEvents onDidFocus={this.retrievePaymentsHelper} />
        <HeaderCard
          title={`$${Math.abs(balance)}`}
          subtitle={headerCardSubtitle}
        />
        <ScrollView
          vertical
          contentContainerStyle={[
            payments.length === 0
              ? { justifyContent: 'center', alignItems: 'center' }
              : {}
          ]}
        >
          {this.renderPayments()}
        </ScrollView>
        <Button
          status="success"
          onPress={() => {
            navigation.navigate('createPayment');
          }}
        >
          Add a payment
        </Button>
      </Layout>
    );
  }
}

const mapStateToProps = ({ payment, auth }) => {
  const { payments } = payment;
  const { group, user } = auth;

  return { payments, group, user };
};
export default connect(mapStateToProps, { viewPayment, retrievePayments })(
  PaymentScreen
);
