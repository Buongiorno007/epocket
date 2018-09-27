import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window');
const platform = Platform.OS;
let isIphoneX = platform === "ios" && height === 812 && width === 375;


export default StyleSheet.create({


    footer_container: {
        width: width,
        height: 70,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        zIndex : 3
    },
    footer_tab: {
        backgroundColor: colors.white,
        width: width * 0.2,
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    footer_tab_icon: {
        width: 22,
        height: 22,
    },
    footer_tab_icon_active: {
        width: 22,
        height: 14,
    },
    footer_tab_offset: {
        width: width * 0.25
    },
    footer_tab_central: {
        width: width * 0.1
    },
    footer_tab_icon_offset_left: {
        position: 'relative',
        left: -width * 0.025
    },
    footer_tab_icon_offset_right: {
        position: 'relative',
        right: -width * 0.025
    },
    footer_tab_text: {
        width: width * 0.2,
        textAlign: 'center',
        color: colors.pink,
        fontSize: 11,
        fontFamily: 'Rubik-Medium',
    },
    footer_tab_text_margin_bottom: { marginBottom: 15 },
    circle: {
        height: 100,
        width: width * 0.2,
        left: (width * 0.5) - (width * 0.2) / 2,
        backgroundColor: colors.white,
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'absolute',
        top: 0,
        overflow: 'hidden',
        zIndex: 1,
        borderColor : 'transparent'

    },
    circle_button: {
        height: 90,
        width: width * 0.2,
        backgroundColor: colors.white,
        borderRadius: 50,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 0,
        overflow: 'hidden',
        zIndex: 1,
        borderColor : 'transparent'
    },
    footer_small_logo : {
        position : 'absolute',
        top : 10,
        height: 15,
        width: 15,
    },
});
