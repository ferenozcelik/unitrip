import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './ridesScreenStyles';
import colors from '../../assets/colors/colors';
import logo from '../../assets/images/unitrip_logo.png';
import RideComponent from '../../components/RideComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

import {getAuth} from 'firebase/auth';
import {auth, db, getCurrentUser, getActiveRides} from '../../../firebase';
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';

const RidesScreen = ({navigation}) => {
  const rides = getActiveRides();

  const renderItem = ({item}) => <RideComponent item={item} />;

  return (
    <MenuProvider>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} />

            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder={'Type target location...'}
                placeholderTextColor={colors.grey}
              />
              <AntDesign
                name="search1"
                size={24}
                color={colors.black}
                style={styles.searchIcon}
              />
            </View>
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.resultModifyMainContainer}>
          <Menu>
            <MenuTrigger
              customStyles={{TriggerTouchableComponent: TouchableOpacity}}>
              <View style={styles.resultModifyContainer}>
                <Feather name="filter" size={20} color={colors.white} />
                <Text style={styles.resultModifyText}>Filter</Text>
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert('clicked 1')}>
                <Text style={{color: colors.black}}>Filter Option 1</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert('clicked 2')}>
                <Text style={{color: colors.black}}>Filter Option 2</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>

          <Menu>
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: TouchableOpacity,
              }}>
              <View style={styles.resultModifyContainer}>
                <MaterialIcons name="sort" size={20} color={colors.white} />
                <Text style={styles.resultModifyText}>Sort</Text>
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert('clicked 1')}>
                <Text style={{color: colors.black}}>Sort Option 1</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert('clicked 2')}>
                <Text style={{color: colors.black}}>Sort Option 2</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>

        <View style={styles.ridesContainer}>
          {/* <RideComponent /> */}
          <FlatList
            data={rides.sort((a, b) => b.date.localeCompare(a.date))}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </MenuProvider>
  );
};

export default RidesScreen;
