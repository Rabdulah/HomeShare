import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const UserInput = ({
  term,
  placeholder,
  onTermChange,
  onTermSubmit,
  secure
}) => {
  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        style={styles.inputStyle}
        value={term}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={newTerm => onTermChange(newTerm)}
        onEndEditing={onTermSubmit}
        secureTextEntry={secure}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection: 'row',
    backgroundColor: '#F0EEEE',
    marginBottom: 14,
    borderRadius: 5,
    height: 60,
    padding: 10
  },
  inputStyle: {
    flex: 1,
    fontSize: 16
  }
});

export default UserInput;
