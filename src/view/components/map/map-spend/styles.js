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
		marginTop: -28,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	map_view: {
		width,
		height: width * 0.7,
	},
	map: {
		flex: 1,
	},
	touchMap: {
		position: 'absolute',
		bottom: 28,
		left: 8,
		width: 64,
		height: 64,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageView: {
		flex: 1,
	},
	basket: {
		position: 'absolute',
		bottom: 44,
		right: 16,
	},
	fieldStyle: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		backgroundColor: '#F5F9FE',
		borderRadius: 24,
		marginBottom: 16,
	},
	text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		marginBottom: 8,
		marginLeft: 16,
		color: '#fff',
	},
})
