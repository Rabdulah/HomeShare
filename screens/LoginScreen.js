import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import Firebase from 'firebase';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import Input from '../components/Input';
import Spinner from '../components/Spinner';
import { DARK_BLUE } from '../styles/colours';

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 18,
    textAlign: 'left',
    marginVertical: 14
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 25
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 14,
    textAlign: 'left'
  }
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  doFirebaseLogin = () => {
    // do firebase login
    // Firebase.auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     navigation.navigate('Landing', {
    //       payload: email,
    //       typeOfLogin: 'Log In'
    //     });
    //   });
  };

  onEmailChange = (text) => {
    this.props.emailChanged(text);  
  };

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  };

  onButtonPress = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  };

  renderError = () => {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  };

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner size='small' colour={DARK_BLUE} />;
    }

    return (
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
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subTitle}>Login to HomeShare</Text>
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

        { this.renderError() }
        <View style={[this.props.loading ? {marginTop: 14} : {marginTop: 0} ]}>
          { this.renderButton() }
        </View>
      </View>
    );
  } 
}

/*
  first argument: our mapStateToProps function
  second argument: the action creator we want to "connect" to
  this function, which is imported at the top.

  now "emailChanged" is accessible via: this.props.emailChanged
*/
const mapStateToProps = state => { // state arg = our global app state
  /*
    return the property on the state obj we care about
    it is specifically state.AUTH b/c that is the value we assigned
    our reducer to in our combineReducers() call.

    our reducer produces the "email" property.
  */
  
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  }
}
export default connect(mapStateToProps, { 
  emailChanged, passwordChanged, loginUser
})(LoginScreen);