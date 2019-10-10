import { StyleSheet } from 'react-native'
import { colors } from '@constants/colors'

export default StyleSheet.create({
	layout: {
		flex: 1,
		paddingHorizontal: 16,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white
	},
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	title: {
		fontSize: 18,
		color: colors.black111,
		textAlign: 'center',
		marginBottom: 24,
		width: '100%',
		textAlign: 'center',
		fontFamily: 'Rubik-Medium',
	},
	button: {
		height: 44,
		marginVertical: 10,
		paddingTop: 15,
		elevation: 0,
		backgroundColor: colors.blood_red,
	},
	text: {
		color: colors.white,
		marginBottom: 8,
		fontSize: 14,
		fontFamily: 'Rubik-Medium',
	},
})
