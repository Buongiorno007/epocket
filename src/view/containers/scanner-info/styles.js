import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	please: {
		marginTop: width * 0.15,
		textAlign: 'center',
		fontSize: width * 0.045,
		color: 'rgba(65, 65, 65, 1)',
	},
	text: {
		marginTop: width * 0.08,
		textAlign: 'center',
		fontSize: width * 0.04,
		color: 'rgba(65, 65, 65, 0.6)',
	},
})
