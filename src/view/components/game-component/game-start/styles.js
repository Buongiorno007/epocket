import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundForAnimated,
		paddingHorizontal: 16,
	},
	grad: {
		top: iPhoneX ? 40 : 32,
		height: iPhoneX ? height - 100 : height - 92,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'yellow',
	},
	btn: {
		height: 40,
		borderRadius: 20,
		marginBottom: 24,
		width: 60,
		justifyContent: 'center',
	},
	btn_gradient: {
		height: 40,
		borderRadius: 20,
		width: '100%',
		position: 'absolute',
	},
	// container: {
	// 	flexDirection: 'column',
	// 	flexWrap: 'wrap',
	// 	width: width * 0.85,
	// 	alignItems: 'center',
	// 	height: height * 0.5,
	// 	justifyContent: 'space-between',
	// },
	text_container: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: width * 0.9,
	},
	game_title: {
		alignItems: 'center',
		justifyContent: 'center',
		width: width * 0.85,
		position: 'absolute',
		top: 35,
	},
	game_description: {
		width: width * 0.8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	game_cost_text: {
		color: colors.black41,
		fontSize: 17,
		fontFamily: 'Rubik-Bold',
	},
	game_description_text: {
		textAlign: 'center',
		color: colors.black41,
		fontSize: 15,
		fontFamily: 'Rubik-Regular',
	},
	game_description_text_bold: {
		textAlign: 'center',
		color: colors.black41,
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginBottom: width * 0.05,
	},
	open_more_game_zifi: {
		marginTop: height * 0.03,
	},
	zifi_text: {
		textAlign: 'center',
		width: width * 0.85,
		color: colors.zifi_text,
		fontSize: 17,
		fontFamily: 'Rubik-BoldItalic',
	},
	white_text: {
		color: colors.white,
	},
	game_title_text: {
		textAlign: 'center',
		width: width * 0.85,
		color: colors.black,
		fontSize: 17,
		fontFamily: 'Rubik-Regular',
	},
	TextStyle: {
		color: '#fff',
		textAlign: 'center',
	},
	zifi_cloud: {
		position: 'absolute',
		top: 0,
		left: 30,
		width: 70,
		height: 70,
	},
	lock_container: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		backgroundColor: colors.backgroundForAnimated, /////////// blue
		width: '100%',
		// paddingHorizontal: 16,
		alignItems: 'center',
		// position: 'absolute',
		// paddingTop: height * 0.05,
		// paddingBottom: 60,
		flex: 1,
		// height: '100%',
		// justifyContent: 'space-between',
		// borderWidth: 1,
		// borderColor: '#000',
	},
	image_background: {
		position: 'absolute',
		height: height,
		width: width,
	},
	// grad: {
	// 	position: 'absolute',
	// 	height: height,
	// 	width: width,
	// },
	contentContainerStyle: {
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	visit_website_partners: {
		height: height * 0.42,
		borderTopWidth: 1,
		paddingVertical: 10,
		borderTopColor: colors.white_o70,
		borderBottomWidth: 1,
		borderBottomColor: colors.white_o70,
	},
	lock_visit_text: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 16,
		fontFamily: 'Rubik-Medium',
	},
	go_to_map: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon_arrow: {
		width: 15,
		height: 15,
		marginLeft: 5,
		transform: [{ rotate: '180deg' }],
	},
})
