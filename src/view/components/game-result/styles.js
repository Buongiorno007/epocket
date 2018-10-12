import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'

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
    },
    zifi: {
        width: width * 0.35,
        height: width * 0.35,
        marginVertical: height * 0.05
    },
    zifi_text: {
        textAlign: "center",
        width: (width * 0.85),
        color: colors.white,
        fontSize: 15,
        fontFamily: 'Rubik-BoldItalic',
        marginTop: height * 0.05
    },
    success: {
        zIndex: 1,
        flex: 1,
        width: width * 0.85,
        alignItems: 'center',
        justifyContent: 'center'
    },
    congratulation: {
        fontSize: 18,
        width: width * 0.75,
        fontFamily: "Rubik-Medium",
        color: colors.white,
        textAlign: "center"
    },
    fail: {
        fontSize: 13,
        width: width * 0.75,
        fontFamily: "Rubik-Regular",
        color: colors.white,
        textAlign: "center"
    },
    cash: {
        fontSize: 18,
        fontFamily: "Rubik-Medium",
        color: colors.white,
    },
    button: {
        backgroundColor: colors.white,
        marginTop: width * 0.05,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.55,
    },
    wait_button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.35,
        backgroundColor: "transparent"
    },
    text: {
        fontSize: width * 0.03,
        color: '#F55890'
    }
});