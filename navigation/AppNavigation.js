import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import {
  PEWTER_BLUE,
  DARK_BLUE,
  MOONSTONE_BLUE,
  LIGHT_SEA_GREEN
} from '../styles/colours';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UtilityScreen from '../screens/Utility/UtilityScreen';
import CreateUtilityScreen from '../screens/Utility/CreateUtilityScreen';
import ReadUtilityScreen from '../screens/Utility/ReadUtilityScreen';
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
      screen: createMaterialBottomTabNavigator(
        {
          profile: {
            screen: ProfileScreen,
            navigationOptions: () => ({
              tabBarColor: '#C1EDCC',
              tabBarIcon: ({tintColor})=>(
                <Ionicons name="ios-person" size={22} color={tintColor} />
              )
            })
          },
          home: createStackNavigator(
            {
              home: { screen: HomeScreen },
              utility: { screen: UtilityScreen },
              createUtility: { screen: CreateUtilityScreen },
              readUtility: { screen: ReadUtilityScreen },
              payments: { screen: PaymentScreen },
              createPayment: { screen: CreatePaymentScreen },
              readPayment: { screen: ReadPaymentScreen }
            },
            {
              defaultNavigationOptions: {
                headerStyle: {
                  backgroundColor: 'transparent'
                }
              },
              navigationOptions: () => ({
                tabBarColor: '#B0C0BC',
                tabBarIcon: ({tintColor})=>(
                  <Ionicons name="ios-home" size={22} color={tintColor} />
                )
              })
            }
          ),
          chat: {
            screen: ChatScreen,
            navigationOptions: () => ({
              tabBarColor: '#A4A8A7',
              tabBarIcon: ({tintColor})=>(
                <Ionicons name="ios-chatboxes" size={22} color={tintColor}/>
              )
            })
          }
          // review: {
          //   screen: createStackNavigator({
          //     review: { screen: ReviewScreen },
          //     settings: { screen: SettingsScreen }
          //   })
          // }
        },
        {
          shifting: true,
          labeled: true,
          activeColor: LIGHT_SEA_GREEN,
          inactiveColor: 'grey',
          barStyle: {
            backgroundColor: 'white'
          }
        }
      )
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
