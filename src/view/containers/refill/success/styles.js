import { StyleSheet, Dimensions } from 'react-native'
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
		color: '#fff',
		marginBottom: 20,
	},
	result: {
		fontSize: 14,
		lineHeight: 16,
		fontFamily: 'Rubik-Regular',
		color: '#fff',
		marginBottom: 8,
		textAlign: 'center',
	},
	phone: {
		fontSize: 16,
		fontFamily: 'Rubik-Regular',
		color: '#fff',
		textAlign: 'center',
	},
	button: {
		width: width * 0.5,
		backgroundColor: '#fff',
		marginTop: 30,
		alignSelf: 'center',
	},
	text: {
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'Rubik-Medium',
		letterSpacing: 2,
	},
})
