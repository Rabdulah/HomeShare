import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BACKGROUND_LIGHT_GREY, DARK_BLUE } from '../styles/colours';

const styles = StyleSheet.create({
  avatarCircle: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_LIGHT_GREY,
    // borderWidth: 1.5,
    // borderColor: '#191919',
    marginRight: 12
  }
});
const Avatar = ({ initials, showFirstName, firstName }) => {
  return (
    <View>
      <View style={styles.avatarCircle}>
        <Text style={{ color: DARK_BLUE }}>{initials.toUpperCase()}</Text>
      </View>
      {showFirstName ? (
        <Text style={{ textAlign: 'center', width: 60, paddingVertical: 5, color: DARK_BLUE }}>
          {firstName}
        </Text>
      ) : null}
    </View>
  );
};

export default Avatar;
