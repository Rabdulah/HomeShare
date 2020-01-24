import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Input as KittenInput } from '@ui-kitten/components';
import { Input as RNInput } from 'react-native-elements';

const Input = React.forwardRef((props, ref) => {
  const {
    value,
    placeholder,
    onChangeText,
    onTermSubmit,
    secure,
    label,
    containerStyle,
    keyboardType
  } = props;
  return (
    <View style={styles.backgroundStyle}>
      <KittenInput
        style={styles.inputStyle}
        size="small"
        value={value}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        onEndEditing={onTermSubmit}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        returnKeyType="next"
        textStyle={{
          height: 42,
          fontSize: 16
        }}
        ref={ref}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection: 'row',
    height: 60
    // padding: 10
    // backgroundColor: '#F0EEEE',
    // borderRadius: 5,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f0eeee'
  }
});

export default Input;
