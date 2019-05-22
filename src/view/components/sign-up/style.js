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
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.backgroundForAnimated,
		zIndex: 100,
	},
	grad: {
		position: 'absolute',
		// height: height,
		height:
			Platform.OS === 'ios'
				? iPhoneX
					? height - Header.HEIGHT - 22
					: height - Header.HEIGHT
				: height - Header.HEIGHT - StatusBar.currentHeight,
		width: width,
		top:
			Platform.OS === 'ios'
				? iPhoneX
					? Header.HEIGHT + 22
					: Header.HEIGHT
				: Header.HEIGHT + StatusBar.currentHeight,
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 16,
	},
	textLeft: {
		textAlign: 'left',
		color: 'rgba(255, 255, 255, .75)',
		marginBottom: 8,
		fontSize: 12,
	},
	textRight: {
		textAlign: 'right',
		color: '#fff',
		marginTop: 8,
		marginBottom: 24,
		fontSize: 10,
	},
	navigation_item: {
		top: 15,
	},
	icon: {
		width: 10,
		height: 20,
		marginRight: width * 0.02,
	},
	back: {
		color: '#fff',
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'Rubik-Medium',
	},
	avoiding: {
		height: '100%',
	},
	scrollView: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 48,
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
		color: '#fff',
	},
	subHead2: {
		fontSize: 10,
		lineHeight: 12,
		color: 'rgba(255, 255, 255, .8)',
		marginBottom: 30,
	},
	button: {
		backgroundColor: '#fff',
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
	////////////////////////
	////////////////////////
	////////////////////////
	////////////////////////
	////////////////////////
	////////////////////////
	////////////////////////
	inputView: {
		width: '100%',
		// backgroundColor: 'yellow'
	},
	dropDown: {
		width: width * 0.3,
		// color: '#fff',
		// backgroundColor: 'yellow'
		// height: 30
	},
	itemTextStyle: {
		color: 'brown',
		// paddingVertical:15,
		backgroundColor: 'pink',
	},
	textInput: {
		width: '100%',
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
		color: '#FFF',
		paddingVertical: 10,
	},
	genderActive: {
		backgroundColor: 'rgba(255, 255, 255, 0.45)',
	},
	genderText: {
		fontSize: 16,
		color: '#fff',
	},
	genderActiveText: {
		fontSize: 16,
		color: '#F63272',
	},
})
