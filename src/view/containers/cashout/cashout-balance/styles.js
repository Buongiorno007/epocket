import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../../constants/colors'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		width: width,
		height: height * 0.15,
		paddingTop: 10,
		paddingLeft: width * 0.04,
		paddingRight: width * 0.04,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		zIndex: 2,
	},
	block: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	vertical_block: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		height: height * 0.1,
	},
	vertical_block_center: {
		flexDirection: 'column',
		alignItems: 'center',
		height: height * 0.1,
	},
	small_border: {
		backgroundColor: colors.white_o70,
		height: 1,
		width: 20,
	},
	balance_title: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	balance_value: {
		alignItems: 'flex-start',
	},
	text: {
		color: 'rgba(255, 255, 255, 1)',
		fontSize: width * 0.04,
	},
	item: {
		justifyContent: 'center',
		height: height * 0.08,
	},
	navigation_item: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		width: 10,
		height: 20,
		marginRight: width * 0.02,
	},
	epc_icon_filler: {
		height: 30,
	},
	epc_icon: {
		width: 20,
		height: 30,
		marginRight: width * 0.02,
	},
	cash: {
		textAlign: 'left',
		fontSize: 18,
		paddingLeft: -width * 0.04,
		fontFamily: 'Rubik-Bold',
	},
	title: {
		fontSize: 12,
		fontFamily: 'Rubik-Medium',
	},
	barcode_btn: {
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.25,
		height: 30,
	},
	barcode_icon: {
		width: 30,
		height: 20,
	},
	refill: {
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.35,
		height: 30,
	},
	textBlack: {
		color: colors.black,
		marginRight: 10,
	},
})
