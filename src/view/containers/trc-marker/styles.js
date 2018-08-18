import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
    main_view: {
        width: 0,
        height: 0,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },
    image: {
        width: 30,
        height: 35,
        zIndex : 1000,
    },
    marker : {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mall_price_view : {
        flexDirection : 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin : 5,
        paddingLeft : 5,
        paddingRight : 5,
        height: 18, 
        borderRadius : 4,
        backgroundColor : colors.white,
    },
    mall_price : {
        height: 20, 
        marginTop : 5,
        fontSize : 18,
        paddingRight : 5,
        fontFamily : 'Rubik-Bold',
        color: colors.blue_label
    },
    mall_price_epc : {
        height: 15, 
        fontSize : 12,
        fontFamily : 'Rubik-Bold',
        color: colors.blue_label
    }
});

