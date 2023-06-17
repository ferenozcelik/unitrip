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
    // marginTop: 10,
    marginTop: '3%',
  },
  logo: {
    resizeMode: 'contain',
    height: 30,
  },
  signOutButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingTop: '20%',
    paddingRight: '3%',
  },
  signOutButton: {},
  profileDetailsContainer: {
    marginTop: '3%',
    marginLeft: '7%',
    marginBottom: '3%',
  },
  driverImage: {
    width: 120,
    height: 120,
    borderRadius: 120,
    borderColor: colors.white,
    borderWidth: 2,
    // alignSelf: 'flex-start',
  },
  driverStarContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  profileNameText: {
    marginTop: 5,
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
    fontSize: 24,
  },
  schoolText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    opacity: 0.6,
    fontSize: 18,
  },
  profileInfoText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    fontSize: 16,
    marginTop: '3%',
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  addressText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    fontSize: 16,
    opacity: 0.6,
  },
  rideStatMainContainer: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  rideStatContainer: {
    flexDirection: 'row',
  },
  rideStat: {
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
    fontSize: 16,
    marginRight: 5,
  },
  rideStatText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.white,
    fontSize: 16,
  },
  horizontalDivider: {
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
    fontSize: 16,
    marginHorizontal: 10,
  },
  subDetailsContainer: {
    marginTop: '5%',
    marginLeft: '7%',
  },
  rideHistoryText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.darkblue,
    fontSize: 16,
    marginBottom: '1%',
  },
  rideHistoryItem: {
    backgroundColor: colors.white,
    width: '90%',
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  rideHistoryItemText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    fontSize: 16,
    maxWidth: 280,
  },
  rideHistoryItemSubTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  rideHistoryItemDate: {
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    fontSize: 14,
  },
  rideHistoryItemDateText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    fontSize: 14,
    paddingLeft: 10,
  },
  expandButton: {
    // marginLeft: 15,
    // marginTop: 15,
    // position: 'absolute',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // left: '85%',
    marginRight: '2%',
  },
  bookHistoryText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.darkblue,
    fontSize: 16,
    marginBottom: '1%',
  },
  carInfoText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.darkblue,
    fontSize: 16,
    marginBottom: '1%',
  },
  bookHistoryItem: {
    backgroundColor: colors.white,
    width: '90%',
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default styles;
