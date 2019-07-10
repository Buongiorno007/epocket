import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	view: {
		width: '100%',
		marginTop: 24,
	},
	date: {
		color: 'rgba(0,0,0,0.4)',
		alignSelf: 'center',
	},
})
