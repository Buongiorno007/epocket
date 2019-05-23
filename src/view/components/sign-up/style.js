import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
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
	scrollView: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 48,
	},
	textLeft: {
		textAlign: 'left',
		color: 'rgba(255, 255, 255, .75)',
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
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
		color: '#FFF',
		paddingVertical: 10,
		marginBottom: 32,
	},
	buttonsBlock: {
		width: '100%',
		flexDirection: 'row',
		marginBottom: 32,
	},
	leftButton: {
		borderWidth: 1,
		borderColor: '#fff',
		marginRight: 12,
		flexGrow: 1,
		borderRadius: 20,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightButton: {
		borderWidth: 1,
		borderColor: '#fff',
		marginLeft: 12,
		flexGrow: 1,
		borderRadius: 20,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
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
