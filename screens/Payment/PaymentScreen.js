import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Layout, Text, Card } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import HeaderCard from '../../components/HeaderCard';
import ItemCard from '../../components/ItemCard';
import { viewPayment } from '../../actions';

// import React, { Component } from 'react';
// import { View, Text, Button, FlatList } from 'react-native';
// import PaymentFunctions from '../server/payment/PaymentFunctions';

// class PaymentScreen extends Component {
//   constructor() {
//     super();
//     this.state = { payments: [] };
//   }

//   create = () => {
//     PaymentFunctions.shared.createPayment();
//   };
//   read = () => {
//     PaymentFunctions.shared.getPayments(payment => {
//       this.setState(previousState => {
//         return {
//           payments: [...previousState.payments, payment]
//         };
//       });
//     });
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
  componentDidMount() {
    // get list of payments from backend
  }

  onPaymentPress = paymentId => {
    // get payment
    const { payments } = this.props;
    const selectedPayment = payments.find(payment => payment._id === paymentId);

    // dispatch action to set current payment being viewed
    this.props.viewPayment(selectedPayment);

    // navigate to ViewPaymentScreen
    this.props.navigation.navigate('readPayment');
  };

  renderPayments = () => {
    const { payments } = this.props;
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
            this.props.navigation.navigate('createPayment');
          }}
        >
          Add a payment
        </Button>
      </Layout>
    );
  }
}

const mapStateToProps = ({ payment }) => {
  const { payments } = payment;

  return { payments };
};
export default connect(mapStateToProps, { viewPayment })(PaymentScreen);
