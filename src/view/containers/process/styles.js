import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		zIndex: 3,
		height: height,
		width: width,
		paddingRight: width * 0.075,
		paddingLeft: width * 0.075,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		backgroundColor: 'rgba(245, 249, 254, 0.9)',
	},
	text: {
		position: 'absolute',
		top: height * 0.15,
		textAlign: 'center',
		fontSize: width * 0.06,
		color: 'rgba(64, 65, 64, 0.9)',
	},
	image: {
		marginTop: width * 0.2,
		width: width * 0.7,
		height: width * 0.7,
	},
})
