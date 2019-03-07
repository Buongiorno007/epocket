import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        paddingLeft: width * 0.075,
        paddingRight: width * 0.05,
        height: Platform.OS === 'ios' ? 44 : 56,
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    icon: {
        width: 15,
        height: 15
    },
});