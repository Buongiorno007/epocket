import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	photo_container: {
		flex: 1,
		borderRadius: width,
	},
	img_container: {
		flex: 1,
		borderRadius: width,
		paddingHorizontal: 3,
		paddingVertical: 3,
		backgroundColor: 'rgba(255, 255, 255, .2)',
	},
	photo: {
		flex: 1,
		borderRadius: width,
	},
	button_container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: width,
	},
})
