import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Layout, Text } from '@ui-kitten/components';

import {
  groupAddressChanged,
  groupNameChanged,
  addGroup,
  clearErrors
} from '../actions';

import Input from '../components/Input';
import Spinner from '../components/Spinner';
import AuthStyles from '../styles/auth';
import { DARK_BLUE } from '../styles/colours';

class CreateGroupScreen extends Component {
  componentDidMount() {
    this.props.clearErrors();
  }
  // Case Where group successfully created
  componentDidUpdate() {
    this.onCreateGroupComplete(this.props);
  }

  onCreateGroupComplete = props => {
    if (props.inGroup) {
      if (props.navigation.isFocused()) {
        props.navigation.navigate('profile');
      }
    }
  };

  onAddressChange = text => {
    this.props.groupAddressChanged(text);
  };

  onNameChange = text => {
    this.props.groupNameChanged(text);
  };

  onButtonPress = () => {
    this.props.addGroup(this.props);
  };

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner size="small" colour={DARK_BLUE} />;
    }

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
          <View
            style={[
              this.props.loading ? { marginVertical: 15 } : { marginTop: 0 }
            ]}
          >
            {this.renderButton()}
          </View>
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
    error: state.auth.errorGroup,
    loading: state.auth.loading,
    inGroup: state.auth.inGroup
  };
};
export default connect(mapStateToProps, {
  groupAddressChanged,
  groupNameChanged,
  addGroup,
  clearErrors
})(CreateGroupScreen);
