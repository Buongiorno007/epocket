import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		width,
		height: 90,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingHorizontal: 16,
	},
	button: {
		width: (width - 48) / 2,
		height: 40,
		marginBottom: 8,
		backgroundColor: 'rgba(246, 50, 114, 0.1)',
		borderRadius: 20,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	gradient: {
		flex: 1,
		borderRadius: 20,
	},
	text: {
		fontSize: 15,
		position: 'absolute',
		alignSelf: 'center',
		color: '#F63272',
		fontFamily: 'Rubik-Regular',
	},
	text_active: {
		fontFamily: 'Rubik-Medium',
		color: '#fff',
	},
})
