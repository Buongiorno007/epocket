import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    card: {
        height: width * 0.2,
        width: width * 0.9,
        backgroundColor: colors.white,
        borderRadius: 12,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginBottom: 25,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 5,
        shadowColor: colors.card_shadow,
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowRadius: 12,
        shadowOpacity: 0.7,
    },
    social_icon: {
        height: 30,
        width: 30,
    },
    social_text: {
        fontFamily: "Rubik-Regular",
        fontSize: 11,
        color: colors.black_90,
        textAlign: "center"
    },
    social_text_big: {
        fontFamily: "Rubik-Bold",
        fontSize: 11,
        color: colors.black_90,
        textAlign: "center"
    },
    arrow_cont: {
        height: 30,
        width: 30,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    arrow: {
        width: 15,
        height: 15,
        transform: [
            { rotate: "-90deg" }
        ]
    },
    social_text_container: {
        paddingLeft: 5,
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column"
    },
    social_text_container_inner: {
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row"
    }
});
