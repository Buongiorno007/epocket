import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	timer: {
		width,
		paddingHorizontal: 16,
		paddingVertical: 16,
		position: 'absolute',
		alignItems: 'center',
		zIndex: 2,
	},
	timer_start: {
		backgroundColor: 'rgba(31,173,226,0.55)',
	},
	timer_stop: {
		backgroundColor: 'rgba(246, 50, 114, 0.55)',
	},
	title_text: {
		fontSize: 12,
		fontFamily: 'Rubik-Regular',
		color: '#fff',
		textAlign: 'center',
	},
	time_text: {
		fontSize: 34,
		fontFamily: 'Rubik-light',
		color: '#fff',
		textAlign: 'center',
	},
	return_view: {
		backgroundColor: 'rgba(246, 50, 114, 0.5)',
		borderRadius: 50,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
})
