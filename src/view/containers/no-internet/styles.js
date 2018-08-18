import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    no_internet : {
        flexDirection: 'column',
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
        height : height,
        width: width,
        alignItems: 'center',
        justifyContent: "space-around",
        backgroundColor: colors.no_internet_background,
        zIndex : 10,

    },
    purple_text : {
        position: "absolute",
        top :  height * 0.25,
        fontFamily: 'Rubik-Regular',
        fontSize: 20,
        color : colors.purple,
        textAlign: "center"
    },
    no_internet_image : {
        position: "absolute",
        bottom : 0,
        width  : width,
        height : height * 0.5,
        resizeMode : 'stretch'
    },
});
