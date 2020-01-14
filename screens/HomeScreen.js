import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { emailChanged } from '../actions';

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>{this.props.firstName}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName } = auth;

  return { firstName, lastName };
};
export default connect(mapStateToProps, { emailChanged })(HomeScreen);
