import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import { DARK_BLUE, LIGHT_GREY_TEXT } from '../styles/colours';

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 5
  },
  text: {
    fontWeight: 'bold',
    color: DARK_BLUE,
    fontSize: 18
  }
});

const nameToInitials = name => {
  const initials = name.firstName.charAt(0) + name.lastName.charAt(0);
  return initials.toUpperCase();
};

class Header extends Component {
  componentDidMount() { }

  render() {
    const { firstName, shortFormAddress } = this.props.info;
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{firstName}</Text>
          <Text style={{ color: LIGHT_GREY_TEXT }}>{shortFormAddress}</Text>
        </View>
      </View>
    );
  }
}

export default Header;
