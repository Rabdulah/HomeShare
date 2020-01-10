import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Firebase from 'firebase';
import UserInput from '../components/UserInput';

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
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

  render() {
    const { email, password } = this.state;

    return (
      <View>
        <Text>Login in to HomeShare</Text>
        <UserInput 
          term={email}
          placeholder="Email"
          onTermChange={newTerm => this.setState({ email: newTerm })}
          onTermSubmit={() => {}}
          secure={false}
        />
        <UserInput
          secure
          term={password}
          secureTextEntry
          placeholder="Password"
          onTermChange={newTerm => this.setState({ password: newTerm })}
          onTermSubmit={() => {}}
        />
        <Button
          title="Log In"
          onPress={this.doFirebaseLogin}
        />
      </View>
    );
  } 
}

export default AuthScreen;