import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';

/*
  big gotcha: for any navigator, when it is rendered, react
  native will try / does render all screens for that navigator.

  handle it with config for navigation
*/
const AppNavigator = createBottomTabNavigator({
  /*
    just need to specify the diff screens we want
    the TabNavigator to show; do so by specifying a
    key-value pair (allows for programmatic navigation)
  */
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: { // nested nav
    screen: createBottomTabNavigator({
      home: { screen: HomeScreen },
      chat: { screen: ChatScreen },
      // review: {
      //   screen: createStackNavigator({
      //     review: { screen: ReviewScreen },
      //     settings: { screen: SettingsScreen }
      //   })
      // }
    })
  }
}, {
  // nav configuration options for initial tab navigator
  lazy: true,
  defaultNavigationOptions: {
    tabBarVisible: true // hide all initial tabs
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppContainer = createAppContainer(AppNavigator);

class AppNavigation extends Component {
  render() {
    return <AppContainer screenProps={this.props} />;
  }
}

/*
  connect: "connects" your compnents and actions together.

  i.e. your components can dispatch actions.
*/
export default connect(
  null,
  actions
)(AppNavigation);
