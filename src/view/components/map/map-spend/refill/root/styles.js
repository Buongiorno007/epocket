import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { colors } from '@constants/colors'
import { Header } from 'react-navigation'
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)
const toolbarHeight = Platform.OS === 'ios' ? 64 : Header.HEIGHT
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
	layout: {
		width,
		height,
		backgroundColor: colors.white,
	},
	keyboard: {
		position: 'absolute',
		...Platform.select({
			android: {
				top: toolbarHeight + StatusBar.currentHeight,
				height: height - toolbarHeight,
			},
			ios: {
				top: toolbarHeight + (iPhoneX ? 34 : 0),
				height: height - toolbarHeight,
			},
		}),
		width,
		flexDirection: 'column',
	},
	scroll: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 16,
	},
	field: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: colors.black111,
		fontSize: 14,
		fontFamily: 'Rubik-Regular',
		lineHeight: 17,
		color: colors.black111,
		textAlign: 'center',
		padding: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
		lineHeight: 18,
		color: colors.black111,
		marginBottom: 20,
	},
	sub_title: {
		fontSize: 12,
		fontFamily: 'Rubik-Regular',
		lineHeight: 14,
		color: colors.black111,
		marginBottom: 10,
	},
	description: {
		fontSize: 10,
		lineHeight: 12,
		textAlign: 'center',
		color: colors.black111,
	},
	button: {
		backgroundColor: colors.blood_red,
		marginTop: 30,
	},
	text: {
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'Rubik-Medium',
		letterSpacing: 1.5,
		color: colors.white,
	},
})
