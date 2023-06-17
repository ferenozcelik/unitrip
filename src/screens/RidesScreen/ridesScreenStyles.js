import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  headerContainer: {
    marginTop: '3%',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 30,
    // height: '25%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  searchBar: {
    backgroundColor: colors.white,
    width: '95%',
    // height: 50,
    borderRadius: 12,
    paddingLeft: 15,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.bluegrey,
    // borderBottomColor: colors.bluegrey,
    // borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  },
  resultModifyMainContainer: {
    flexDirection: 'row',
    marginLeft: '3%',
    marginBottom: '3%',
  },
  resultModifyContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightblue,
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  resultModifyText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
    paddingLeft: 5,
  },
  ridesContainer: {
    flex: 1,
    // marginTop: 10,
  },
});

export default styles;
