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
        width: 35,
        height: 35,
        zIndex: 1000,
        marginTop: 10
    },
    gradient: {
        width: 55,
        height: 55,
        borderRadius: 30,
        zIndex: 999,
        position: "absolute",
        top: 0,
    },
    big_gradient: {
        width: 60,
        height: 60,
        borderRadius: 30,
        zIndex: 999,
        position: "absolute",
        top: 0,
    },
    discount_image: {
        width: 40,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        zIndex: 1000,
    },
    discount_text_container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    mall_price_view_fill: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        height: 18,
        borderRadius: 4,
        backgroundColor: colors.transparent,
    },
    discount_text: {
        fontSize: 13,
        color: colors.blue_label,
        fontFamily: "Rubik-Medium"
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mall_price_view: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        height: 18,
        borderRadius: 4,
        backgroundColor: colors.white,
    },
    mall_price: {
        height: 20,
        marginTop: 5,
        fontSize: 18,
        paddingRight: 5,
        fontFamily: 'Rubik-Bold',
        color: colors.blue_label
    },
    mall_price_epc: {
        height: 15,
        fontSize: 12,
        fontFamily: 'Rubik-Bold',
        color: colors.blue_label
    }
});

