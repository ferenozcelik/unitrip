import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SmallDriverStarComponent = props => {
  return (
    <FontAwesome
      name="star"
      size={14}
      color={colors.gold}
      style={styles.driverStar}
    />
  );
};

const styles = StyleSheet.create({
  driverStar: {
    marginRight: 2,
  },
});

export default SmallDriverStarComponent;
