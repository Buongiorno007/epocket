import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 60,
	},
	linear: {
		flex: 1,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	map_view: {
		width: width - 32,
		height: width - 132,
		overflow: 'hidden',
		borderRadius: 24,
	},
	map: {
		flex: 1,
	},
})
