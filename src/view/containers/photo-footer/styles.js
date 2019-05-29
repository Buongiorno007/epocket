import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	view: {
		height: width * 0.1,
		width: width * 0.4,
		borderBottomWidth: 1,
		borderBottomColor: '#8FA3BF',
		marginBottom: 5,
	},
	text: {
		textAlign: 'center',
		fontSize: width * 0.04,
		color: 'rgba(143, 163, 191, 0.6)',
	},
})
