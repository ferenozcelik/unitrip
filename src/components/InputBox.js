import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';

const InputBox = props => {
  return (
    <TextInput
      style={styles.inputBox}
      keyboardType={props.keyboardType}
      placeholder={props.placeholder}
      placeholderTextColor={colors.darkblue}
      secureTextEntry={props.secureTextEntry}
      value={props.value}
      onChangeText={props.onChangeText}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#3985A1',
    width: 320,
    height: 70,
    borderRadius: 35,
    paddingLeft: 30,
    paddingRight: 20,
    marginBottom: 20,
    borderColor: colors.darkblue,
    borderWidth: 1.5,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
  },
});

export default InputBox;
