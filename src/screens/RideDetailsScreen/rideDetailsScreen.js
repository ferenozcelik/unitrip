import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './rideDetailsScreenStyles';
import colors from '../../assets/colors/colors';
import logo from '../../assets/images/unitrip_logo.png';
import Entypo from 'react-native-vector-icons/Entypo';
import tumbleweed from '../../assets/images/tumbleweed.png';

import {getAuth} from 'firebase/auth';
import {
  auth,
  db,
  getCurrentUser,
  getActiveRides,
  finishRide,
} from '../../../firebase';
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

const RideDetailsScreen = ({navigation}) => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const unsub = onSnapshot(doc(db, 'users', auth.currentUser.uid), doc => {
    setUserName(doc.data().name);
    setUserEmail(doc.data().email);
    setUserPhoto(doc.data().photo);
  });

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [numberOfSeat, setNumberOfSeat] = useState('');
  const [carModel, setCarModel] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [rideId, setRideId] = useState();
  const [querySnapshotExists, setQuerySnapshotExists] = useState();
  const q = query(
    collection(db, 'rides'),
    where('status', '==', true),
    where('driverEmail', '==', userEmail),
  );

  /*
  const [passName, setPassName] = useState('');
  const getPassengerNames = passengerEmail => {
    const passengerQuery = query(
      collection(db, 'users'),
      where('email', '==', passengerEmail),
    );
    const passengerName = [];
    onSnapshot(passengerQuery, querySnapshot => {
      querySnapshot.forEach(doc => {
        passengerName.push(doc.data());
        setPassName(doc.data().name);
      });
    });
  };
  */

  const [passengerState, setPassengerState] = useState([]);
  const passengerNames = [];

  useEffect(() => {
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const rideInfo = [];
      // console.log(!querySnapshot.empty);
      setQuerySnapshotExists(!querySnapshot.empty);
      querySnapshot.forEach(doc => {
        // doc yoksa buraya hiç girmiyor
        rideInfo.push(doc.data());
        setRideId(doc.id);
        setStartLocation(doc.data().startLocation);
        setEndLocation(doc.data().endLocation);
        setNumberOfSeat(doc.data().numberOfSeat);
        setCarModel(doc.data().carModel);
        setPlateNo(doc.data().plateNo);
        setTime(doc.data().date);
        setPassengers(doc.data().passengers);
      });
    });
  }, [querySnapshotExists]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.titleText}>Your active ride details:</Text>
        <View style={styles.divider}></View>
      </View>

      {(() => {
        if (querySnapshotExists) {
          // if there is active ride
          return (
            <View style={styles.rideDetailsContainer}>
              <View style={styles.rideDetailsBox}>
                <View style={styles.rideDetailsInnerBox}>
                  <View style={styles.rideDetailsInfoContainer}>
                    <Image
                      source={{uri: userPhoto}}
                      style={styles.driverImage}
                    />
                    <View style={styles.rideDetailsTextContainer}>
                      <Text style={styles.driverName}>{userName}</Text>

                      <View style={styles.spacer}></View>

                      <View style={styles.rideDetailTextContainer}>
                        <Text style={styles.rideDetailTitleText}>Time: </Text>
                        <Text style={styles.rideDetailText}>{time}</Text>
                      </View>

                      <View style={styles.spacer}></View>

                      <View style={styles.rideDetailTextContainer}>
                        <Text style={styles.rideDetailTitleText}>
                          Departure:{' '}
                        </Text>
                        <Text style={styles.rideDetailText}>
                          {startLocation}
                        </Text>
                      </View>

                      <View style={styles.spacer}></View>

                      <View style={styles.rideDetailTextContainer}>
                        <Text style={styles.rideDetailTitleText}>
                          Destination:{' '}
                        </Text>
                        <Text style={styles.rideDetailText}>{endLocation}</Text>
                      </View>

                      <View style={styles.spacer}></View>

                      <View style={styles.rideDetailTextContainer}>
                        <Text style={styles.rideDetailTitleText}>
                          Left Seats:{' '}
                        </Text>
                        <Text style={styles.rideDetailText}>
                          {numberOfSeat - passengers.length}
                        </Text>
                        <Text style={styles.rideDetailText}> / </Text>
                        <Text style={styles.rideDetailText}>
                          {numberOfSeat}
                        </Text>
                      </View>

                      <View style={styles.spacer}></View>

                      <View style={styles.rideDetailTextContainer}>
                        <Text style={styles.rideDetailTitleText}>
                          Car Model:{' '}
                        </Text>
                        <Text style={styles.rideDetailText}>{carModel}</Text>
                      </View>

                      <View style={styles.spacer}></View>

                      <View style={styles.rideDetailTextContainer}>
                        <Text style={styles.rideDetailTitleText}>
                          Plate number:{' '}
                        </Text>
                        <Text style={styles.rideDetailText}>{plateNo}</Text>
                      </View>

                      <View style={styles.spacer}></View>

                      <View style={styles.passengersContainer}>
                        <View style={styles.passengersBoxContainer}>
                          <Text style={styles.passengersBoxText}>
                            PASSENGERS
                          </Text>
                        </View>
                        <View style={styles.passengersListContainer}>
                          {passengers.map(passenger => {
                            return (
                              <View
                                style={styles.passengersListItem}
                                key={passenger}>
                                <Entypo
                                  name="dot-single"
                                  size={20}
                                  color={colors.white}
                                  style={styles.passengersListItemBullet}
                                />
                                <Text style={styles.passengersListItemText}>
                                  {passenger}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>

                      <View style={{marginBottom: '3%'}}></View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.rideDetailsScreenButton}
                  onPress={() => {
                    Alert.alert(
                      'Warning',
                      'You are about to start your ride. Are you sure?',
                      [
                        {
                          text: 'No',
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            finishRide(rideId);
                            Alert.alert('Info', 'Ride started successfully', [
                              {text: 'OK'},
                            ]);
                          },
                        },
                      ],
                    );
                  }}>
                  <Text style={styles.rideDetailsScreenButtonText}>
                    START RIDE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        } else {
          // if there is no active ride
          return (
            <View style={styles.noDataWarningContainer}>
              <Image source={tumbleweed} style={styles.tumbleweed} />
              <View style={styles.noDataTextContainer}>
                {/* <Text style={styles.noDataText}>NO DATA</Text> */}
              </View>
              <View style={styles.noDataSubTextContainer}>
                <Text style={styles.noDataSubText}>
                  You don’t have any active rides.
                </Text>
                <Text style={styles.noDataSubText}>
                  Create a ride first to see the ride details.
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.rideDetailsScreenButton}
                  onPress={() => {
                    navigation.navigate('CreateScreen');
                  }}>
                  <Text style={styles.rideDetailsScreenButtonText}>
                    CREATE RIDE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      })()}
    </View>
  );
};

export default RideDetailsScreen;
