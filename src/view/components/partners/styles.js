import { StyleSheet, Dimensions } from 'react-native';
import { colors } from "../../../constants/colors";
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width: width,
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundForAnimated,
        zIndex: 100,
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
    },
    image_background: {
        position: "absolute",
        top: 0,
        height: height,
        width: width,
    },
    block: {
        alignItems: 'flex-start',
        position: "absolute",
        width: width * 0.9,
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navigation_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
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
    list_container: {
        backgroundColor: colors.drag_panel_color,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        height: height * 0.8,
        width: width,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 50,
    },
    nav_buttons: {
        width: width * 0.85,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1
    },
    history_nav: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 10,
        height: height * 0.2
    },
    partners_text: {
        color: colors.white,
        textAlign: "center",
        width: 0.75 * width,
        fontSize: 15,
        fontFamily: "Rubik-Bold"
    }
});