import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		paddingLeft: width * 0.075,
		paddingRight: width * 0.075,
		backgroundColor: '#F8F6F4',
	},
	scroll: {
		height: height * 0.6,
	},
	button: {
		width: width,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: width * 0.2,
	},
})
