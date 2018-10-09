import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
    gradient: {
        marginTop: 15,
        width: width * 0.85,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ddd'
    },
    gradient_inner: {
        width: width * 0.85,
        height: 10,
        borderRadius: 5
    },
    gradient_container: {
        borderRadius: 5,
        position: "absolute",
        right: 0,
    }
});
