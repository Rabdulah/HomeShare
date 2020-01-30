import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Firebase from 'firebase';
import LottieView from 'lottie-react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import config from '../configs/firebaseConfig';

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16
  }
});

const slides = [
  {
    key: 's1',
    title: 'Welcome To HomeShare',
    titleStyle: styles.title,
    textStyle: styles.text,
    animation: 'one',
    image: {
      uri:
        'http://aboutreact.com/wp-content/uploads/2018/08/mobile_recharge.png'
    },
    imageStyle: styles.image,
    backgroundColor: '#20d2bb'
  },
  {
    key: 's2',
    title: 'Track chores, bills, and errands',
    titleStyle: styles.title,
    animation: 'two',
    imageStyle: styles.image,
    backgroundColor: '#febe29'
  },
  {
    key: 's3',
    title: 'Organize your home!',
    titleStyle: styles.title,
    animation: 'three',
    image: require('../assets/6052-checklist.json'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5'
  }
];

class WelcomeScreen extends Component {
  componentDidMount() {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(config);
    }
  }

  onSlidesComplete = () => {
    const { navigation } = this.props;
    navigation.navigate('signup');
  };

  renderItem = ({ item }) => {
    const helper = animation => {
      switch (animation) {
        case 'one':
          return require('../assets/6936-class-ninjas-floating-ninja.json');
        case 'two':
          return require('../assets/3164-coinfall.json');
        case 'three':
          return require('../assets/6052-checklist.json');
      }
    };
    return (
      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: item.backgroundColor
        }}
      >
        <View
          style={{
            textAlign: 'center',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: 'white',
              fontWeight: '300',
              paddingHorizontal: 16
            }}
          >
            {item.title}
          </Text>
        </View>
        <View style={{ flex: 2.5 }}>
          <LottieView
            source={helper(item.animation)}
            autoPlay
            style={{ height: 300, width: 300 }}
          />
        </View>
      </Layout>
    );
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this.renderItem}
        onDone={this.onSlidesComplete}
        showSkipButton
        onSkip={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;
