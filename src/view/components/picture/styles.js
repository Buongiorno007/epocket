import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        flex : 1,
        paddingTop: 20,
        backgroundColor: '#F5F9FE'
    },
    block: {
        width: width,
        height: height * 0.9 - (Platform.OS === 'ios' ? 44 : 56),
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    }
});