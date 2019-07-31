import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '../../../constants/colors'
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 28
		? Dimensions.get('screen').height
		: Dimensions.get('window').height
export default StyleSheet.create({
	container: {
		width,
		height,
		alignItems: 'center',
		backgroundColor: colors.backgroundForAnimated,
	},
	grad: {
		position: 'absolute',
		height: height,
		width: width,
	},
	image_background: {
		position: 'absolute',
		top: 0,
		height: height,
		width: width,
	},
	image_template: {
		zIndex: 1,
		alignSelf: 'center',
		height: 165,
		width: width,
		// backgroundColor :  colors.white,
		marginBottom: 30,
	},
	success: {
		zIndex: 1,
		flex: 1,
		width: width * 0.85,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text_common: {
		width: width * 0.85,
		textAlign: 'center',
		marginBottom: 25,
	},
	text_desc: {
		width: width * 0.85,
		textAlign: 'center',
		color: 'rgba(255, 255, 255, 0.6)',
	},
	more_money: {
		fontSize: 30,
		color: colors.white,
	},
	more_text: {
		fontSize: 18,
		color: colors.white,
	},
	more_subtext: {
		fontSize: 15,
		color: colors.white,
	},
	more_deck: {
		fontSize: 12,
		color: colors.white,
	},

	skip_button: {
		width: width * 0.85,
		height: 60,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 12,
		color: colors.white,
	},
	earn_more_btn: {
		marginTop: 24,
	},
	toast: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
