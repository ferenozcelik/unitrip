import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgrey,
  },
  header: {
    alignItems: 'center',
    marginTop: '2%',
    backgroundColor: colors.darkblue,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '35%',
    height: 45,
    borderRadius: 15,
  },
  logo: {
    resizeMode: 'contain',
    height: 30,
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    color: colors.darkblue,
    marginTop: '5%',
    marginLeft: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.darkblue,
    width: '95%',
    alignSelf: 'center',
    marginVertical: '2%',
  },
  inputContainer: {
    width: '95%',
    backgroundColor: colors.darkblue,
    marginTop: '2%',
    // marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    alignSelf: 'center',
  },
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '4%',
    justifyContent: 'space-between',
  },
  inputTitleText: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  inputBox: {
    backgroundColor: colors.white,
    width: 220,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    color: colors.black,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: '7%',
  },
  createButton: {
    width: '95%',
    height: 54,
    backgroundColor: colors.lightblue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: colors.white,
  },
});

export default styles;
