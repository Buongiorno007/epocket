import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors'
export default StyleSheet.create({
    main_view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map_view: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height - 60,
        position: "absolute",
        zIndex: 1,
    },
    trc_info: {
        width: width * 0.85,
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: "absolute",
        top: 40,
        zIndex: 2
    },
    state_change_block: {
        width: width,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: "absolute",
        top: 30,
        zIndex: 3,
    },
    state_change_block_text: {
        textAlign: "center",
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: "Rubik-Medium"
    },
    state_change_block_btn: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        width: (width * 0.85) / 3,
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white_o75
    },
    state_change_block_btn_left: {
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        borderRightWidth: 0,
    },
    state_change_block_btn_right: {
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        borderLeftWidth: 0,
    },
    img_geo: {
        width: 50,
        height: 50,
    },
    img_geo_btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 12
    },
    state_change_block_geo: {
        width: 20,
        height: 20,
        paddingLeft: 5,
        paddingRight: 5
    },
    img_geo_gradient: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 12
    },
    map_marker_trc: {
        width: 18,
        height: 10,
        zIndex: 45
    },
    cards_block: {
        position: "absolute",
        bottom: 68,
        width: width,
        height: width * 0.4,
        zIndex: 3,
    },
    horizontal_list: {
        height: width * 0.4,
    },
    horizontal_list_content: {
        height: width * 0.4,
        alignItems: "center",
        justifyContent: "center"
    }
});
