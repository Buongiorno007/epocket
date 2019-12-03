import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
import sbHeight from "@services/getSBHeight"
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
	main_view: {
		width,
		height: '100%',
		// height: Dimensions.get('window').height,
		// height: Platform.OS === 'android' ? height - 48 : height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
		paddingBottom: 61
	},
	header: {
		width: width,
		flexDirection: 'row',
		height: height * 0.1,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		marginTop: 10,
	},
	settings_btn: {
		height: 50,
		width: 50,
		alignSelf: 'flex-end',
	},
	settings_img: {
		height: 20,
		width: 20,
	},
	info: {
		width: width,
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'flex-start',
        alignItems: 'flex-start',
		paddingHorizontal: 16,
	},
	userData: {
		width: width - 32,
		alignItems: 'center',
	},	
	name: {
		color: colors.black111,
		fontSize: 24,
		fontFamily: 'Rubik-Medium',
		letterSpacing: 2,
	},
	age: {
		color: colors.black111,
		fontSize: 15,
		fontFamily: 'Rubik-Medium',
	},
	photo_container: {
		width: width * 0.34,
		height: width * 0.34,
		borderRadius: width * 0.17,
		alignSelf: 'center',
	},
	text_container: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: width * 0.85,
		height: height * 0.5,
		flexDirection: 'column',
	},
	text_container_android: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: width * 0.85,
		height: height * 0.5,
		borderRadius: 25,
	},
	text_item: {
		marginBottom: 20,
	},
	title: {
		color: colors.black41_09,
		fontSize: 15,
	},
	btn_container: {
		width: width,
		height: height * 0.4,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1001,
	},
	btn_container_absolute: {
		width: width,
		height: height * 0.4,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1001,
		position: 'absolute',
		bottom: 80,
	},
	animation: {
		zIndex: 1000,
		width: width,
		height: height,
		position: 'absolute',
		bottom: Platform.OS === 'ios' ? 60 : 0,
    },
    bigBtn: {
        width: width - 32,
        padding: 16,
        backgroundColor: colors.black111,
        borderRadius: 12,
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
	},
	bigBtn_w: {
		backgroundColor: colors.white,
	},
	bigBtn_bor: {
		borderWidth: 1,
		borderColor: colors.gray_e6
	},
    bigBtnText: {
        fontFamily: 'Rubik-Medium',
        fontSize: 17,
        color: colors.white,
	},
	bigBtnText_b: {
		color: colors.black111,
	},
    bigBtnText_sm: {
        fontFamily: 'Rubik-Regular',
        fontSize: 13,
        color: colors.gray_b1,
    },
    bigBtnImg: {
        width: 40,
		height: 40,
		marginRight: 16
    },
    bigBtnImg2: {
        width: 20,
        height: 32,
        marginLeft: 'auto',
    },
    refContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 32,
    },
    refPad: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.map_gray,
        padding: 16,
        width: (width - 40) / 2,
        height: 144,
        justifyContent: 'space-between',
        backgroundColor: colors.white
    },
    refPad_row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    refPadImg_big: {
        width: 24,
        height: 24,
    },
    refPadImg_sm: {
        width: 16,
        height: 16,
        alignSelf: 'flex-end'
    },
    refPadText_red: {
        fontFamily: 'Rubik-Medium',
        fontSize: 17,
        color: colors.blood_red
    },
    refPadText_bl: {
        fontFamily: 'Rubik-Medium',
        fontSize: 15,
        color: colors.black111
	},
	priceContainer: {		
		marginLeft: 'auto',
	},
	price: {
		minWidth: 60, 
		// maxHeight: 28,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 7,
		paddingVertical: 3,
		borderRadius: 20,
		backgroundColor: colors.blood_red
	},
	price_text: {
		fontFamily: 'Rubik-Medium',
        fontSize: 17,
		color: colors.white,
	},
})
