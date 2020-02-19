import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Layout, Text } from '@ui-kitten/components';

import {
  groupAddressChanged,
  groupNameChanged,
  addGroup,
  clearErrors,
  inviteEmailChanged,
  sendInvite
} from '../actions';

import Input from '../components/Input';
import Spinner from '../components/Spinner';
import AuthStyles from '../styles/auth';
import { DARK_BLUE } from '../styles/colours';

class SendInviteScreen extends Component {
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

  onEmailChanged = text => {
    this.props.inviteEmailChanged(text);
  };


  onButtonPress = () => {
    this.props.sendInvite(this.props);
  };

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner size="small" colour={DARK_BLUE} />;
    }

    return (
      <Button
        title="Send Invite"
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
            secure
            secureTextEntry
            placeholder="Roomate's email"
            onChangeText={this.onEmailChanged}
            secure={false}
            value={this.props.inviteEmail}
            label="Email"
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
    group: state.auth.group,
    address: state.auth.groupAddress,
    groupName: state.auth.groupName,
    error: state.auth.errorGroup,
    loading: state.auth.loading,
    inviteEmail: state.auth.invitationEmail
  };
};
export default connect(mapStateToProps, {
  groupAddressChanged,
  groupNameChanged,
  addGroup,
  clearErrors,
  inviteEmailChanged,
  sendInvite
})(SendInviteScreen);
