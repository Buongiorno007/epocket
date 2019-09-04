import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	field: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 24,
	},
	text: {
		fontFamily: 'Rubik-Bold',
		fontSize: 24,
		color: '#fff',
		textAlign: 'center',
		marginTop: 24,
		marginBottom: 16,
	},
	scroll: {
		flex: 1,
		borderColor: 'rgba(255,255,255,0.3)',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		paddingTop: 24,
	},
	qr: {
		width: 22,
		height: 22,
	},
	qrText: {
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		color: '#F63272',
	},
	button: {
		height: 40,
		borderRadius: 20,
		backgroundColor: '#fff',
		marginVertical: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	price: {
		fontFamily: 'Rubik-Bold',
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
		marginTop: 16,
	},
})
