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
    fontSize: 24,
    color: colors.darkblue,
    marginTop: '7%',
    marginLeft: '3%',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.darkblue,
    width: '95%',
    alignSelf: 'center',
    marginVertical: '2%',
  },
  rideDetailsContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  rideDetailsBox: {
    backgroundColor: colors.darkblue,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '0%',
    paddingVertical: '2%',
    borderRadius: 10,
  },
  rideDetailsInnerBox: {
    backgroundColor: colors.aqua,
    width: '95%',
    paddingLeft: '3%',
    paddingTop: '5%',
    borderRadius: 10,
  },
  rideDetailsInfoContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  driverImage: {
    width: 48,
    height: 48,
    borderRadius: 54,
    borderColor: colors.white,
    borderWidth: 2,
    // alignSelf: 'flex-start',
  },
  rideDetailsTextContainer: {
    marginLeft: '5%',
  },
  spacer: {
    marginTop: '5%',
  },
  driverName: {
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
    fontSize: 18,
  },
  rideDetailTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 240,
    maxWidth: 240,
  },
  rideDetailTitleText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  rideDetailText: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  passengersContainer: {},
  passengersBoxContainer: {
    backgroundColor: colors.darkblue,
    borderRadius: 5,
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengersBoxText: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  passengersListContainer: {
    marginTop: '3%',
  },
  passengersListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  passengersListItemBullet: {
    marginRight: '1%',
  },
  passengersListItemText: {
    color: colors.white,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    // minWidth: 210,
    maxWidth: 230,
  },

  noDataWarningContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tumbleweed: {
    resizeMode: 'contain',
    height: '15%',
    marginBottom: '10%',
  },
  noDataText: {
    color: colors.black,
    fontFamily: 'PressStart2P-Regular',
    fontSize: 24,
    opacity: 0.3,
    marginBottom: '5%',
  },
  noDataSubTextContainer: {
    alignItems: 'center',
  },
  noDataSubText: {
    color: colors.black,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  rideDetailsScreenButton: {
    width: 360,
    height: 54,
    backgroundColor: colors.lightblue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideDetailsScreenButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.white,
  },
});

export default styles;
