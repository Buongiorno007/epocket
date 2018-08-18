import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
    main_view : {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outer_circle: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.4,
        borderRadius: 25,
        zIndex : 1,
        position: 'absolute',
        overflow : 'hidden'
    },
    inner_circle: {
        width: 17,
        height: 17,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        borderRadius: 17,
        position: 'absolute',
        zIndex : 2,
        overflow : 'hidden'
    },
    center_circle: {
        width: 9,
        height: 9,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        opacity: 1,
        position: 'absolute',
        zIndex : 3,
        overflow : 'hidden'
    },
});
