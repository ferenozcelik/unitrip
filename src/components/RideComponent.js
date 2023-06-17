import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../assets/colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import testImage from '../assets/images/testImage.jpg';
import SmallDriverStarComponent from './SmallDriverStarComponent';
import Collapsible from 'react-native-collapsible';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {
  auth,
  db,
  addBooking,
  removeBooking,
  finishRide,
  userHasActiveBooking,
} from '../../firebase';

const RideComponent = props => {
  const item = props.item;

  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const unsub = onSnapshot(doc(db, 'users', auth.currentUser.uid), doc => {
    setCurrentUserEmail(doc.data().email);
  });

  const [activeBooking, setActiveBooking] = useState(null);
  const usersActiveBookingQuery = query(
    collection(db, 'rides'),
    where('status', '==', true),
    where('passengers', 'array-contains', currentUserEmail),
  );

  const [activeRide, setActiveRide] = useState(null);
  const usersActiveRideQuery = query(
    collection(db, 'rides'),
    where('status', '==', true),
    where('driverEmail', '==', currentUserEmail),
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(usersActiveBookingQuery, querySnapshot => {
      setActiveBooking(!querySnapshot.empty);
      querySnapshot.forEach(doc => {
        // doc yoksa buraya hiç girmiyor
      });
    });

    const unsubscribe2 = onSnapshot(usersActiveRideQuery, querySnapshot => {
      setActiveRide(!querySnapshot.empty);
      querySnapshot.forEach(doc => {
        // doc yoksa buraya hiç girmiyor
      });
    });
  }, [usersActiveBookingQuery, usersActiveRideQuery]);

  const [collapsed, setCollapsed] = useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  return (
    // <MenuProvider style={styles.container} skipInstanceCheck={true}></MenuProvider>
    <View style={styles.container}>
      <View style={styles.componentBox}>
        <View style={styles.rideInfoContainer}>
          <Image source={{uri: item.driverPhoto}} style={styles.driverImage} />
          <View style={styles.rideDetailsContainer}>
            <View style={styles.driverStarContainer}>
              <SmallDriverStarComponent />
              <SmallDriverStarComponent />
              <SmallDriverStarComponent />
            </View>

            <View style={styles.spacer}></View>

            <Text style={styles.driverName}>{item.driverName}</Text>

            {/* user's own ride information text */}
            {(() => {
              if (item.driverEmail == currentUserEmail) {
                return <Text style={styles.ownRideText}>Your own ride</Text>;
              }
              return;
            })()}

            <View style={styles.spacer}></View>

            <View style={styles.rideTimeContainer}>
              <Text style={styles.rideTimeText}>Time: </Text>
              <Text style={styles.rideTime}>{item.date}</Text>
            </View>

            <View style={styles.spacer}></View>

            <View style={styles.rideLocationContainer}>
              <Text style={styles.rideLocationText}>Departure: </Text>
              <Text style={styles.rideLocation}>{item.startLocation}</Text>
            </View>

            <View style={styles.spacer}></View>

            <View style={styles.rideLocationContainer}>
              <Text style={styles.rideLocationText}>Destination: </Text>
              <Text style={styles.rideLocation}>{item.endLocation}</Text>
            </View>

            <View style={styles.spacer}></View>

            <View style={styles.rideSeatsContainer}>
              <Text style={styles.rideSeatsText}>Left Seats: </Text>
              <Text style={styles.rideOccupiedSeats}>
                {item.numberOfSeat - item.passengers.length}
              </Text>
              <Text style={styles.slash}> / </Text>
              <Text style={styles.rideMaxSeats}>{item.numberOfSeat}</Text>
            </View>

            {/* <View style={styles.spacer}></View> */}

            <Collapsible collapsed={collapsed} align="top" duration={200}>
              <View style={styles.spacer}></View>

              <View style={styles.collapsibleContentContainer}>
                <View style={styles.collapsibleContent}>
                  <View style={styles.collapsibleContentTextContainer}>
                    <Text style={styles.collapsibleContentText}>
                      Car Model:{' '}
                    </Text>
                    <Text style={styles.collapsibleContentSubText}>
                      {item.carModel}
                    </Text>
                  </View>

                  <View style={styles.spacer}></View>

                  <View style={styles.collapsibleContentTextContainer}>
                    <Text style={styles.collapsibleContentText}>
                      Plate Number:{' '}
                    </Text>
                    <Text style={styles.collapsibleContentSubText}>
                      {item.plateNo}
                    </Text>
                  </View>
                  <View style={styles.spacer}></View>
                  <View>
                    {(() => {
                      // ride booked by the user
                      if (item.passengers.includes(currentUserEmail)) {
                        return (
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => {
                              removeBooking(item.id, currentUserEmail);
                              Alert.alert(
                                'Info',
                                'Booking cancelled successfully',
                                [{text: 'OK'}],
                              );
                            }}>
                            <Text style={styles.actionButtonText}>
                              Cancel Booking
                            </Text>
                          </TouchableOpacity>
                        );

                        // user's own ride
                      } else if (item.driverEmail == currentUserEmail) {
                        return (
                          <TouchableOpacity
                            style={styles.actionButton}
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
                                      finishRide(item.id);
                                      Alert.alert(
                                        'Info',
                                        'Ride started successfully',
                                        [{text: 'OK'}],
                                      );
                                    },
                                  },
                                ],
                              );
                            }}>
                            <Text style={styles.actionButtonText}>
                              Start Ride
                            </Text>
                          </TouchableOpacity>
                        );
                      }

                      // ride not booked by the user yet
                      return (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => {
                            if (
                              !activeBooking &&
                              !activeRide &&
                              item.numberOfSeat - item.passengers.length != 0
                            ) {
                              addBooking(item.id, currentUserEmail);
                              Alert.alert('Info', 'Ride booked successfully', [
                                {text: 'OK'},
                              ]);
                            } else {
                              Alert.alert(
                                'Warning',
                                'Failed to book this ride. The reasons maybe:\n- You have already booked a ride\n- You have already created a ride\n- No seats available',
                              );
                            }
                          }}>
                          <Text style={styles.actionButtonText}>Book</Text>
                        </TouchableOpacity>
                      );
                    })()}
                  </View>
                </View>
              </View>
            </Collapsible>
          </View>

          {collapsed ? (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={toggleExpanded}
              hitSlop={15}>
              <Entypo
                name="chevron-with-circle-down"
                size={38}
                color={colors.white}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={toggleExpanded}
              hitSlop={15}>
              <Entypo
                name="chevron-with-circle-up"
                size={38}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  componentBox: {
    width: '95%',
    backgroundColor: colors.aqua,
    borderRadius: 15,
    marginBottom: '4%',
    borderColor: colors.bluegrey,
    borderWidth: 1,
  },
  rideInfoContainer: {
    flexDirection: 'row',
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    // justifyContent: 'space-between', // check this
  },
  spacer: {
    marginTop: '3%',
  },
  driverImage: {
    width: 54,
    height: 54,
    borderRadius: 54,
    borderColor: colors.white,
    borderWidth: 2,
    // alignSelf: 'flex-start',
  },
  rideDetailsContainer: {
    marginLeft: '7%',
    // paddingHorizontal: '5%',
    // width: '70%',
  },
  driverStarContainer: {
    flexDirection: 'row',
  },
  driverName: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    maxWidth: 210,
  },
  driverRideCountContainer: {
    flexDirection: 'row',
  },
  driverRideCount: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  driverRideCountText: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  rideSeatsContainer: {
    flexDirection: 'row',
  },
  rideSeatsText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  rideOccupiedSeats: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  slash: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  rideMaxSeats: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  rideTimeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 210,
    maxWidth: 210,
  },
  rideTimeText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  rideTime: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  rideLocationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 210,
    maxWidth: 210,
  },
  rideLocationText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  rideLocation: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  expandButton: {
    // position: 'relative',
    // alignItems: 'center',
    // alignSelf: 'center',
    marginLeft: '5%',
  },

  collapsibleContentContainer: {
    flexDirection: 'row',
  },
  collapsibleContent: {
    // marginBottom: '3%',
  },
  collapsibleContentTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 210,
    maxWidth: 210,
    // marginLeft: '26%',
  },
  collapsibleContentText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  collapsibleContentSubText: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    maxWidth: 210,
  },
  actionButton: {
    // alignSelf: 'center',
    width: '100%',
    height: 36,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.darkblue,
    maxWidth: 210,
  },
  actionButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: colors.darkblue,
  },
  ownRideText: {
    fontFamily: 'Montserrat-MediumItalic',
    fontSize: 14,
    color: colors.bluegrey,
    opacity: 1,
  },
});

export default RideComponent;
