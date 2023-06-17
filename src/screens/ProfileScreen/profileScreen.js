import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './profileScreenStyles';
import colors from '../../assets/colors/colors';
import logo from '../../assets/images/unitrip_logo.png';
import testImage from '../../assets/images/testImage.jpg';
import BigDriverStarComponent from '../../components/BigDriverStarComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {auth, db} from '../../../firebase';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [bio, setBio] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const unsub = onSnapshot(doc(db, 'users', auth.currentUser.uid), doc => {
    setName(doc.data().name);
    setEmail(doc.data().email);
    setBio(doc.data().bio);
    setPhoto(doc.data().photo);
    setCountry(doc.data().country);
    setCity(doc.data().city);
    setSchoolName(doc.data().schoolName);
  });

  const ridesRef = collection(db, 'rides');
  const booksRef = collection(db, 'books');

  const [rideCount, setRideCount] = useState(0);
  const userRidesQuery = query(
    ridesRef,
    where('driverEmail', '==', email),
    where('status', '==', false),
  );

  const [bookingCount, setBookingCount] = useState(0);
  const userBooksQuery = query(
    ridesRef,
    where('passengers', 'array-contains', email),
    where('status', '==', false),
  );

  useEffect(() => {
    const unsubscribeRideCount = onSnapshot(userRidesQuery, querySnapshot => {
      setRideCount(querySnapshot.size);
    });

    const unsubscribeBookingCount = onSnapshot(
      userBooksQuery,
      querySnapshot => {
        setBookingCount(querySnapshot.size);
      },
    );
  }, [userRidesQuery, userBooksQuery]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[colors.lightblue, colors.darkblue]}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.signOutButtonContainer}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}>
            <FontAwesome name="sign-out" size={36} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileDetailsContainer}>
          <Image source={{uri: photo}} style={styles.driverImage} />
          <View style={styles.driverStarContainer}>
            <BigDriverStarComponent />
            <BigDriverStarComponent />
            <BigDriverStarComponent />
          </View>
          <Text style={styles.profileNameText}>{name}</Text>
          <Text style={styles.schoolText}>{schoolName}</Text>
          <Text style={styles.profileInfoText}>{bio}</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{city}</Text>
            <Text style={styles.addressText}> / </Text>
            <Text style={styles.addressText}>{country}</Text>
          </View>
          <View style={styles.rideStatMainContainer}>
            <View style={styles.rideStatContainer}>
              <Text style={styles.rideStat}>{rideCount}</Text>
              <Text style={styles.rideStatText}>Rides</Text>
            </View>
            <Text style={styles.horizontalDivider}>|</Text>
            <View style={styles.rideStatContainer}>
              <Text style={styles.rideStat}>{bookingCount}</Text>
              <Text style={styles.rideStatText}>Books</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.subDetailsContainer}>
        <Text style={styles.rideHistoryText}>Ride History</Text>

        <View style={styles.rideHistoryItem}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.rideHistoryItemText}>
                Termesos Hospital, Dosemealti
              </Text>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Date:</Text>
                <Text style={styles.rideHistoryItemDateText}>14/05/2023</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.expandButton}>
              <Entypo
                name="chevron-with-circle-down"
                size={32}
                color={colors.lightblue}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.bookHistoryText}>Book History</Text>

        <View style={styles.bookHistoryItem}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.rideHistoryItemText}>
                Beach Park, Konyaalti
              </Text>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Driver:</Text>
                <Text style={styles.rideHistoryItemDateText}>
                  Cem Baran Kurukaya
                </Text>
              </View>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Date:</Text>
                <Text style={styles.rideHistoryItemDateText}>28/05/2023</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.expandButton}>
              <Entypo
                name="chevron-with-circle-down"
                size={32}
                color={colors.lightblue}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.carInfoText}>Car Info</Text>

        <View style={styles.bookHistoryItem}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Brand:</Text>
                <Text style={styles.rideHistoryItemDateText}>Nissan</Text>
              </View>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Model:</Text>
                <Text style={styles.rideHistoryItemDateText}>Micra</Text>
              </View>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Year:</Text>
                <Text style={styles.rideHistoryItemDateText}>2012</Text>
              </View>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Color:</Text>
                <Text style={styles.rideHistoryItemDateText}>White</Text>
              </View>
              <View style={styles.rideHistoryItemSubTextContainer}>
                <Text style={styles.rideHistoryItemDate}>Plate No:</Text>
                <Text style={styles.rideHistoryItemDateText}>AA 080 XX</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
