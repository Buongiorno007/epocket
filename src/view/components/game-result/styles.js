import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundForAnimated,
        alignItems: 'center',
        justifyContent: 'center'
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
    },
    image: {
        position: "absolute",
        top: 0,
        height: height,
        width: width,
    },
    image_failed: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        backgroundColor: "black",
        height: width,
        width: width,
        opacity: 0.2
    },
    zifi: {
        width: width * 0.35,
        height: width * 0.35,
        marginBottom: height * 0.05
    },
    zifi_text: {
        textAlign: "center",
        width: (width * 0.85),
        color: colors.white,
        fontSize: 17,
        fontFamily: 'Rubik-BoldItalic',
        marginTop: height * 0.05
    },
    success: {
        zIndex: 1,
        width: width * 0.85,
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    failed: {
        zIndex: 1,
        position: "absolute",
        bottom: 10,
        width: width * 0.85,
        alignItems: 'center',
        justifyContent: 'center',
    },
    congratulation: {
        fontSize: 20,
        width: width * 0.75,
        fontFamily: "Rubik-Medium",
        color: colors.white,
        textAlign: "center"
    },
    fail: {
        fontSize: 15,
        width: width * 0.75,
        fontFamily: "Rubik-Regular",
        color: colors.white,
        textAlign: "center"
    },
    cash: {
        fontSize: 20,
        fontFamily: "Rubik-Medium",
        color: colors.white,
    },
    button_short: {
        backgroundColor: colors.white,
        marginTop: width * 0.05,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.55,
    },
    button: {
        backgroundColor: colors.white,
        marginTop: width * 0.05,
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        width: width * 0.75,
    },
    wait_button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.75,
        backgroundColor: "transparent",
    },
    text: {
        fontSize: width * 0.03
    },
    insta_logo: {
        width: 25,
        height: 25
    },
    zifi_cloud_failed: {
        position: "absolute",
        top: -10,
        left: 15,
        width: 70,
        height: 70
    },
    zifi_cloud_success: {
        position: "absolute",
        top: 0,
        left: 30,
        width: 70,
        height: 70
    },
});