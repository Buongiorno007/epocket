import {StyleSheet, Dimensions} from 'react-native';
import { colors } from '../../../constants/colors'
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    main_view: {
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
        height : height,
        width: width,
        flex : 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
        height : height,
        width: width,
        flex : 1
    },
    main_task_done: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    main_task_done_content: {
        width: width * 0.85,
        height: 200,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 10,       
        shadowColor: colors.card_shadow,
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowRadius: 12,
        shadowOpacity: 0.7,
    },
    text: {
        textAlign: 'center'
    },
    confirm_button: {
        width: width * 0.3,
        borderRadius: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        overflow : 'hidden'
    },
    confirm_button_text: {
        textAlign : 'center',
        alignSelf: 'center',
        color : colors.white,
        position : 'absolute'
    }

});
