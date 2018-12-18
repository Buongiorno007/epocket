import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.black
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
    },
    image_background: {
        zIndex: 1,
        position: "absolute",
        top: width * 0.1,
        height: 165,
        width: width,
    },
    image_template: {
        zIndex: 1,
        alignSelf: 'center',
        top: width * 0.2,
        height: 165,
        width: width,
        // backgroundColor :  colors.white,
        marginBottom: 30,
    },
    success: {
        zIndex: 1,
        flex: 1,
        width: width * 0.85,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_common: {
        width: width * 0.85,
        textAlign: 'center',
        marginBottom: 25,
    },
    more_money: {
        fontSize: 30,
        color: colors.white,
    },
    more_text: {
        fontSize: 18,
        color: colors.white,
    },
    more_deck: {
        fontSize: 12,
        color: colors.white,
    },

    skip_button: {
        width: width * 0.85,
        height: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        fontSize: 14,
        color: colors.white,
    },
    earn_more_btn: {

    },
    toast: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});