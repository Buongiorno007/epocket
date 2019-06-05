import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '../../../constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	headerTitle: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 18,
	},
	headerBackground: {
		backgroundColor: 'rgba(255,255,255,.2)',
	},
	container: {
		width: width,
		height: height,
		flex: 1,
		backgroundColor: colors.backgroundForAnimated,
		zIndex: 100,
	},
	grad: {
		position: 'absolute',
		height: Platform.OS === 'ios' ? (iPhoneX ? height - Header.HEIGHT - 22 : height - Header.HEIGHT) : height - 62,
		width: width,
		top: Platform.OS === 'ios' ? (iPhoneX ? Header.HEIGHT + 22 : Header.HEIGHT) : 62,
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 16,
	},
	scrollView: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
		lineHeight: 18,
		color: '#fff',
		marginBottom: 20,
	},
	subHead: {
		fontSize: 12,
		fontFamily: 'Rubik-Regular',
		lineHeight: 14,
		color: 'rgba(255, 255, 255, .6)',
		marginBottom: 10,
	},
	input: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#fff',
		fontSize: 14,
		fontFamily: 'Rubik-Regular',
		lineHeight: 17,
		color: '#fff',
		textAlign: 'center',
		padding: 10,
		marginBottom: 10,
	},
	subHead2: {
		fontSize: 10,
		lineHeight: 12,
		color: 'rgba(255, 255, 255, .8)',
	},
	button: {
		backgroundColor: '#fff',
		marginTop: 30,
	},
	buttonText: {
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'Rubik-Medium',
		letterSpacing: 2,
	},
	successText: {
		fontSize: 14,
		lineHeight: 16,
		fontFamily: 'Rubik-Regular',
		color: '#fff',
		marginBottom: 20,
		textAlign: 'center',
	},
	noMoney: {
		fontSize: 18,
		lineHeight: 22,
		fontFamily: 'Rubik-Regular',
		color: '#fff',
		textAlign: 'center',
	},
})
