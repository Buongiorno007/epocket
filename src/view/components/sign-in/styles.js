import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

const toolbarHeight = Platform.OS === 'ios' ? 64 : 56

export default StyleSheet.create({
	layout: {
		width,
		height,
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
		color: 'rgba(255, 255, 255, .75)',
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
})
