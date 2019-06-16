import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		width,
		height,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginBottom: 24,
		marginTop: 8,
		alignSelf: 'center',
	},
	text: {
		textAlign: 'center',
		marginBottom: 16,
		color: '#fff',
	},
})
