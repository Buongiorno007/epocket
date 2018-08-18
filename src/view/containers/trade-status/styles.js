import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        paddingTop: width * 0.05,
        paddingBottom: width * 0.02,
    },
    title: {
        textAlign: 'center',
        fontSize: width * 0.045,
        color: '#414141'
    },
    message: {
        marginTop: width * 0.02,
        textAlign: 'center',
        fontSize: width * 0.035,
        lineHeight: width * 0.06,
        color: 'rgba(65, 65, 65, 0.6)'
    }
});