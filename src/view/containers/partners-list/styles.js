import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
import { colors } from '../../../constants/colors'

export default StyleSheet.create({
	container: {
		height: height * 0.65,
	},
	list: {
		paddingTop: 20,
		height: height * 0.75,
		overflow: 'hidden',
	},
	contentContainerStyle: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: width,
	},
	empty: {
		height: height * 0.75,
		flexDirection: 'column',
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: width * 0.04,
		paddingRight: width * 0.04,
	},
	no_shops: {
		textAlign: 'center',
	},
	filler: {
		height: height * 0.3,
	},
	empty_text: {
		width: width * 0.85,
	},
	partner_card: {
		width: width * 0.4,
		height: width * 0.3,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: colors.white,
		marginLeft: width * 0.025,
		marginRight: width * 0.025,
		marginBottom: width * 0.05,
		borderRadius: 12,
		elevation: 2,
		shadowColor: colors.card_shadow,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowRadius: 5,
		shadowOpacity: 5,
	},
	icon: {
		width: width * 0.2,
		height: width * 0.15,
	},
	border: {
		width: width * 0.25,
		height: 1,
		marginBottom: 5,
		marginTop: 5,
		backgroundColor: colors.gray_partner_line,
	},
	partner_title: {
		paddingLeft: 5,
		paddingRight: 5,
		fontSize: 15,
		color: colors.black,
		fontFamily: 'Rubik-Bold',
	},
})
