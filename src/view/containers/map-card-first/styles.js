import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')
const firstCardWidth = width * 0.68
export default StyleSheet.create({
	card: {
		height: width * 0.65,
		width: firstCardWidth,
		backgroundColor: colors.white,
		borderRadius: 12,
		marginLeft: width * 0.01,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		elevation: 2,
		shadowColor: colors.card_shadow,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 5,
		shadowOpacity: 0.3,
	},
	card_background: {
		height: width * 0.65,
		width: firstCardWidth,
	},
	card_image: {
		borderRadius: 12,
		resizeMode: 'cover',
	},
	dark_cont: {
		height: width * 0.65,
		width: firstCardWidth,
		borderRadius: 12,
		padding: 10,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		backgroundColor: colors.black_50,
	},
	bottom_btn: {
		alignSelf: 'center',
	},
	timer: {
		height: width * 0.1,
		width: firstCardWidth - 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	top_text: {
		width: firstCardWidth - 20,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	adress: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		color: colors.white_o70,
	},
	name: {
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		color: colors.white,
	},
	time_range: {
		fontFamily: 'Rubik-Regular',
		fontSize: 12,
		color: colors.black_o60,
	},
	time_counter_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 20,
		width: firstCardWidth - 20,
	},
	time_divider: {
		color: colors.white_o70,
	},
	time_counter: {
		width: width * 0.15,
		backgroundColor: colors.white_o36,
		borderRadius: 25,
	},
	time_counter_text: {
		color: colors.white,
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		padding: 2,
		textAlign: 'center',
	},
	social_card: {
		height: width * 0.65,
		width: width * 0.65,
		backgroundColor: colors.white,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		paddingTop: 20,
	},
	social_container_cart: {
		height: width * 0.65,
		width: width * 0.65,
		marginLeft: width * 0.05,
	},
	social_icon: {
		height: 35,
		width: 35,
	},
	social_text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		color: colors.black_90,
		textAlign: 'center',
	},
})
