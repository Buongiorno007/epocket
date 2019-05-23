import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	main_view: {
		flex: 1,
		height: height,
		width: width,
		alignItems: 'center',
	},
	grad: {
		position: 'absolute',
		height: height,
		width: width,
		paddingHorizontal: 16,
	},
	signup_signin_buttons: {
		position: 'absolute',
		bottom: 48,
		width: width - 32,
		left: 16,
	},
	registration: {
		height: 40,
		width: '100%',
		borderRadius: 20,
		// alignItems: 'center',
	},
	registration_text: {
		color: '#fff',
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		width: '100%',
		textAlign: 'center',
		position: 'absolute',
		justifyContent: 'center',
	},
	login: {
		marginTop: 24,
		height: 40,
		width: '100%',
		borderRadius: 20,
		backgroundColor: '#fff',
	},
	login_text: {
		color: '#F63272',
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		width: '100%',
		textAlign: 'center',
	},
})
