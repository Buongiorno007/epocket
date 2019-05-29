import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	card: {
		height: width * 0.4,
		width: width * 0.9,
		backgroundColor: colors.white,
		borderRadius: 12,
		marginLeft: width * 0.05,
		marginRight: width * 0.05,
		marginBottom: 25,
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 5,
		shadowColor: colors.card_shadow,
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowRadius: 12,
		shadowOpacity: 0.7,
	},
	social_icon: {
		height: width * 0.3,
		width: width * 0.3,
	},
	social_text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 11,
		color: colors.black_90,
		marginBottom: 5,
		textAlign: 'center',
	},
	social_text_big: {
		fontFamily: 'Rubik-Bold',
		fontSize: 15,
		color: colors.black_90,
		textAlign: 'center',
	},
	social_text_container: {
		paddingLeft: width * 0.05,
		width: width * 0.6,
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	social_text_title: {
		fontFamily: 'Rubik-Regular',
		fontSize: 15,
		color: colors.black,
	},
	social_text_desc: {
		fontFamily: 'Rubik-Regular',
		fontSize: 12,
		color: colors.black_o60,
	},
	social_text_ddmmss: {
		fontFamily: 'Rubik-Regular',
		fontSize: 9,
		marginTop: -3,
		color: colors.black_o60,
	},
	timer_row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	timer_column: {
		marginLeft: 2,
		marginRight: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
