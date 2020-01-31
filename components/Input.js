import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input as KittenInput } from '@ui-kitten/components';

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
    <View style={[styles.backgroundStyle, containerStyle]}>
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
        label={label}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection: 'row',
    height: 60
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f0eeee'
  }
});

export default Input;
