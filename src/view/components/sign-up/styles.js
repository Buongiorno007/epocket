import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

const toolbarHeight = Platform.OS === 'ios' ? 64 : Header.HEIGHT

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
	text_input: {
		width,
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
		color: '#FFF',
		paddingVertical: 10,
		marginBottom: 32,
	},
	button: {
		borderWidth: 1,
		borderColor: '#fff',
		height: 40,
		width: width * 0.425,
		alignItems: 'center',
		justifyContent: 'center',
	},
	active_button: {
		borderWidth: 0,
		backgroundColor: 'rgba(255, 255, 255, 0.45)',
	},
	title: {
		fontSize: 16,
		color: '#fff',
	},
	active_title: {
		color: '#F63272',
	},
})
