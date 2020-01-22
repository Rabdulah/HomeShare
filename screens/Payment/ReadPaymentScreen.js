import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Layout } from '@ui-kitten/components';

import { viewPayment } from '../../actions';

class ReadPaymentScreen extends Component {
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
