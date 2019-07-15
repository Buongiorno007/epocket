import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')
const { height } =
	Platform.OS === 'android' && Platform.Version > 28 ? Dimensions.get('screen') : Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		backgroundColor: 'gray',
	},
	circles: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: width,
		height: 120,
		zIndex: 0,
	},
	wallet: {
		marginTop: 48,
		marginBottom: 32,
		fontSize: 20,
		color: '#fff',
		textAlign: 'center',
	},
	history: {
		flex: 1,
		backgroundColor: '#F5F9FE',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingHorizontal: 16,
		marginBottom: 60,
		paddingVertical: 16,
	},
	scroll: {
		paddingVertical: 8,
		flex: 1,
	},
	date: {
		marginTop: 24,
		width: '100%',
	},
})
