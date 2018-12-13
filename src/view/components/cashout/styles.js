import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../constants/colors';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    cashout_top: {
        width: width * 0.85,
        alignItems: "flex-start",
        justifyContent: "flex-end",
        zIndex: 2,
        paddingBottom: 10
    },
    general_text: {
        fontSize: 12,
        fontFamily: "Rubik-Medium",
        color: colors.white
    },
    general_text_big: {
        fontSize: 24,
        fontFamily: "Rubik-Medium",
        color: colors.white
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
        zIndex: 1,
    },
    background_image: {
        position: "absolute",
        resizeMode: "cover",
        height: height,
        width: width,
        zIndex: 1,
    },
    background_image_mask: {
        position: "absolute",
        height: height,
        width: width,
        zIndex: 1,
        backgroundColor: colors.black_50
    },
    top: {
        width: width,
        zIndex: 2,
        alignItems: "center",
        justifyContent: "space-between"
    }
});
