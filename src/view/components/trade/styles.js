import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		flex: 1,
		paddingHorizontal: width * 0.075,
		backgroundColor: '#F8F6F4',
	},
	scroll: {
		height: height * 0.6,
	},
})
