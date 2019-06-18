import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		flex: 1,
		paddingHorizontal: width * 0.05,
	},
})
