import { StyleSheet, StatusBar, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

const toolbarHeight = Platform.OS === 'ios' ? 64 : 56

export default StyleSheet.create({
	layout: {
		width,
		backgroundColor: 'rgba(255,255,255,.2)',
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
				marginTop: iPhoneX ? 34 : 0,
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
		color: '#fff',
		fontSize: 18,
	},
	left: {
		justifyContent: 'flex-start',
	},
	right: {
		justifyContent: 'flex-end',
	},
})
