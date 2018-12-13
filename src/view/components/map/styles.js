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
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: "absolute",
        top: 30,
        zIndex: 3
    },
    state_change_block_gradient: {
        position: "absolute",
        top: 0,
        height: height * 0.25,
        zIndex: 2,
        width: width
    },
    state_change_block_text: {
        textAlign: "center",
        fontSize: 12,
        fontFamily: "Rubik-Medium"
    },
    state_change_block_btn: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        width: 60,
        height: 60,
        marginRight: 15,
        marginLeft: 15,
        borderRadius: 12
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
        width: 25,
        height: 25,
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
