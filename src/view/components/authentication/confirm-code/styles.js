import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	layout: {
		flex: 1,
		backgroundColor: colors.white,
	},
	keyboard: {
		position: 'absolute',
		height: Platform.OS === 'ios' ? (iPhoneX ? height - Header.HEIGHT - 22 : height - Header.HEIGHT) : height - 62,
		width,
		top: Platform.OS === 'ios' ? (iPhoneX ? Header.HEIGHT + 22 : Header.HEIGHT) : 62,
		flex: 1,
		flexDirection: 'column',
	},
	scroll: {
		height: '100%',
		flex: 1,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	again_button: {
		height: 24,
		borderRadius: 12,
		backgroundColor: colors.mild_gray,
		paddingHorizontal: 4,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		marginBottom: 24,
	},
	again_text: {
		fontSize: 12,
		marginHorizontal: 8,
		color: colors.black111,
		fontFamily: 'Rubic-Regular',
	},
	again_button_active: {
		borderWidth: 1,
		borderColor: colors.black111,
		backgroundColor: '#fff',
	},
	again_text_active: {
		color: colors.blood_red,
	},
	content: {
		width: '100%',
	},
	description: {
		fontSize: 18,
		color: colors.black111,
		textAlign: 'center',
		marginBottom: 24,
		fontFamily: 'Rubic-Medium',
	},
	field: {
		width: '100%',
		borderBottomColor: colors.black111,
		borderBottomWidth: 1,
		color: colors.black111,
		paddingVertical: 10,
		textAlign: 'center',
		letterSpacing: 5,
	},
	hidden: {
		right: 0,
		top: 3,
		zIndex: 100,
		position: 'absolute',
	},
	right: {
		textAlign: 'right',
		color: colors.blood_red,
		marginTop: 8,
		marginBottom: 24,
		fontSize: 10,
	},
	wrapper: {
		width: 18,
		height: 18,
		borderRadius: 9,
		justifyContent: 'center',
		backgroundColor: colors.black111,
		alignItems: 'center',
	},
	timer: {
		fontSize: 12,
		color: colors.white,
	},
	title: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 18,
	},
	background: {
		backgroundColor: 'rgba(255,255,255,.2)',
	},
	button: {
		height: 44,
		marginVertical: 10,
		paddingTop: 10,
		elevation: 0,
	},
	gray: {
		borderWidth: 2,
		borderColor: colors.light_gray,
		backgroundColor: colors.white,
	},
	gray_t: {
		color: colors.light_gray,
	},
	red: {
		backgroundColor: colors.blood_red,
	},
	red_t: {
		color: colors.blood_red,
	},
	white_t: {
		color: colors.white,
	},
	text: {
		color: colors.light_gray,
		fontSize: 14,
		fontFamily: 'Rubik-Medium',
	},
})
