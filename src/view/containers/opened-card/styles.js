import { StyleSheet, Dimensions, Platform } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		width: width,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		zIndex: 2,
	},

	bottom_image: {
		position: 'absolute',
		top: 0,
		height: width * 0.6,
		width: width,
	},
	notInMall: {
		width: width * 0.85,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 50,
		borderStyle: 'dotted',
		zIndex: 5,
	},
	notInMall_text: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		fontFamily: 'Rubik-Medium',
		textAlign: 'center',
		fontSize: 10,
		zIndex: 6,
		color: colors.white,
	},
	grad: {
		position: 'absolute',
		bottom: 0,
		height: width * 0.25,
		width: width,
		zIndex: 10,
	},
	image_container: {
		flexDirection: 'row',
		width: width,
		justifyContent: 'center',
		flex: 4,
	},
	image_content: {
		width: width,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
	},
	regular_font: {
		color: colors.white,
		fontFamily: 'Rubik',
		fontSize: 16,
	},
	logo: {
		color: colors.white,
		fontFamily: 'Rubik-Bold',
		fontSize: 16,
	},
	time: {
		color: colors.white,
		fontFamily: 'Rubik-Light',
		fontSize: 14,
	},
	logo_conainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	close_container: {
		width: 55,
		height: 55,
		justifyContent: 'center',
		alignItems: 'center',
	},
	close: {
		width: 15,
		height: 15,
	},
	task_container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: width,
		flex: 6,
		padding: 15,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	task_content: {
		paddingTop: 10,
		alignItems: 'flex-start',
		width: width * 0.85,
	},
	task_line: {
		width: width * 0.8,
		paddingBottom: 10,
		flexDirection: 'row',
	},
	task_text: {
		color: colors.white,
		fontFamily: 'Rubik-Light',
		fontSize: 16,
		flexWrap: 'wrap',
	},
	my_button: {
		paddingTop: 10,
		paddingBottom: 10,
	},
})
