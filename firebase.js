// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  collection,
  doc,
  where,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import {REACT_APP_API_KEY} from '@env';
import {useEffect, useState} from 'react';
import {firestore} from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// console.log(process.env.REACT_APP_API_KEY);

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// export const db = getFirestore(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const getCurrentUser = async () => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid);
  const userSnap = await getDoc(currentUserRef);

  if (userSnap.exists()) {
    return {...userSnap.data()} || null;
  }

  return null;
};

const ridesRef = collection(db, 'rides');
const usersRef = collection(db, 'users');
const booksRef = collection(db, 'books');

const getActiveRides = () => {
  const [rides, setRides] = useState([]);
  const activeRides = query(ridesRef, where('status', '==', true));

  useEffect(() => {
    return onSnapshot(activeRides, snapshot => {
      setRides(
        snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            driverEmail: data['driverEmail'],
            ...data,
          };
        }),
      );
    });
  }, []);

  return rides;
};

const addRide = (
  startLocation,
  endLocation,
  numberOfSeat,
  carModel,
  plateNo,
  status,
  driverName,
  driverEmail,
  passengers,
  date,
  driverPhoto,
) => {
  addDoc(ridesRef, {
    startLocation,
    endLocation,
    numberOfSeat,
    carModel,
    plateNo,
    status: true,
    passengers: [],
    driverName,
    driverEmail,
    date,
    driverPhoto,
  });
};

const addBooking = (rideId, passengerEmail) => {
  const rideRef = doc(db, 'rides', rideId);
  updateDoc(rideRef, {
    passengers: arrayUnion(passengerEmail),
  });

  // addDoc(booksRef, {
  //   driverEmail: 'test',
  //   passengerEmail: passengerEmail,
  // });
};

const removeBooking = (rideId, passengerEmail) => {
  const rideRef = doc(db, 'rides', rideId);
  updateDoc(rideRef, {
    passengers: arrayRemove(passengerEmail),
  });
};

const finishRide = rideId => {
  const rideRef = doc(db, 'rides', rideId);
  updateDoc(rideRef, {
    status: false,
  });
};

const userHasActiveRide = currentUserEmail => {
  const [activeRideId, setActiveRideId] = useState([]);
  const q = query(
    collection(db, 'rides'),
    where('status', '==', true),
    where('driverEmail', '==', currentUserEmail),
  );
  useEffect(() => {
    // async () => {
    //   onSnapshot(q, doc => {
    //     setActiveRideId(doc.data());
    //   });
    // };
    return onSnapshot(q, snapshot => {
      setActiveRideId(
        snapshot.docs.map(doc => {
          return {
            id: doc.id,
          };
        }),
      );
    });
  }, []); // remove brackets for continuous updating

  if (activeRideId.length === 0) {
    return false;
  }
  return true;
};

const userHasActiveBooking = currentUserEmail => {
  const [activeBookingId, setActiveBookingId] = useState([]);
  const q = query(
    collection(db, 'rides'),
    where('status', '==', true),
    where('passengers', 'array-contains', currentUserEmail),
  );
  useEffect(() => {
    return onSnapshot(q, snapshot => {
      setActiveBookingId(
        snapshot.docs.map(doc => {
          return {
            id: doc.id,
          };
        }),
      );
    });
  }, []); // remove brackets for continuous updating

  if (activeBookingId.length === 0) {
    return false;
  }
  return true;
};

export {
  auth,
  db,
  getCurrentUser,
  getActiveRides,
  addRide,
  addBooking,
  removeBooking,
  finishRide,
  userHasActiveRide,
  userHasActiveBooking,
};
