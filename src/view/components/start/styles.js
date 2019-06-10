import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		width,
		height,
	},
	align: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	padding: {
		paddingHorizontal: 16,
	},
})
