import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		position: 'absolute',
		height: height,
		width: width,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
		zIndex: 10,
		padding: 10,
	},
	text_common: {
		textAlign: 'center',
	},
	name_title: {
		color: colors.black,
		fontFamily: 'Rubik-Medium',
		fontSize: 18,
	},
	adress_title: {
		color: colors.black_o60,
		fontFamily: 'Rubik-Regular',
		fontSize: 11,
	},
	top_title: {
		color: colors.black,
		fontFamily: 'Rubik-Regular',
		fontSize: 15,
	},
	timer: {
		color: colors.black,
		fontFamily: 'Rubik-Bold',
		fontSize: 25,
	},
	bottom_title: {
		color: colors.black,
		fontFamily: 'Rubik-Regular',
		fontSize: 10,
	},
	close_view: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: height * 0.3,
		width: width * 0.85,
	},
	image_content: {
		width: width,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		position: 'absolute',
		top: 10,
		right: 0,
		zIndex: 10,
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
})
