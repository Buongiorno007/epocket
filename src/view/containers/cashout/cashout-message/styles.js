import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		height: width * 0.38,
		paddingLeft: width * 0.075,
		paddingRight: width * 0.075,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
	},
	title: {
		color: '#414141',
		fontSize: width * 0.04,
		lineHeight: width * 0.08,
	},
	seller: {
		color: 'rgba(65, 65, 65, 0.6)',
		fontSize: width * 0.03,
		lineHeight: width * 0.12,
	},
})
