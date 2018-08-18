import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container : {
        flex : 1,
        paddingTop : 30,
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
        zIndex: 1,
    }
});
