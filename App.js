import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/LoginScreen/loginScreen';
import RidesScreen from './src/screens/RidesScreen/ridesScreen';
import CreateScreen from './src/screens/CreateScreen/createScreen';
import ProfileScreen from './src/screens/ProfileScreen/profileScreen';
import RideDetailsScreen from './src/screens/RideDetailsScreen/rideDetailsScreen';
import colors from './src/assets/colors/colors';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="RidesScreen"
      shifting={true}
      activeColor={colors.lightblue}
      inactiveColor={colors.darkblue}
      keyboardHidesNavigationBar={true}
      barStyle={{
        backgroundColor: colors.white,
        height: '10%',
      }}
      screenOptions={
        {
          // tabBarActiveTintColor: colors.lightblue,
          // tabBarInactiveTintColor: colors.darkblue,
          // tabBarShowLabel: false,
          // tabBarStyle: {height: '9%', backgroundColor: colors.white},
          // tabBarHideOnKeyboard: true,
        }
      }>
      <Tab.Screen
        name="RidesScreen"
        component={RidesScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Rides',
          tabBarColor: '#D2AB20',
          tabBarIcon: ({color}) => (
            <FontAwesome5
              name="car-alt"
              size={28}
              color={color}
              // style={{paddingTop: 5}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Create Ride',
          tabBarIcon: ({color}) => (
            <AntDesign
              name="pluscircle"
              size={28}
              color={color}
              // style={{marginTop: 5}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="RideDetailsScreen"
        component={RideDetailsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Ride Details',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Ionicons
              name="md-person-sharp"
              size={28}
              color={color}
              // style={{paddingTop: 5}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
