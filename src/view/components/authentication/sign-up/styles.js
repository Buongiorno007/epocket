import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'

const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

const toolbarHeight = Platform.OS === 'ios' ? 64 : Header.HEIGHT

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
		paddingBottom: 48,
	},
	wrapper: {
		width: '100%',
	},
	row: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 32,
	},
	text: {
		color: colors.light_gray,
		marginBottom: 8,
		fontSize: 12,
	},
	left: {
		textAlign: 'left',
	},
	right: {
		textAlign: 'right',
	},
	align: {
		justifyContent: 'center',
	},
	image: {
		right: 0,
		top: 3,
		zIndex: 100,
		position: 'absolute',
	},
	text_input: {
		width,
		borderBottomColor: colors.black111,
		borderBottomWidth: 1,
		color: colors.black111,
		paddingVertical: 10,
		marginBottom: 32,
	},
	button: {
		borderWidth: 1,
		borderColor: colors.black111,
		height: 40,
		width: width * 0.425,
		alignItems: 'center',
		justifyContent: 'center',
	},
	active_button: {
		borderWidth: 0,
		backgroundColor: colors.black111,
	},
	title: {
		fontSize: 16,
		color: colors.black111,
	},
	active_title: {
		color: colors.white,
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
		borderWidth: 0,
		backgroundColor: colors.blood_red,
	},
	red_t: {
		color: colors.blood_red,
	},
	white_t: {
		color: colors.white,
	},
	button_big: {
		height: 44,
		width: width - 32,
		paddingTop: 5,
		elevation: 0
	}
})
