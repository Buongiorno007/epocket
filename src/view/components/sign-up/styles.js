import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	registration_page: {
		height: height,
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	background: {
		position: 'absolute',
		height: height,
		width: width,
	},
	form: {
		width: width * 0.85,
		//  marginBottom: 30
	},
	webView: {
		flex: 1,
	},
	signUpBtn: {
		marginTop: 40,
	},
	bottom_image: {
		position: 'absolute',
		bottom: 0,
		height: height * 0.45,
		width: width,
	},
	grad: {
		position: 'absolute',
		height: height,
		width: width,
	},
	code_sent: {
		position: 'relative',
		color: colors.white,
		fontFamily: 'Rubik-Light',
		fontSize: 16,
		textAlign: 'center',
	},
	enter_code: {
		position: 'relative',
		color: colors.enter_code,
		fontFamily: 'Rubik-Light',
		fontSize: 12,
		textAlign: 'center',
		marginTop: 20,
	},
	code_input: {
		textAlign: 'center',
	},
	check_code: {
		position: 'relative',
		color: colors.check_code,
		fontFamily: 'Rubik-Light',
		fontSize: 12,
		textAlign: 'center',
		marginTop: 10,
	},
	number_exists: {
		color: colors.check_code,
		fontFamily: 'Rubik-Light',
		fontSize: 10,
		textAlign: 'right',
	},
	disabled: {
		display: 'none',
	},
})
