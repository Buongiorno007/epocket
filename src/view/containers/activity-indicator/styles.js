import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../constants/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 997,
    elevation: 16
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  loader_image: {
    position: 'absolute',
    bottom: height * 0.25,
    width: width * 0.25,
    height: width * 0.25,
    zIndex: 99
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  instructions2: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5
  },
  container_android: {
    position: 'absolute',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 997,
    // elevation: 16,
    backgroundColor: 'rgba(255,255,255,0.95)'
  }
});
