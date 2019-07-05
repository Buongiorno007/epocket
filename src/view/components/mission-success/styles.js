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
	},
	grad: {
		position: 'absolute',
		height: height,
		width: width,
	},
	image: {
		zIndex: 1,
		position: 'absolute',
		top: width * 0.1,
		height: 165,
		width: width,
	},
	image_background: {
		position: 'absolute',
		top: 0,
		height: height,
		width: width,
	},
	success: {
		zIndex: 1,
		flex: 1,
		width: width * 0.6,
		alignItems: 'center',
		justifyContent: 'center',
	},
	congratulation: {
		fontSize: width * 0.05,
		lineHeight: width * 0.08,
		color: colors.white,
	},
	cash: {
		fontSize: width * 0.045,
		lineHeight: width * 0.08,
		color: colors.white_o74,
		textAlign: 'center',
	},
	button: {
		backgroundColor: colors.white,
		marginTop: width * 0.05,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: width * 0.55,
	},
	text: {
		fontSize: width * 0.03,
		color: '#F55890',
	},
})
