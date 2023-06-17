import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './createScreenStyles';
import logo from '../../assets/images/unitrip_logo.png';
import CreateRideInputBox from '../../components/CreateRideInputBox';
import colors from '../../assets/colors/colors';
import {auth, db, addRide, userHasActiveRide} from '../../../firebase';
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

const CreateScreen = ({navigation}) => {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [currentUserPhotoUrl, setCurrentUserPhotoUrl] = useState(null);

  const unsub = onSnapshot(doc(db, 'users', auth.currentUser.uid), doc => {
    setCurrentUserName(doc.data().name);
    setCurrentUserEmail(doc.data().email);
    setCurrentUserPhotoUrl(doc.data().photo);
  });

  const [activeRide, setActiveRide] = useState(null);
  const usersActiveRideQuery = query(
    collection(db, 'rides'),
    where('status', '==', true),
    where('driverEmail', '==', currentUserEmail),
  );

  const [activeBooking, setActiveBooking] = useState(null);
  const usersActiveBookingQuery = query(
    collection(db, 'rides'),
    where('status', '==', true),
    where('passengers', 'array-contains', currentUserEmail),
  );

  useEffect(() => {
    const unsubscribeActiveRide = onSnapshot(
      usersActiveRideQuery,
      querySnapshot => {
        setActiveRide(!querySnapshot.empty);
        querySnapshot.forEach(doc => {
          // doc yoksa buraya hiç girmiyor
        });
      },
    );

    const unsubscribeActiveBooking = onSnapshot(
      usersActiveBookingQuery,
      querySnapshot => {
        setActiveBooking(!querySnapshot.empty);
        querySnapshot.forEach(doc => {
          // doc yoksa buraya hiç girmiyor
        });
      },
    );
  }, [usersActiveRideQuery, usersActiveBookingQuery]);

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [numberOfSeat, setNumberOfSeat] = useState('');
  const [carModel, setCarModel] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [status, setStatus] = useState(true);
  const driverName = currentUserName;
  const driverEmail = currentUserEmail;
  const driverPhoto = currentUserPhotoUrl;

  const getDate = () => {
    var currentdate = new Date();
    return `${('0' + currentdate.getDate()).slice(-2)}/${(
      '0' +
      (currentdate.getMonth() + 1)
    ).slice(-2)}/${currentdate.getFullYear()} ${(
      '0' + currentdate.getHours()
    ).slice(-2)}:${('0' + currentdate.getMinutes()).slice(-2)}`;
  };

  const handleCreate = () => {
    if (
      startLocation !== '' &&
      endLocation !== '' &&
      numberOfSeat !== '' &&
      carModel !== '' &&
      plateNo !== '' &&
      !activeRide &&
      !activeBooking
    ) {
      addRide(
        startLocation,
        endLocation,
        numberOfSeat,
        carModel,
        plateNo,
        true,
        driverName,
        driverEmail,
        passengers,
        getDate(),
        driverPhoto,
        // serverTimestamp(),
      );
      setStartLocation('');
      setEndLocation('');
      setNumberOfSeat('');
      setCarModel('');
      setPlateNo('');

      Alert.alert('Info', 'Ride created successfully', [
        {text: 'OK', onPress: () => navigation.navigate('RidesScreen')},
      ]);
    } else {
      Alert.alert(
        'Warning',
        'Failed to create new ride. The reasons may be:\n- Ride information missing\n- You have already created a ride\n- You have already booked a ride',
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.titleText}>Creating a new ride:</Text>
      <View style={styles.divider}></View>
      <View style={styles.inputContainer}>
        <View style={styles.inputItem}>
          <Text style={styles.inputTitleText}>Departure:</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType={'default'}
            placeholder={'e.g. ABU Main Campus'}
            value={startLocation}
            onChangeText={text => setStartLocation(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTitleText}>Destination:</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType={'default'}
            placeholder={'e.g. MarkAntalya'}
            value={endLocation}
            onChangeText={text => setEndLocation(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <View>
            <Text style={styles.inputTitleText}>Seats:</Text>
            <Text
              style={
                ([styles.inputTitleText],
                {color: colors.bluegrey, fontFamily: 'Montserrat-Regular'})
              }>
              (except driver)
            </Text>
          </View>
          <TextInput
            style={styles.inputBox}
            keyboardType={'numeric'}
            placeholder={'e.g. 3'}
            value={numberOfSeat}
            onChangeText={text => setNumberOfSeat(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTitleText}>Car Model:</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType={'default'}
            placeholder={'e.g. Fiat Egea 2022'}
            value={carModel}
            onChangeText={text => setCarModel(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTitleText}>Plate No:</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType={'default'}
            placeholder={'e.g. 07 XXX 00'}
            value={plateNo}
            onChangeText={text => setPlateNo(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>CREATE RIDE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateScreen;
