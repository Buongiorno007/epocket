import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 60,
	},
	linear: {
		flex: 1,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		marginTop: -18,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},

	map_view: {
		width,
		height: width * 0.65,
	},
	map: {
		flex: 1,
	},
	touchMap: {
		position: 'absolute',
		bottom: 26,
		left: 16,
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(245,88,144,0.35)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageView: {
		width: 32,
		height: 32,
		borderRadius: 16,
		paddingHorizontal: 4,
		paddingVertical: 4,
		backgroundColor: '#F63272',
		alignItems: 'center',
		justifyContent: 'center',
	},
	basket: {
		position: 'absolute',
		bottom: 34,
		right: 16,
	},
})
