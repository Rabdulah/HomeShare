import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  emailChanged,
  passwordChanged,
  fnameChanged,
  lnameChanged,
  usernameChanged,
  signupUser,
  clearErrors
} from '../actions';
import Input from '../components/Input';
import { DARK_BLUE } from '../styles/colours';
import AuthStyles from '../styles/auth';

class SignupScreen extends Component {
  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  onFnameChange = text => {
    this.props.fnameChanged(text);
  };

  onLnameChange = text => {
    this.props.lnameChanged(text);
  };

  onUsernameChange = text => {
    this.props.usernameChanged(text);
  };

  navigateToLogin = () => {
    this.props.navigation.navigate('login');
  };

  onButtonPress = () => {
    const { firstName, lastName, username, email, password } = this.props;

    this.props.signupUser({
      firstName,
      lastName,
      username,
      email,
      password
    });
  };

  onSignupComplete = props => {
    if (props.user) {
      this.props.navigation.navigate('home');
    }
  };

  renderError = () => {
    if (this.props.errorSignUp) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={AuthStyles.errorTextStyle}>
            {this.props.errorSignUp}
          </Text>
        </View>
      );
    }
  };

  componentDidUpdate() {
    this.onSignupComplete(this.props);
  }

  render() {
    return (
      <View style={AuthStyles.container}>
        <KeyboardAwareScrollView>
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

          {this.renderError()}
          <View
            style={[this.props.loading ? { marginTop: 14 } : { marginTop: 0 }]}
          >
            <Text style={{ marginBottom: 14 }}>
              Already have an account?{' '}
              <Text
                style={{
                  color: DARK_BLUE
                }}
                onPress={this.navigateToLogin}
              >
                Sign in here
              </Text>
              .
            </Text>
            <Button
              title="Log In"
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
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

// note: first argument is "state";
// ({ auth }) gets you state.auth
const mapStateToProps = ({ auth }) => {
  const {
    email,
    password,
    errorSignUp,
    loading,
    firstName,
    lastName,
    username,
    user
  } = auth;

  return {
    email,
    password,
    errorSignUp,
    loading,
    firstName,
    lastName,
    username,
    user
  };
};
export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  fnameChanged,
  lnameChanged,
  usernameChanged,
  signupUser,
  clearErrors
})(SignupScreen);
