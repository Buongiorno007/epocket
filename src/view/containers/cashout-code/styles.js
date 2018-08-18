import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        backgroundColor: '#fff',
        width: width * 0.85,
        height: width * 0.85,
        marginRight: width * 0.075,
        marginLeft: width * 0.075,
        alignItems: 'center',
        justifyContent: 'center',
    },
});