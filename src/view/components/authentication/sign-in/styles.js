import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

const toolbarHeight = Platform.OS === 'ios' ? 64 : Header.HEIGHT

export default StyleSheet.create({
	layout: {
		flex: 1,
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
		flex: 1,
		marginHorizontal: 16,
		height,
	},
	wrapepr: {
		width,
	},
	text: {
		color: colors.light_gray,
		marginBottom: 8,
		fontSize: 14,
		fontFamily: 'Rubik-Medium',
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
	button: {
		height: 44,
		marginVertical: 10,
		paddingTop: 15,
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
	}
})
