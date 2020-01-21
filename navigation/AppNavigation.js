import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import CreatePaymentScreen from '../screens/Payment/CreatePaymentScreen';
import ReadPaymentScreen from '../screens/Payment/ReadPaymentScreen';
/*
  big gotcha: for any navigator, when it is rendered, react
  native will try / does render all screens for that navigator.

  handle it with config for navigation
*/
const AppNavigator = createBottomTabNavigator(
  {
    /*
    just need to specify the diff screens we want
    the TabNavigator to show; do so by specifying a
    key-value pair (allows for programmatic navigation)
  */
    welcome: { screen: WelcomeScreen },
    auth: {
      screen: createStackNavigator(
        {
          signup: { screen: SignupScreen },
          login: { screen: LoginScreen }
        },
        {
          defaultNavigationOptions: {
            headerShown: false
          }
        }
      )
    },
    main: {
      // nested nav
      screen: createBottomTabNavigator({
        profile: { screen: ProfileScreen },
        home: createStackNavigator(
          {
            home: { screen: HomeScreen },
            payments: { screen: PaymentScreen },
            createPayment: { screen: CreatePaymentScreen },
            readPayment: { screen: ReadPaymentScreen }
          },
          {
            defaultNavigationOptions: {
              headerStyle: {
                backgroundColor: 'transparent'
              }
            }
          }
        ),
        chat: { screen: ChatScreen }
        // review: {
        //   screen: createStackNavigator({
        //     review: { screen: ReviewScreen },
        //     settings: { screen: SettingsScreen }
        //   })
        // }
      })
    }
  },
  {
    // nav configuration options for initial tab navigator
    lazy: true,
    defaultNavigationOptions: {
      tabBarVisible: false // hide all initial tabs
    }
  }
);

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
// export default connect(null, actions)(AppNavigation);
export default AppNavigation;
