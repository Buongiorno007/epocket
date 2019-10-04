import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	image: {
		width: 20,
		resizeMode: 'center',
		height: 20,
	},
	text: {
		color: '#F63272',
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
	},
})
