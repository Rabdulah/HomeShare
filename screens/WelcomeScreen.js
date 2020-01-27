import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';
import Swiper from 'react-native-swiper';
import Firebase from 'firebase';
import LottieView from 'lottie-react-native';

import config from '../configs/firebaseConfig';
import Slides from '../components/Slides';
import { LIGHT_SEA_GREEN, ORANGE, MOONSTONE_BLUE } from '../styles/colours';

const COLOURS = {
  lightSeaGreen: '#1b9aaa',
  darkBlue: '#26547c',
  greyBlue: '#95afba',
  moonStoneBlue: '#64a6bd',
  orange: '#FF5700'
};

const SLIDE_DATA = [
  { text: 'Welcome to HomeShare', colour: LIGHT_SEA_GREEN },
  { text: 'Track chores, bills, and errands', colour: ORANGE },
  { text: 'Organize your home life!', colour: MOONSTONE_BLUE }
];

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6Eb'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#191919',
    fontSize: 30,
    textAlign: 'center'
    // fontWeight: 'bold'
  }
});

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
    this.props.navigation.navigate('signup');
  };

  render() {
    // return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Welcome to HomeShare</Text>
          <LottieView
            source={require('../assets/6936-class-ninjas-floating-ninja.json')}
            loop
            autoPlay
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Track chores, bills, and errands</Text>
          <LottieView
            source={require('../assets/3164-coinfall.json')}
            loop
            autoPlay
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Organize your home life!</Text>
          <LottieView
            source={require('../assets/6052-checklist.json')}
            loop
            autoPlay
            style={{ height: 300, width: 300 }}
          />
          <Button onPress={this.onSlidesComplete}>Continue!</Button>
        </View>
      </Swiper>
    );
  }
}

export default WelcomeScreen;
