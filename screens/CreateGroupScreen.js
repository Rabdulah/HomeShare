import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Layout, Text } from '@ui-kitten/components';

import { groupAddressChanged, groupNameChanged, addGroup } from '../actions';

import Input from '../components/Input';
import AuthStyles from '../styles/auth';
import { DARK_BLUE } from '../styles/colours';

class CreateGroupScreen extends Component {
  onAddressChange = text => {
    this.props.groupAddressChanged(text);
  };
  onNameChange = text => {
    this.props.groupNameChanged(text);
  };

  onButtonPress = () => {
    this.props.addGroup(this.props)
  };

  renderButton = () => {
    return (
      <Button
        title="Create Group"
        buttonStyle={{
          borderRadius: 5,
          padding: 10,
          backgroundColor: DARK_BLUE
        }}
        titleStyle={{
          width: '90%',
          fontSize: 20
        }}
        onPress={this.onButtonPress}
      />
    );
  };

  renderError = () => {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={AuthStyles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <Layout style={AuthStyles.container}>
        <Layout style={{ flex: 3 }}>
          <Input
            placeholder="Name"
            onChangeText={this.onNameChange}
            secure={false}
            value={this.props.name}
            label="Name"
            containerStyle={{ marginVertical: 15 }}
          />
          <Input
            secure
            secureTextEntry
            placeholder="Address"
            onChangeText={this.onAddressChange}
            secure={false}
            value={this.props.address}
            label="Address"
            containerStyle={{ marginVertical: 15 }}
          />
          {this.renderError()}
          {this.renderButton()}
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  // state arg = our global app state
  /*
      return the property on the state obj we care about
      it is specifically state.AUTH b/c that is the value we assigned
      our reducer to in our combineReducers() call.
  
      our reducer produces the "email" property.
    */

  return {
    group: state.auth.groupInfo,
    address: state.auth.groupAddress,
    name: state.auth.groupName,
    error: state.auth.errorGroup
  };
};
export default connect(mapStateToProps, {
  groupAddressChanged,
  groupNameChanged,
  addGroup
})(CreateGroupScreen);
