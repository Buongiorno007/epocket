import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')
const main_width = width * 0.85 - 65
const left_width = main_width * 0.7
const right_width = main_width * 0.3

export default StyleSheet.create({
	trc_info: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		borderRadius: 12,
		width: main_width,
		height: 50,
		alignItems: 'center',
	},
	right: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: right_width,
	},
	left: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		width: left_width,
		paddingLeft: 15,
	},
	trc_info_text_tittle: {
		color: colors.black,
		fontSize: 14,
		fontFamily: 'Rubik-Bold',
		width: right_width - 10,
	},
	trc_info_text_info: {
		marginTop: 5,
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Rubik-Regular',
		opacity: 0.6,
	},
	trc_info_border: {
		width: 1,
		height: 22,
		backgroundColor: colors.gray,
		opacity: 0.25,
	},
})
