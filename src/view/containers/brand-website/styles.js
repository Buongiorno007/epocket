import { StyleSheet, Dimensions } from 'react-native';
import { colors } from "../../../constants/colors";
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    main_view: {
        width: width,
        height: height,
        position: "absolute",
        zIndex: 99,
        flex: 1
    },
    hidden: {
        display: "none"
    },
    timer_header: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height * 0.15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingTop: 10,
        justifyContent: "space-between"
    },
    icon: {
        zIndex: 101,
        width: 20,
        height: 20,
    },
    icon_close: {
        zIndex: 101,
        width: 18,
        height: 18,
    },
    zifi: {
        zIndex: 101,
        width: 25,
        height: 25,
    },
    button_close: {
        zIndex: 103,
        width: 50,
        height: 50,
        alignItems: "center",
        alignSelf: "center",
    },
    webview: {
        position: "absolute",
        zIndex: 100,
        bottom: 0,
        left: 0,
        width: width,
        height: height * 0.85,
    },
    continue: {
        height: 40,
        width: width * 0.6,
        backgroundColor: colors.white,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    continue_text: {
        fontSize: 12,
        fontFamily: "Rubik-Medium",
        textAlign: "center"
    },
    continue_to_website: {
        height: 40,
        width: width * 0.65,
        backgroundColor: colors.white,
        marginTop: 25,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    info_page: {
        backgroundColor: colors.backgroundForAnimated,
        width: width,
        height: height,
        position: "absolute",
        zIndex: 100,
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
    },
    image_background: {
        position: "absolute",
        height: height,
        width: width,
    },
    navigation_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon_back: {
        width: 10,
        height: 20,
        marginRight: width * 0.02,
    },
    title: {
        fontSize: 12,
        fontFamily: "Rubik-Medium"
    },
    text: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: width * 0.04,
    },
    block: {
        alignItems: 'flex-start',
        position: "absolute",
        width: width * 0.9,
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoPage_title: {
        fontSize: 18,
        fontFamily: "Rubik-Medium",
        color: colors.white,
        textAlign: "center",
        marginBottom: 5,
        marginTop: 5,
        width: width * 0.7,
    },
    infoPage_desc: {
        fontSize: 12,
        marginBottom: 5,
        marginTop: 5,
        width: width * 0.7,
        color: colors.white_o75,
        fontFamily: "Rubik-Regular",
        textAlign: "center"
    }
});