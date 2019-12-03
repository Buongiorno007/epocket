import { StyleSheet } from 'react-native'
import { colors } from '@constants/colors'

export default StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	imageBorder: {
		borderWidth: 2, 
		borderColor: colors.blood_red, 
		borderRadius: 24, 
		padding: 2, 
		width: 48, 
		height: 48, 
		backgroundColor: colors.transparent, 
		justifyContent: 'center', 
		alignItems: 'center',
		overflow: 'hidden'
	},
	img: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	text_view: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: colors.blood_red,
		marginTop: 8,
		borderRadius: 20,
	},
	text: {
		color: colors.white,
	},
})
