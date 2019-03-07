import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        marginTop: width * 0.05,
        height: Platform.OS == 'android' ? width * 0.15 : width * 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Platform.OS == 'android' ? 0 : width * 0.05,
    },
    item: {
        flex: 1
    },
    text: {
        fontSize: width * 0.04,
        color: '#000'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    date: {
        textAlign: 'center',
    },
    info: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: -10,
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
