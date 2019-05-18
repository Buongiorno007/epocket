import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { Header } from 'react-navigation';
import { colors } from '../../../constants/colors';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundForAnimated,
    zIndex: 100
  },
  grad: {
    position: 'absolute',
    // height: height,
    height:
      Platform.OS === 'ios'
        ? height - Header.HEIGHT
        : height - Header.HEIGHT - StatusBar.currentHeight,
    width: width,
    top:
      Platform.OS === 'ios'
        ? Header.HEIGHT
        : Header.HEIGHT + StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25
  },
  navigation_item: {
    top: 15
  },
  icon: {
    width: 10,
    height: 20,
    marginRight: width * 0.02
  },
  back: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'Rubik-Medium'
  },
  avoiding: {
    height: '100%'
    // backgroundColor: '#fff'
  },
  scrollView: {
    height: '100%',
    // backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 15,
    fontFamily: 'Rubik-Bold',
    lineHeight: 18,
    color: '#fff',
    marginBottom: 20
  },
  subHead: {
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    lineHeight: 14,
    color: 'rgba(255, 255, 255, .6)',
    marginBottom: 10
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff'
  },
  subHead2: {
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(255, 255, 255, .8)',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'Rubik-Medium',
    letterSpacing: 2
  },
  successText: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Rubik-Regular',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  noMoney: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    color: '#fff',
    textAlign: 'center'
  },
  ////////////////////////
  ////////////////////////
  ////////////////////////
  ////////////////////////
  ////////////////////////
  ////////////////////////
  ////////////////////////
  inputView: {
    width: '100%'
    // backgroundColor: 'yellow'
  },
  dropDown: {
    width: width * 0.3
    // color: '#fff',
    // backgroundColor: 'yellow'
    // height: 30
  },
  itemTextStyle: {
    color: 'brown',
    // paddingVertical:15,
    backgroundColor: 'pink'
  }
});
