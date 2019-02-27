import { StyleSheet, Dimensions } from 'react-native';

import { colors } from './../../../constants/colors'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        zIndex: 1002,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: "absolute",
        bottom: 60,
        width: width,
        height: 60,
        backgroundColor: "transparent",
        flexDirection: "row",
        padding: 17
    },
    gradient_background: {
        bottom: 0,
    },
    add_friend_image: {
        height: 17,
        width: 19,
        zIndex: 1002,
    },
    navigate_forward: {
        width: 17,
        height: 17,
        justifyContent: 'center',
        alignSelf: "center",
        alignItems: 'center',
        zIndex: 1002,
    },
    ref_link_text: {
        color: colors.white,
        fontSize: 13,
        fontFamily: "Rubik-Medium",
        zIndex: 1002,
    },
    //opened card
    opened_share_menu: {
        zIndex: 1003,
        width: width,
        height: height,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: colors.white,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    top_container: {
        width: width,
        height: height * 0.2,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1003,
    },
    top_container_gradient_background: {
        width: width,
        height: height * 0.2,
        position: "absolute",
        top: 0,
    },
    icon_close: {
        color: colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        zIndex: 1003,
    },
    button_close: {
        zIndex: 1003,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 20,
        right: 10,
        width: 40,
        height: 40,
    },
    share_list: {
        width: width,
        height: height * 0.8,
    },
    opened_share_title: {
        color: colors.white,
        fontSize: 15,
        textAlign: "center",
        fontFamily: "Rubik-Medium",
        width: width * 0.8
    },
    list: {
        width: width,
        height: height * 0.8,
    },
    list_content: {
        width: width,
        height: height * 0.8,
    },
    list_item: {
        width: width,
        height: 68,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.settings_gray
    },
    last_list_item: {
        borderBottomWidth: 0
    },
    list_item_image: {
        width: 24,
        height: 24,
    },
    list_item_text: {
        paddingLeft: 16,
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: "center",
    },
    list_item_title: {
        color: colors.black41_09,
        fontSize: 12,
        fontFamily: "Rubik-Regular"
    },
    list_item_subtitle: {
        color: colors.black41_054,
        fontSize: 12,
        fontFamily: "Rubik-Regular"
    }
});