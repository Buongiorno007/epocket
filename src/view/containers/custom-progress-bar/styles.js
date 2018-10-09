import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
    gradient: {
        marginTop: 15,
        width: width * 0.85,
        height: 10,
        borderRadius: 12,
        backgroundColor: '#ddd',
        transform: [
            { rotateZ: '-180deg' }
        ]
    },
    gradient_inner: {
        height: 10,
        borderRadius: 12
    },
    gradient_container: {
        borderRadius: 12,
    }
});
