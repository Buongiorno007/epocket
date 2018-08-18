

import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        position: "absolute", 
        top: 25, 
        width: width,
        height : 50
    },
    back_button : {
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'center',
        width : 50,
        height : 50
    },
    back_icon : {
        color : colors.white,
        fontSize: 30,
    },
    back_txt : {
        color : colors.white,
        fontSize: 18, 
    }
});