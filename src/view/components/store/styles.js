import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width,
		height: width * 0.8,
	},
	opacity: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
		justifyContent: 'space-between',
		paddingBottom: 40,
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 24,
		fontFamily: 'Rubik-Bold',
		marginBottom: 4,
	},
	subtitle: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 12,
		fontFamily: 'Rubik-Regular',
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
	modal: {
		flex: 1,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
		overflow: 'hidden',
	},
	rnModal: {
		margin: 0,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
		overflow: 'hidden',
	},
	titleText: {
		color: '#404140',
		fontFamily: 'Rubik-Light',
		fontSize: 24,
	},
	priceText: {
		color: '#404140',
		fontFamily: 'Rubik-Medium',
		fontSize: 24,
	},
	img: {
		width: width,
		height: width * 0.6,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},
	button: {
		marginHorizontal: 16,
		marginBottom: 24,
		height: 40,
		backgroundColor: '#F63272',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
	},
})
