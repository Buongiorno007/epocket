import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	card: {
		height: width * 0.65,
		width: width * 0.6,
		backgroundColor: colors.white,
		borderRadius: 12,
		marginLeft: width * 0.05,
		padding: 10,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2,
		shadowColor: colors.card_shadow,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 5,
		shadowOpacity: 0.3,
	},
	icon: {
		height: width * 0.3,
		width: width * 0.3,
		borderRadius: width * 0.15,
	},
	price: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		textAlign: 'center',
		color: colors.black_o30,
	},
	text_cashout: {
		height: width * 0.07,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
	owner: {
		fontFamily: 'Rubik-Medium',
		textAlign: 'center',
		fontSize: 14,
		color: colors.black,
	},
	time_range: {
		fontFamily: 'Rubik-Regular',
		fontSize: 12,
		color: colors.black_o60,
	},
})
