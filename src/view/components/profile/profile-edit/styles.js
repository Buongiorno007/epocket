import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height
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
		width,
		height,
		backgroundColor: colors.white,
		zIndex: 100,
	},
	img: {
		position: 'absolute',
		width: width,
		top: Platform.OS === 'ios' ? (iPhoneX ? Header.HEIGHT + 22 : Header.HEIGHT) : 62,
	},
	grad: {
		// position: 'absolute',
		// height: Platform.OS === 'ios' ? (iPhoneX ? height - Header.HEIGHT - 22 : height - Header.HEIGHT) : height - 62,
		// width: width,
		// top:
		// 	Platform.OS === 'ios'
		// 		? iPhoneX
		// 			? Header.HEIGHT + 22
		// 			: Header.HEIGHT
		// 		: Platform.OS === 'android' && Platform.Version > 28
		// 		? 85
		// 		: 62,
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 16,
	},
	photo_container: {
		width: width * 0.34,
		height: width * 0.34,
		borderRadius: width * 0.17,
		marginBottom: 32,
		marginTop: 8,
	},
	scrollView: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 48,
	},
	textLeft: {
		textAlign: 'left',
		color: colors.black111,
		marginBottom: 8,
		fontSize: 12,
	},
	eye: {
		right: 0,
		top: 3,
		zIndex: 100,
		position: 'absolute',
	},
	fullWidth: {
		width: '100%',
	},
	textRight: {
		textAlign: 'right',
		color: '#fff',
		marginTop: 8,
		marginBottom: 24,
		fontSize: 10,
	},
	textInput: {
		width: '100%',
		borderBottomColor: colors.black111,
		borderBottomWidth: 1,
		color: colors.black111,
		paddingVertical: 10,
		marginBottom: 32,
		fontSize: 16,
	},
	buttonsBlock: {
		width: '100%',
		flexDirection: 'row',
		marginBottom: 32,
	},
	leftButton: {
		borderWidth: 1,
		borderColor: colors.black111,
		marginRight: 12,
		flexGrow: 1,
		borderRadius: 20,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
	},
	rightButton: {
		borderWidth: 1,
		borderColor: colors.black111,
		marginLeft: 12,
		flexGrow: 1,
		borderRadius: 20,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
	},
	genderActive: {
		backgroundColor: colors.black111,
	},
	genderText: {
		fontSize: 16,
		color: colors.black111,
	},
	genderActiveText: {
		fontSize: 16,
		color: colors.white,
	},
	button: {
		height: 44,
		marginVertical: 10,
		paddingTop: 10,
		elevation: 0,
		backgroundColor: colors.blood_red,
	},
	text: {
		color: colors.white,
		fontSize: 14,
		fontFamily: 'Rubik-Medium',
	},
})
