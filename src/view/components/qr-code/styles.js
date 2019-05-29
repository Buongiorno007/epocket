import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		width: width,
		height: height,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		paddingTop: 20,
		backgroundColor: '#F5F9FE',
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	top: {
		position: 'absolute',
		top: 20,
		left: 0,
		right: 0,
	},
})
