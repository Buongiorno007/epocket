import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
    },
    image: {
        zIndex: 1,
        position: "absolute",
        top: width * 0.1,
        height: 165,
        width: width,
        resizeMode: 'contain'
    },
    success: {
        zIndex: 1,
        flex: 1,
        width: width * 0.6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    congratulation: {
        fontSize: width * 0.05,
        lineHeight: width * 0.08,
        color: '#fff',
    },
    cash: {
        fontSize: width * 0.045,
        lineHeight: width * 0.08,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    button: {
        backgroundColor: '#fff',
        marginTop: width * 0.05,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.55,
    },
    text: {
        fontSize: width * 0.03,
        color: '#F55890'
    }
});