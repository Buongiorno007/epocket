import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
import sbHeight from "@services/getSBHeight"

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		backgroundColor: colors.map_gray,
	},
	zifi_text: {
		color: colors.black111,
		fontSize: 18,
		fontFamily: 'Rubik-MediumItalic',
		textAlign: 'center',
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginBottom: 24,
		marginTop: 8,
		alignSelf: 'center',
	},
	title: {
		textAlign: 'center',
		marginBottom: 16,
		fontSize: 24,
		fontFamily: 'Rubik-Bold',
		color: colors.black111,
	},
	// button: {
	// 	width: '100%',
	// 	height: 40,
	// 	marginTop: 16,
	// 	alignSelf: 'center',
	// 	backgroundColor: '#fff',
	// 	...Platform.select({
	// 		ios: {
	// 			shadowOpacity: 0.2,
	// 			shadowOffset: {
	// 				width: 0.2,
	// 				height: 2,
	// 			},
	// 			shadowColor: '#000000',
	// 			shadowRadius: 2,
	// 		},
	// 		android: {
	// 			elevation: 4,
	// 		},
	// 	}),
	// },
	button: {
		height: 44,
		marginVertical: 40,
		marginHorizontal: 16,
		paddingTop: 10,
		elevation: 0,
		backgroundColor: colors.blood_red,
	},
	text: {
		fontSize: 14,
		fontFamily: 'Rubik-Medium',
		color: colors.white,
	},
	red: {
		color: colors.blood_red,
	},
	buttonExit: {
		justifyContent: 'center', 
		alignItems: 'center', 
		position: 'absolute', 
		top: 50, 
		right: 20,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.gray_e5,
	},
	game_aval: {
		width: width - 32,
		height: 55,
		backgroundColor: colors.transparent,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: sbHeight + 16,
	  },
	  game_aval_t: {
		borderRadius: 24,
		paddingHorizontal: 15,
		paddingVertical: 10,
		backgroundColor: colors.black111,
		color: colors.white,
	  },
	  game_aval_img: {
		width: 32,
		height: 32,
	  },
})
