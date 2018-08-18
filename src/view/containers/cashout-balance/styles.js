import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        width: width,
        height: 55,
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2,
    },
    block: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        backgroundColor: 'rgba(255, 255, 255, 0.36)',
        borderRadius: 12,
        width: width * 0.85,
        height: 35
    },
    balance_title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balance_value: {
        alignItems: 'flex-end'
    },
    text: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: width * 0.04,
    },
    item: {
        justifyContent: 'center',
        width: width * 0.377,
        height: height * 0.08
    },
    icon: {
        width: 20,
        height: 30,
        marginRight: width * 0.02,
        resizeMode: 'contain',
    },
    cash: {
        textAlign: 'right',
        fontWeight: 'bold'
    }
});