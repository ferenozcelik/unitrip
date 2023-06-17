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

const CreateRideInputBox = () => {
  return (
    <TextInput
      style={styles.inputBox}
      keyboardType={'default'}
      placeholder={'Departure s'}
      placeholderTextColor={colors.grey}
    />
  );
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: colors.white,
    width: 240,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default CreateRideInputBox;
