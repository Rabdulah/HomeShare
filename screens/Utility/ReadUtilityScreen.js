import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Layout } from '@ui-kitten/components';

import { viewUtility } from '../../actions';

class ReadUtilityScreen extends Component {
  render() {
    return (
      <Layout>
        <Text>ReadUtilityScreen</Text>
        <Text>ReadUtilityScreen</Text>
        <Text>ReadUtilityScreen</Text>
        <Text>ReadUtilityScreen</Text>
        <Text>ReadUtilityScreen</Text>
        <Text>ReadUtilityScreen</Text>
        <Text>ReadUtilityScreen</Text>
        <Text>{this.props.currentUtility.name}</Text>
      </Layout>
    );
  }
}

const mapStateToProps = ({ utility }) => {
  const { currentUtility } = utility;

  return { currentUtility };
};
export default connect(mapStateToProps, { viewUtility })(ReadUtilityScreen);
