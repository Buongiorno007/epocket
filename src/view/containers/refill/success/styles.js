import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	thanks: {
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
		lineHeight: 18,
		color: colors.black111,
		marginBottom: 20,
	},
	result: {
		fontSize: 14,
		lineHeight: 16,
		fontFamily: 'Rubik-Regular',
		color: colors.black111,
		marginBottom: 8,
		textAlign: 'center',
	},
	phone: {
		fontSize: 16,
		fontFamily: 'Rubik-Regular',
		color: colors.black111,
		textAlign: 'center',
	},
	button: {
		width: width * 0.5,
		backgroundColor: colors.blood_red,
		marginTop: 30,
		alignSelf: 'center',
	},
	text: {
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'Rubik-Medium',
		letterSpacing: 2,
		color: colors.white,
	},
})
