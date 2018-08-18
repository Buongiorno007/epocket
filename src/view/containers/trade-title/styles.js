import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : { },
    data: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: width * 0.035,
        lineHeight: width * 0.12
    },
    title: {
        color: 'rgba(65, 65, 65, 1)'
    },
    value: {
        color: 'rgba(65, 65, 65, 0.8)'
    },
    line: {
        height: 1,
        borderColor: 'rgba(65, 65, 65, 1)',
        borderWidth: 0.5,
        borderStyle: 'dashed'
    }
});