import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
    main_view: {
        flex: 1,
        width: width,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 100,
        zIndex: 99
    },
    circle_container: {
        width: width * 0.6,
        height: width * 0.6,
        bottom: -100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnContainer: {
        bottom: -100,
    },
    outer_circle: {
        width: width * 0.5,
        height: width * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
        opacity: 0.3,
        borderRadius: width * 0.5,
        position: 'absolute',
    },

    inner_circle: {
        width: width * 0.3,
        height: width * 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
        opacity: 0.35,
        borderRadius: width * 0.3,
        position: 'absolute',
    },
    location_icon: {
        width: 40,
        height: 40,
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
        color: colors.white,
    },
    location_enable_text: {
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.white,
        position: 'absolute'
    }
});
