import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Layout } from '@ui-kitten/components';

import { viewPayment } from '../../actions';
import Header from '../../components/Header';

class ReadPaymentScreen extends Component {
  // specify custom header in navigationOptions
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: () => {
        return (
          <Header
            style={{ backgroundColor: 'white' }}
            title="hello"
            subtitle="world"
          />
        );
      }
    };
  };

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <Text>ReadPaymentScreen</Text>
        <Text>ReadPaymentScreen</Text>
        <Text>ReadPaymentScreen</Text>
        <Text>ReadPaymentScreen</Text>
        <Text>ReadPaymentScreen</Text>
        <Text>ReadPaymentScreen</Text>
        <Text>ReadPaymentScreen</Text>
        <Text>{this.props.currentPayment.name}</Text>
      </Layout>
    );
  }
}

const mapStateToProps = ({ payment }) => {
  const { currentPayment } = payment;

  return { currentPayment };
};
export default connect(mapStateToProps, { viewPayment })(ReadPaymentScreen);
