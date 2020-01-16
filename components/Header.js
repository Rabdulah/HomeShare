import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  text: {
    fontWeight: 'bold'
  }
});
const Header = ({ title, subtitle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{subtitle}</Text>
    </View>
  );
};

export default Header;
