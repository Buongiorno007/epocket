import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
import { colors } from '../../../../constants/colors'

export default StyleSheet.create({
	button_container: {
		width: '100%',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		// overflow: "visible",
		borderRadius: 50,
		zIndex: 5,
	},
	insta_button: {
		justifyContent: 'space-between',
		paddingLeft: 15,
		paddingRight: 15,
	},
	enabled_button: {
		backgroundColor: colors.white,
	},
	button_text: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		fontFamily: 'Rubik-Medium',
		textAlign: 'center',
		fontSize: 10,
		zIndex: 6,
	},
	disabled_button: {
		borderWidth: 1,
		borderColor: colors.white,
	},
	disabled_button_text: {
		color: colors.white,
	},
	insta_logo: {
		width: 25,
		height: 25,
		zIndex: 6,
	},
	gradient: {
		position: 'absolute',
	},
	border_btn: {
		position: 'absolute',
		borderRadius: 50,
	},
	background_btn: {
		position: 'absolute',
		height: 38,
		borderRadius: 50,
		backgroundColor: colors.drag_panel_color,
	},
	cart_circle: {
		width: 25,
		height: 25,
		borderRadius: 13,
		padding: 0,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 6,
		backgroundColor: colors.white,
	},
	cart_text: {
		paddingRight: 0,
		paddingLeft: 0,
		textAlign: 'center',
		fontSize: 13,
		fontFamily: 'Rubik-Medium',
		textAlignVertical: 'center',
	},
})
