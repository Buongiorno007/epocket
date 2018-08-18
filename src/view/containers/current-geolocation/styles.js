import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    get_geolocation : {
        width : 50,
        height : 50,
        resizeMode : 'contain',
        position : 'absolute',
        zIndex  : 1
      
    },
    shadow : {
        width : 50,
        height : 50,
        position : 'absolute',
        bottom : 75,
        right : 15,
        zIndex : 1,
        borderRadius: 50,

        elevation : 3,
        shadowColor: colors.card_shadow,
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 5,
    },
    get_geolocation_view : {
        width : 50,
        height : 50,
        borderRadius: 50,
        overflow : 'hidden',

    },    
    get_geolocation_button : {
        width : 50,
        height : 50,
    },
});
