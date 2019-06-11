import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	layout: {
		width,
		height,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: colors.backgroundForAnimated,
		zIndex: 100,
	},
	keyboard: {
		position: 'absolute',
		height: Platform.OS === 'ios' ? (iPhoneX ? height - Header.HEIGHT - 22 : height - Header.HEIGHT) : height - 62,
		width,
		top: Platform.OS === 'ios' ? (iPhoneX ? Header.HEIGHT + 22 : Header.HEIGHT) : 62,
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 16,
	},
	scroll: {
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	again_button: {
		height: 24,
		borderRadius: 12,
		backgroundColor: 'rgba(255, 255, 255, .17)',
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
		color: '#fff',
	},
	again_button_active: {
		backgroundColor: '#fff',
	},
	again_text_active: {
		color: '#F63272',
	},
	content: {
		width: '100%',
	},
	description: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
		marginBottom: 24,
		fontWeight: 'bold',
	},
	field: {
		width: '100%',
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
		color: '#FFF',
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
		color: '#fff',
		marginTop: 8,
		marginBottom: 24,
		fontSize: 10,
	},
	wrapper: {
		width: 18,
		height: 18,
		borderRadius: 9,
		justifyContent: 'center',
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	timer: {
		fontSize: 12,
		color: 'rgba(246, 50, 114, .75)',
	},
	title: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 18,
	},
	background: {
		backgroundColor: 'rgba(255,255,255,.2)',
	},
})
