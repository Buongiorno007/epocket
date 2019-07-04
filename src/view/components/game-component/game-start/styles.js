import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')
const { height } =
	Platform.OS === 'android' && Platform.Version > 28 ? Dimensions.get('screen') : Dimensions.get('window')

export default StyleSheet.create({
	container: {
		width,
		height,
		paddingHorizontal: 16,
		backgroundColor: '#F5F9FE',
	},
})
