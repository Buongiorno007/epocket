import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')
const { height } =
	Platform.OS === 'android' && Platform.Version > 28 ? Dimensions.get('screen') : Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	textView: {
		width,
		height: width * 0.6 - 90,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
	},
	scroll: {
		flex: 1,
		backgroundColor: '#E5EDF7',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 8,
		paddingHorizontal: 16,
	},
})
