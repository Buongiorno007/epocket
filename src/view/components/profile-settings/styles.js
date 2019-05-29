import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
	main_view: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: height,
		width: width,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: colors.drag_panel_color,
	},
	header: {
		width: width,
		flexDirection: 'row',
		height: height * 0.1,
		justifyContent: 'space-between',
		paddingLeft: width * 0.1 + 5,
		backgroundColor: 'transparent',
		alignItems: 'flex-end',
	},
	image_block: {
		flexDirection: 'row',
		height: height * 0.12,
		width: width,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'transparent',
		paddingLeft: width * 0.1,
		paddingRight: width * 0.1,
	},
	image_block_with_button: {
		flexDirection: 'row',
		height: height * 0.12,
		width: width,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'transparent',
	},
	image_block_with_border: {
		borderBottomWidth: 1,
		borderColor: colors.settings_gray,
	},
	image_block_with_top_border: {
		borderTopWidth: 1,
		borderColor: colors.settings_gray,
	},
	image_block_text: {
		paddingLeft: 20,
		width: width * 0.45,
		flexDirection: 'column',
	},
	image_block_text_button: {
		width: width,
		paddingLeft: 20,
		backgroundColor: 'transparent',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	image_block_text_big: {
		fontSize: 12,
		textAlign: 'left',
	},
	image_block_text_small: {
		fontSize: 10,
		textAlign: 'left',
	},
	header_text: {
		paddingLeft: 35,
	},
	settings_btn: {
		height: 30,
		width: 30,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	close_img: {
		height: 15,
		width: 15,
	},
	settings_img: {
		height: 20,
		width: 20,
	},
	info: {
		width: width,
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},

	name: {
		color: colors.black,
		fontSize: 22,
		textAlign: 'left',
		fontFamily: 'Rubik-Bold',
		letterSpacing: 2,
		marginBottom: height * 0.05,
	},
	phone: {
		color: colors.black_o36,
		fontSize: 12,
		textAlign: 'left',
		fontFamily: 'Rubik-Regular',
	},
	photo_container: {
		width: width * 0.4,
		height: width * 0.4,
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignSelf: 'center',
	},
	text_container: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	btn_container: {
		width: width,
		height: height * 0.4,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image_block_button: {
		paddingLeft: width * 0.05,
		zIndex: 1001,
		position: 'absolute',
	},
	button: {
		width: width,
		height: height * 0.12,
		paddingLeft: width * 0.1,
		paddingRight: width * 0.1,
	},
	animation: {
		zIndex: 1000,
		width: width,
		height: height,
		position: 'absolute',
		bottom: 0,
	},
	top_insta: {
		top: height * 0.245,
		right: 10,
	},
	top_facebook: {
		top: height * 0.375,
		right: 10,
	},
	white_text_container: {
		position: 'absolute',
		zIndex: 1001,
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: width * 0.85,
		bottom: 0,
		height: height * 0.3,
	},
	white_text: {
		textAlign: 'center',
		alignSelf: 'center',
		color: colors.white,
		fontFamily: 'Rubik-Bold',
		fontSize: 20,
	},
})
