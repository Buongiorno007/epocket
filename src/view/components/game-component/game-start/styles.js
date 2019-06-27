import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: '#F5F9FE',
	},
})
