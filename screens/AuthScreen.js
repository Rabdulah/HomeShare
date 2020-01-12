import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import Firebase from 'firebase';

import Input from '../components/Input';
import { emailChanged, passwordChanged } from '../actions';

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
  }
});

class AuthScreen extends Component {
  constructor(props) {
    super(props);
  }

  doFirebaseLogin = () => {
    // do firebase login
    console.log('woof');
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
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.subTitle}>Login in to HomeShare</Text>
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
        <Button
          title="Log In"
          onPress={this.doFirebaseLogin}
        />
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
    password: state.auth.password
  }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged })(AuthScreen);