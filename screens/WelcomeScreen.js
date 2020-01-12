import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Firebase from 'firebase';

class WelcomeScreen extends Component {

//   async componentDidMount() {
//     await Firebase.auth()
//     .signInWithEmailAndPassword('ramzi@email.com', 'password');
//     console.log('okay?')
// }

 render() {
   return (
     <View>
       <Text>WelcomeScreen</Text>
       <Text>WelcomeScreen</Text>
       <Text>WelcomeScreen</Text>
       <Text>WelcomeScreen</Text>
       <Text>WelcomeScreen</Text>
       <Text>WelcomeScreen</Text>
     </View>
   );
 } 
}

export default WelcomeScreen;