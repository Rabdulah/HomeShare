import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatarCircle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#191919'
  }
});
const Avatar = ({ initials }) => {
  return (
    <View style={styles.avatarCircle}>
      <Text>{initials.toUpperCase()}</Text>
    </View>
  );
};

export default Avatar;
