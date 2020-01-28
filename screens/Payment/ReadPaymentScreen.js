import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Layout, List, ListItem, Button } from '@ui-kitten/components';

import { ScrollView } from 'react-native';
import { viewPayment } from '../../actions';
import Header from '../../components/Header';
import HeaderCard from '../../components/HeaderCard';
import Avatar from '../../components/Avatar';

class ReadPaymentScreen extends Component {
  // specify custom header in navigationOptions
  // static navigationOptions = ({ navigation }) => {
  //   const { params } = navigation.state;
  //   return {
  //     header: () => {
  //       return (
  //         <Header
  //           style={{ backgroundColor: 'white' }}
  //           title="hello"
  //           subtitle="world"
  //         />
  //       );
  //     }
  //   };
  // };

  componentDidMount() {}

  nameToInitials = name => {
    // name = { firstName: '', lastName: '' }
    const initials = name.firstName.charAt(0) + name.lastName.charAt(0);
    return initials.toUpperCase();
  };

  renderAccessory = text => {
    return <Text>{text}</Text>;
  };

  renderItemIcon = () => {
    return <Text>Icon</Text>;
  };

  renderPayeeList = ({ item }) => {
    return (
      <ListItem
        title={`${item.user.name.firstName}`}
        style={{
          paddingVertical: 20,
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 1
        }}
        icon={() => {
          const initials = this.nameToInitials(item.user.name);
          return <Avatar initials={initials} />;
        }}
        accessory={() => {
          return (
            <Text style={{ textAlign: 'right' }}>
              {item.isPaid ? 'Paid' : 'Owes'}
              {'\n'}${item.amount}
            </Text>
          );
        }}
      />
    );
  };

  renderButtonText = () => {
    const { currentPayment, user } = this.props;
    const { payees } = currentPayment;
    if (currentPayment.owner === user) {
      return 'Go get your money!';
    }
    return 'Pay';
  };

  // check if the currently logged in user owes money
  doesLoggedInUserOweMoney = () => {
    const { currentPayment, user } = this.props;
    const { payees } = currentPayment;
    if (currentPayment.owner === user) {
      return true;
    }

    // find if user has paid other user back
    const loggedInPayee = payees.find(payee => payee.user.id === user);
    return loggedInPayee.isPaid;
  };

  render() {
    const { currentPayment, user } = this.props;
    const { payees } = currentPayment;

    // // filter payees to remove the owner of
    // const listOfPayeesWithoutOwner = payees.filter(
    //   payee => payee.user.id !== user
    // );

    // sort by paid, then not paid
    payees.sort((payeeA, payeeB) => {
      return payeeB.isPaid - payeeA.isPaid;
    });

    this.renderButtonText();

    return (
      <Layout
        style={{
          padding: 16,
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <HeaderCard
          title={`$${currentPayment.cost}`}
          subtitle={currentPayment.name}
        />
        <List
          data={currentPayment.payees}
          renderItem={this.renderPayeeList}
          style={{ backgroundColor: 'white' }}
        />
        <Button status="success" disabled={this.doesLoggedInUserOweMoney()}>
          {this.renderButtonText()}
        </Button>
      </Layout>
    );
  }
}

const mapStateToProps = ({ payment, auth }) => {
  const { currentPayment } = payment;
  const { user } = auth;
  return { currentPayment, user };
};
export default connect(mapStateToProps, { viewPayment })(ReadPaymentScreen);
