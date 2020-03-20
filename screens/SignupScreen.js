import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

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
          <Text style={AuthStyles.errorTextStyle}>{this.props.errorSignUp}</Text>
        </View>
      );
    }
  };

  componentDidUpdate() {
    this.onSignupComplete(this.props);
  }

  render() {
    return (
      <KeyboardAvoidingView style={[{ padding: 25 }, { flex: 1 }]} behavior="height" enabled>
        <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 32,
              lineHeight: 32,
              fontWeight: 'bold',
              marginVertical: 5,
              padding: 0
            }}
          >
            Join HomeShare!
          </Text>
          <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)' }}> Register your account</Text>
        </View>
        <View style={{ flex: 2 }}>
          <ScrollView>
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
            <View style={[this.props.loading ? { marginTop: 14 } : { marginTop: 0 }]}>
              <Button
                title="Sign Up"
                buttonStyle={{
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 5,
                  marginBottom: 10,
                  backgroundColor: DARK_BLUE
                }}
                titleStyle={{
                  width: '90%',
                  fontSize: 20
                }}
                onPress={this.onButtonPress}
              />
              <Text style={{ marginBottom: 14, textAlign: 'center', fontSize: 16 }}>
                Already have an account?{' '}
                <Text
                  style={{
                    color: DARK_BLUE,
                    fontWeight: 'bold'
                  }}
                  onPress={this.navigateToLogin}
                >
                  Signin
                </Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// note: first argument is "state";
// ({ auth }) gets you state.auth
const mapStateToProps = ({ auth }) => {
  const { email, password, errorSignUp, loading, firstName, lastName, username, user } = auth;

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
