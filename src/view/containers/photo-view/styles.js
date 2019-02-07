import { StyleSheet, Dimensions } from 'react-native';

import { colors } from './../../../constants/colors'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    size: {
        width: width * 0.7,
    },
    block: {
        backgroundColor: '#fff',
        marginTop: width * 0.1,
        flex: 1.5,
        borderWidth: 1,
        borderColor: 'rgba(143, 163, 191, 1)',
        elevation: 15,
        shadowColor: colors.card_shadow,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 5,
        zIndex : 0,
    },
    navigation: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex : 1,
    },
    button: {
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5
    },
    button_text: {
        fontSize: width * 0.04,
        flexWrap: "wrap",
    },
    remove: {
        borderColor: '#000',
        borderWidth: 1,
        marginRight:10
    },
    remove_text: {
        color: '#000'
    },
    send: {
        backgroundColor: '#000',
        marginLeft:10
    },
    send_text: {
        color: '#fff'
    },
    image: {
        flex: 2,
    },
    template_photo : {
        position : 'absolute',
        top : 10,
        left : 10,
        zIndex : 1,
        elevation: 16,
    },
});