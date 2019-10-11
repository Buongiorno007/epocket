import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		width,
		paddingHorizontal: 16,
		marginBottom: 32,
	},
	button: {
		height: 40,
		backgroundColor: 'transparent',
	},
	insta_logo: {
		position: 'absolute',
		left: 12,
		top: 12,
		width: 16,
		height: 16,
	},
	button_text: {
		fontSize: 10,
		fontFamily: 'Rubik-Medium',
	},
	button_white: {
		height: 40,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#575757',
		marginTop: 8,
	},
	button_white_text: {
		fontSize: 10,
		fontFamily: 'Rubik-Medium',
		color: '#575757',
	},
	gradient: {
		borderRadius: 20,
		height: 40,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.blood_red,
	},
})
