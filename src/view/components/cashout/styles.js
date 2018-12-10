import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    grad: {
        position: "absolute",
        height: height,
        width: width,
        zIndex: 1,
    }
});
