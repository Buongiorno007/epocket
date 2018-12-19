import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
    main_view: {
        position: "absolute",
        flex: 1,
        width: width,
        height: height,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: Platform.OS === "ios" ? 60 : 0,
        zIndex: 998
    },
    circle_container: {
        zIndex: 999,
        width: width * 0.85,
        height: height * 0.3,
        bottom: Platform.OS === "ios" ? -60 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnContainer: {
        zIndex: 999,
        bottom: Platform.OS === "ios" ? -60 : 0,
    },
    enable_location: {
        width: width * 0.6,
        borderRadius: 40,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        overflow: 'hidden'
    },
    location_disable_text: {
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.black,
        fontFamily: "Rubik-Regular",
        fontSize: 12
    },
    location_enable_text: {
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.white,
        position: 'absolute'
    }
});
