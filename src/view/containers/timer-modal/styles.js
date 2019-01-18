import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../constants/colors'
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    main_task_done: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        backgroundColor: colors.backgroundForAnimated
    },
    main_task: {
        width: width,
        height: height,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main_task_done_content: {
        width: width * 0.85,
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
        color: colors.white
    },
    text_big: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: "Rubik-Medium",
        color: colors.white
    },
    text_small: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: "Rubik-Regular",
        color: colors.white_o74
    },
    confirm_button: {
        width: width * 0.5,
        borderRadius: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        backgroundColor: colors.white
    },
    confirm_button_text: {
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute',
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
    },
    image: {
        left: 0,
        top: 0,
        position: "absolute",
        height: height,
        width: width,
    },
    textBlack: {
        color: colors.black
    },
    textWhite: {
        color: colors.white
    },
    backgroundColorWhite: {
        backgroundColor: colors.white
    }
});
