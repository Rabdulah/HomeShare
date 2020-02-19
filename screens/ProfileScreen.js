import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import {
  emailChanged,
  fnameChanged,
  lnameChanged,
  usernameChanged,
  signupUser,
  clearErrors,
  leaveGroup
} from '../actions';
import AuthStyles from '../styles/auth';
import { Layout, ListItem } from '@ui-kitten/components';
import { DARK_BLUE } from '../styles/colours';

class ProfileScreen extends Component {
  renderGroupInfo = () => {
    if (this.props.inGroup) {
      return (
        <View>
          <Text style={AuthStyles.subTitle}>Group Details</Text>
          <Text>Name: {this.props.groupInfo.name}</Text>
          <Text>address: {this.props.groupInfo.address}</Text>
        </View>
      );
    }
  };

  renderPendingInvites = () => {
    // We will not show invites if you are in a group
    if(this.props.inGroup && this.props.pendingInvites) {
      return (
        <View>
          <Text style={AuthStyles.subTitle}>Pending Invites</Text>
          <ListItem></ListItem>
        </View>
      );
    }
  }

  renderButton = () => {
    let title;
    if (this.props.inGroup) {
      title = 'Leave Group';
    } else {
      title = 'Create Group';
    }
    return (
      <Button
        title={title}
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

  onButtonPress = () => {
    if (this.props.inGroup) {
      this.props.leaveGroup();
    } else {
      this.props.navigation.navigate('createGroup');
    }
  };

  render() {
    return (
      <Layout style={AuthStyles.container}>
        <View>
          <Text style={AuthStyles.subTitle}>User Profile</Text>
          <Text>First Name: {this.props.firstName}</Text>
          <Text>Last Name: {this.props.lastName}</Text>
          <Text>Email: {this.props.email}</Text>
          <Text>Username: {this.props.username}</Text>
          {this.renderGroupInfo()}
          {this.renderButton()}
          {this.renderPendingInvites()}
        </View>
      </Layout>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    email,
    loading,
    firstName,
    lastName,
    username,
    user,
    inGroup,
    groupInfo,
    pendingInvites
  } = auth;

  return {
    email,
    loading,
    firstName,
    lastName,
    username,
    user,
    inGroup,
    groupInfo,
    pendingInvites
  };
};
export default connect(mapStateToProps, {
  emailChanged,
  fnameChanged,
  lnameChanged,
  usernameChanged,
  signupUser,
  clearErrors,
  leaveGroup
})(ProfileScreen);
