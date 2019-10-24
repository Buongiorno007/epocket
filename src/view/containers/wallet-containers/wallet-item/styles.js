import { StyleSheet, Dimensions } from 'react-native'
import colors_men from '../../../../constants/colors_men'
import { colors } from "@constants/colors"
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	view: {
		width: '100%',
		marginTop: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopWidth: 1,
		borderTopColor: colors.gray_e5,
		paddingTop: 16
	},
	circle: {
		width: width * 0.12,
		height: width * 0.12,
		borderRadius: width * 0.06,
		marginRight: 16,
	},
	titles: {
		flex: 1,
	},
	title: {
		fontSize: 14,
		color: colors.black111,
		fontFamily: 'Rubik-Regular',
	},
	description: {
		fontSize: 10,
		color: colors.gray_b1,
		fontFamily: 'Rubik-Regular',
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
	},
	priceContainer: {
		minWidth: 72, 
		alignItems: 'flex-end'
	},
	price_positive: {
		color: colors.black111,
	},
	price_pending: {
		color: colors.gray_b1,
	},
	time: {
		fontFamily: 'Rubik-Regular',
		fontSize: 10,
		color: colors.gray_b1
	}
})
