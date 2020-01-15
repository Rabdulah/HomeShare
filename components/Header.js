import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
});
const Header = ({ name, address }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{address}</Text>
    </View>
  );
};

export default Header;
