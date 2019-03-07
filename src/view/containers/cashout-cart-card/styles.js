import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        height: 60,
        width: width * 0.85,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },
    info: {
        height: 50,
        marginLeft: width * 0.1,
        width: width * 0.75,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        justifyContent: "space-between",
        backgroundColor: colors.white,
        elevation: 3,
        shadowColor: colors.card_shadow,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        zIndex: 9,
        paddingLeft: 40
    },
    left_image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        zIndex: 10,
    },
    left_image_container: {
        width: 60,
        height: 60,
        elevation: 4,
        borderRadius: 30,
        position: "absolute",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        zIndex: 10
    },
    left_info: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    right_info: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    title_and_count: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    name_text: {
        fontSize: 12,
        fontFamily: "Rubik-Medium",
        color: colors.black
    },
    count_text: {
        fontSize: 9,
        fontFamily: "Rubik-Regular",
        color: colors.black_38
    },
    price_text: {
        fontSize: 13,
        fontFamily: "Rubik-Regular",
        color: colors.black
    },
    button_close: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },
    icon: {
        width: 10,
        height: 10,
    },
});
