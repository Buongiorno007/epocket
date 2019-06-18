import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	frame: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.6,
		height: width * 0.6,
	},
	image: {
		position: 'absolute',
		width: width * 0.65,
		height: width * 0.65,
	},
	camera: {
		width: width * 0.6,
		height: width * 0.6,
	},
	scanner: {
		height: width * 0.3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		width: width * 0.06,
		height: width * 0.06,
		position: 'absolute',
	},
})
