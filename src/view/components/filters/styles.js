import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	scroll: {
		backgroundColor: '#E5EDF7',
	},
	reset: {
		borderTopColor: '#E5EDF7',
		borderTopWidth: 1,
		alignItems: 'center',
		paddingVertical: 8,
	},
	resetButton: {
		backgroundColor: '#F63272',
		paddingHorizontal: 16,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
	},
	resetButtonText: {
		fontFamily: 'Rubik-Regular',
		color: '#fff',
		fontSize: 12,
	},
})
