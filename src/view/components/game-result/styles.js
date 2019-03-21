import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundForAnimated,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image_background: {
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
        marginBottom: height * 0.03
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
    background_grey: {
        position: "absolute",
        height: height * 0.65 + 60,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.drag_panel_color,
        width: width,
        bottom: 0
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
        fontSize: 10,
        width: width * 0.75,
        fontFamily: "Rubik-Medium",
        color: colors.dark_grey,
        textAlign: "center"
    },
    fail_text: {
        display: "none"
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
        marginTop: width * 0.05,
        marginBottom: 10,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        width: width * 0.75,
    },
    wait_button: {
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        width: width * 0.75,
        marginTop: 10,
        borderColor: colors.dark_grey,
        borderWidth: 1
    },
    text: {
        fontSize: 12,
        fontFamily: "Rubik-Medium"
    },
    insta_logo: {
        width: 25,
        height: 25,
    },
    zifi_cloud_failed: {
        display: "none"
    },
    image_to_post_container: {
        width: width * 0.75,
        height: width * 0.75,
        marginBottom: 30,
        elevation: 2,
        shadowColor: colors.card_shadow,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1,
    },
    image_to_post: {
        width: width * 0.75,
        height: width * 0.75,
    },
    zifi_cloud_success: {
        position: "absolute",
        top: 0,
        left: 30,
        width: 70,
        height: 70
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
    },
});