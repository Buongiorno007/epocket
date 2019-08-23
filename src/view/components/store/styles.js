import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width,
		height: width * 0.8,
		justifyContent: 'space-between',
		paddingBottom: 40,
	},
	scroll: {
		flex: 1,
		backgroundColor: '#E5EDF7',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 8,
		paddingHorizontal: 16,
	},
	withModal: {
		flex: 1,
		marginTop: -24,
	},
})
