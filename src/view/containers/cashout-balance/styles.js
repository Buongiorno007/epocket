import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width: width,
        height: height * 0.15,
        paddingTop: 10,
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        zIndex: 2,
    },
    block: {
        width: (width - width * 0.08) / 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        height: height * 0.08
    },
    navigation_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 10,
        height: 20,
        marginRight: width * 0.02,
    },
    cash: {
        textAlign: 'right',
        fontWeight: 'bold'
    }
});