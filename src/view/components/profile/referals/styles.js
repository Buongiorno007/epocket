import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
import sbHeight from "@services/getSBHeight"
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 28
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        width,
        height,
        paddingHorizontal: 16
    },
    top: {
        width: width - 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: sbHeight + 16,
    },
    topImg: {
        width: 32,
        height: 32
    },
    text: {
        fontFamily: 'Rubik-Medium',
        fontSize: 17,
        color: colors.black111
    },
    textBig: {
        fontFamily: 'Rubik-Bold',
        fontSize: 24,
        color: colors.black111
    },
    textSmall: {
        fontFamily: 'Rubik-Regular',
        fontSize: 15,
        color: colors.black
    },
    textRed: {
        color: colors.blood_red
    },
    add: {
        width: width - 32, 
        padding: 15,
        backgroundColor: colors.blood_red,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 16
    },
    addImg: {
        width: 24,
        height: 24,
        marginRight: 16
    },
    addText: {
        fontFamily: 'Rubik-Medium',
        fontSize: 17,
        color: colors.white
    },
    socialLink: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16
    },
    socialIco: {
        width: 48,
        height: 48
    },
    margin: {
        marginVertical: 16
    },
    qrContainer: {
        width: width - 32, 
        height: width - 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        height: width - 32,
    }
})