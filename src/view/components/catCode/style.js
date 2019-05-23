import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '../../../constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	container: {
		width: width,
		height: height,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 100,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	img: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	title: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
		marginBottom: 24,
		fontWeight: 'bold',
		width: '100%',
		textAlign: 'center',
	},
})
