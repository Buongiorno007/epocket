import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
	main_view: {
		position: 'absolute',
		flex: 1,
		width: width,
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 0,
		backgroundColor: colors.backgroundForAnimated,
		zIndex: 998,
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
	circle_container: {
		zIndex: 1001,
		width: width * 0.85,
		height: height * 0.3,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnContainer: {
		zIndex: 1001,
		bottom: 0,
	},
	open_settings: {
		width: width * 0.6,
		borderRadius: 40,
		height: 60,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		overflow: 'hidden',
	},
	attention: {
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
		fontFamily: 'Rubik-Medium',
		fontSize: 18,
		marginBottom: 28,
	},
	root_text: {
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
		fontFamily: 'Rubik-Regular',
		fontSize: 12,
	},
	settings_text: {
		textAlign: 'center',
		alignSelf: 'center',
		position: 'absolute',
		fontFamily: 'Rubik-Medium',
		fontSize: 12,
	},
	bottom_image: {
		position: 'absolute',
		bottom: 0,
		zIndex: 999,
		width: width,
		height: height * 0.9,
	},
})
