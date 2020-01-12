import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppIntroSlider } from 'react-native-app-intro-slider';
import Firebase from 'firebase';
import Slides from '../components/Slides';
import config from '../configs/firebaseConfig';

const COLOURS = {
  lightSeaGreen: '#1b9aaa',
  darkBlue: '#26547c',
  greyBlue: '#95afba',
  moonStoneBlue: '#64a6bd',
  orange: '#FF5700'
};

const SLIDE_DATA = [
  { text: 'Welcome to HomeShare', colour: COLOURS.lightSeaGreen },
  { text: 'Track chores, bills, and errands', colour: COLOURS.orange },
  { text: 'Organize your home life!', colour: COLOURS.moonStoneBlue }
];

class WelcomeScreen extends Component {

//   async componentDidMount() {
//     await Firebase.auth()
//     .signInWithEmailAndPassword('ramzi@email.com', 'password');
//     console.log('okay?')
// }
componentDidMount() {
  if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
  }
}
  
  onSlidesComplete = () => {
    this.props.navigation.navigate('login');
  }

  render() {
    // if (this.state.showRealApp) {
    //   return this.props.navigation.navigate('home');
    // } else {
    //   return <AppIntroSlider slides={slides} renderItem={this._renderItem} bottomButton />;

    // }
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;