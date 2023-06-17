import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './loginScreenStyles';
import colors from '../../assets/colors/colors';
import logo from '../../assets/images/unitrip_logo.png';
import InputBox from '../../components/InputBox';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../firebase';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // replace çalışmıyor, hala geri dönülebilir, bunun yerine navigation.reset kullan
        // navigation.replace('Home');
        navigation.reset({
          index: 0,
          routes: [{name: 'TabNavigator'}],
        });
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate('TabNavigator', {screen: 'RidesScreen'});
        })
        .catch(Error =>
          Alert.alert('Warning', 'Mail or password is not correct'),
        );
    } else {
      Alert.alert('Warning', 'Mail or password not provided');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.lightblue, colors.darkblue]}
        style={styles.linearGradientBackground}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View styles={styles.inputContainer}>
          <InputBox
            keyboardType={'email-address'}
            placeholder={'Email'}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <InputBox
            keyboardType={'default'}
            placeholder={'Password'}
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default LoginScreen;
