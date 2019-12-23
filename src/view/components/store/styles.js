import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: width - 32,
		height: '100%',
		marginRight: 8,
		borderRadius: 12
		// width,
		// height: width * 0.8,
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
		backgroundColor: 'white',
		// backgroundColor: '#E5EDF7',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		// paddingTop: 8,
		paddingHorizontal: 16,
		marginBottom: 8
	},
	withModal: {
		flex: 1,
		paddingBottom: 24
		// marginTop: -24,
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
	categoriesText: {
		color: '#111111',
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
		marginLeft: 16,
		marginBottom: 8
	},
	aboutText: {
		color: '#111111',
		fontFamily: 'Rubik-Regular',
		fontSize: 13,
		marginLeft: 16,
		marginBottom: 35,
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
	imageContainer: {
		position: 'relative',
		width: width ,
		// width: width - 32,
		height: width * 0.56,
		// height: (width - 32) * 0.55,
		// marginHorizontal: 16,
		// borderRadius: 12,
		// paddingLeft: 16,
		marginVertical: 8,
		overflow: 'hidden',
	},
	dotsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 10,
		left: 0,
		right: 0,
	},
	dots: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginLeft: 10,
	},
	buttonRed: {
		width: width - 32,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingVertical: 22,
		paddingHorizontal: 15,
		marginHorizontal: 16,
		marginBottom: 35,
		alignItems: 'center',
		borderRadius: 12,
		backgroundColor: colors.blood_red
	},
	buttonRedImg: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 16
	},
	buttonRedText: {
		color: '#fff',
		fontFamily: 'Rubik-Medium',
		fontSize: 17,
	},
	buttonRedPrice : {
		marginLeft: 'auto',
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: colors.white,
		borderRadius: 20
	},
	buttonRedPriceText: {
		fontFamily: 'Rubik-Medium',
		fontSize: 13,
		color: colors.black111
	},
	point_title: {
		fontFamily: 'Rubik-Medium',
		fontSize: 21,
		color: colors.black111,
		marginTop: 12
	},
	point_regular: {
		fontFamily: 'Rubik-Regular',
		fontSize: 13,
		color: colors.black111,
		// marginTop: 12
	},
	point_addr: {
		fontFamily: 'Rubik-Regular',
		fontSize: 13,
		color: colors.black,
		maxWidth: width / 2,
	}
})
