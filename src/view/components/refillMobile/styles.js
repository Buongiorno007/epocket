import { StyleSheet, Dimensions } from 'react-native';
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
    height: height,
    width: width,
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
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    lineHeight: 17,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    marginBottom: 10
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
  }
});
