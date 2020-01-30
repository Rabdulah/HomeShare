import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Layout, List, ListItem, Button } from '@ui-kitten/components';
import { NavigationEvents } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { viewPayment, getCurrentPayment } from '../../actions';
import HeaderCard from '../../components/HeaderCard';
import Avatar from '../../components/Avatar';
import { DARK_BLUE } from '../../styles/colours';

class ReadPaymentScreen extends Component {
  // specify custom header in navigationOptions

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      paddingHorizontal: 16
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color={DARK_BLUE}
            style={{ paddingHorizontal: 16 }}
          />
        </TouchableOpacity>
      );
    },
    headerTitle: () => <Text style={{ fontWeight: 'bold' }}>Payments</Text>,
    headerRight: () => {
      return (
        <TouchableOpacity>
          <Ionicons
            name="md-create"
            size={30}
            color={DARK_BLUE}
            style={{ paddingHorizontal: 16 }}
          />
        </TouchableOpacity>
      );
    }
  });

  componentDidMount() {
    this.getCurrentPaymentHelper();
  }

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
          paddingVertical: 15,
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

  getCurrentPaymentHelper = () => {
    const { getCurrentPayment, currentPaymentId } = this.props;
    getCurrentPayment(currentPaymentId);
  };

  render() {
    const { currentPayment, navigation } = this.props;
    const payees = currentPayment ? currentPayment.payees : [];

    // filter payees to remove the owner of
    // const listOfPayeesWithoutOwner = payees.filter(
    //   payee => payee.user.id !== user
    // );

    if (currentPayment) {
      // sort by paid, then not paid
      payees.sort((payeeA, payeeB) => {
        return payeeB.isPaid - payeeA.isPaid;
      });

      this.renderButtonText();
    }

    return (
      <>
        {currentPayment ? (
          <Layout
            style={{
              padding: 16,
              flex: 1,
              flexDirection: 'column'
            }}
          >
            <NavigationEvents onDidFocus={this.getCurrentPaymentHelper} />
            <HeaderCard
              title={`$${currentPayment.cost}`}
              subtitle={currentPayment.name}
            />
            <List
              data={currentPayment.payees}
              renderItem={this.renderPayeeList}
              style={{ backgroundColor: 'white' }}
            />
            <Button
              status="success"
              disabled={this.doesLoggedInUserOweMoney()}
              onPress={() => {
                navigation.navigate('payback');
              }}
            >
              {this.renderButtonText()}
            </Button>
          </Layout>
        ) : (
          <Layout>
            <Text>Loading...</Text>
          </Layout>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ payment, auth }) => {
  const { currentPaymentId, currentPayment } = payment;
  const { user } = auth;
  return { currentPaymentId, currentPayment, user };
};
export default connect(mapStateToProps, { viewPayment, getCurrentPayment })(
  ReadPaymentScreen
);
