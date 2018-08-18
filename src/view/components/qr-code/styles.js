import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        flex : 1,
        paddingTop: 20,
        backgroundColor: '#F5F9FE'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});