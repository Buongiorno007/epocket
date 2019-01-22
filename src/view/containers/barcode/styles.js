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
    barcode_container: {
        justifyContent: "flex-start",
        alignItems: "center",
        height: width * 0.8
    },
    barcode_text_container: {
        width: width * 0.7,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20
    },
    barcode_text: {
        textAlign: "center",
        color: colors.white,
        fontFamily: "Rubik-Medium",
        fontSize: 18
    },
    barcode: {
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        width: width * 0.85,
        height: width * 0.6
    }
});