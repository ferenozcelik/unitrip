import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradientBackground: {
    flex: 1,
    height: height,
    alignItems: 'center',
  },
  logoContainer: {
    paddingTop: '5%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  logo: {
    resizeMode: 'contain',
    width: 300,
    // height: '40%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.lightgrey,
    width: 320,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.darkblue,
    fontSize: 24,
  },
});

export default styles;
