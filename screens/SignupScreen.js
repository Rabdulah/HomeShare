import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { emailChanged, passwordChanged } from '../actions';
import Input from '../components/Input';
import Spinner from '../components/Spinner';
import { DARK_BLUE } from '../styles/colours';
import AuthStyles from '../styles/auth';

class SignupScreen extends Component {
  render() {
    return (
      <View style={AuthStyles.container}>
        <Text style={AuthStyles.subTitle}>Signup for HomeShare</Text>
        <Input
          placeholder="First Name"
          onChangeText={this.onFnameChange}
          value={this.props.firstName}
        />
        <Input
          placeholder="Last Name"
          onChangeText={this.onLnameChange}
          value={this.props.lastName}
        />
        <Input
          placeholder="Username"
          onChangeText={this.onUsernameChange}
          value={this.props.username}
        />
        <Input
          placeholder="Email"
          onChangeText={this.onEmailChange}
          secure={false}
          value={this.props.email}
        />
        <Input
          secure
          secureTextEntry
          placeholder="Password"
          onChangeText={this.onPasswordChange}
          value={this.props.password}
        />

        {/* {this.renderError()} */}
        <View style={[this.props.loading ? { marginTop: 14 } : { marginTop: 0 }]}>
          <Button
            title="Log In"
            buttonStyle={{
              borderRadius: 5,
              padding: 10,
              backgroundColor: DARK_BLUE,
            }}
            titleStyle={{
              width: '90%',
              fontSize: 20,
            }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

// note: first argument is "state";
// ({ auth }) gets you state.auth
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, firstName, lastName, username, user } = auth;

  return {
    email,
    password,
    error,
    loading,
    firstName,
    lastName,
    username,
    user,
  };
};
export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
})(SignupScreen);
