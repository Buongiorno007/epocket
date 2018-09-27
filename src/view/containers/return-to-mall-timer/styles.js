import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

    container : {
        position: "absolute",
        height : height * 0.25,
        width  : width * 0.85,
        top : 100,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: "center",
        backgroundColor: colors.white,
        zIndex : 10,
        borderRadius: 12,
        elevation : 3,
        shadowColor: colors.card_shadow,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 5,
    },
    text_common : {
        textAlign: "center",
        alignSelf: 'center',
        width  : width * 0.85 - 50,
        marginBottom: 5,
        marginTop: 5,
    },
    top_title : {
        color: colors.orange,
        fontFamily: 'Rubik-Regular',
        fontSize: 15,
    },
    timer : {
        color: colors.pink,
        fontFamily: 'Rubik-Bold',
        fontSize: 25,
    },
    bottom_title : {
        fontFamily: 'Rubik-Regular',
        fontSize: 10,
        opacity : 0.8
    },
    close_view : {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height : height * 0.25,
        width  : width * 0.85,
    },
    image_content: {
        width: width,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        position : 'absolute',
        top : 0,
        right : 0,
        zIndex : 10
      },
      close_container: {
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
      },  
      close: {
        width: 15,
        height: 15,
      },
});
