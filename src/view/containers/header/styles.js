import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

const toolbarHeight = Platform.OS === 'ios' ? 64 : Header.HEIGHT

export default StyleSheet.create({
	layout: {
		width,
		backgroundColor: colors.transparent,
	},
	wrapper: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		...Platform.select({
			android: {
				marginTop: StatusBar.currentHeight,
				height: toolbarHeight,
			},
			ios: {
				marginTop: iPhoneX ? 8 : 0,
				height: toolbarHeight,
			},
		}),
	},
	body: {
		alignSelf: 'flex-end',
		justifyContent: 'center',
	},
	action: {
		flex: 1,
		flexDirection: 'row',
	},
	title: {
		fontWeight: '600',
		color: colors.black111,
		fontSize: 18,
	},
	left: {
		justifyContent: 'flex-start',
	},
	right: {
		justifyContent: 'flex-end',
	},
})
