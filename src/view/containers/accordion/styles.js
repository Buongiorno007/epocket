import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		overflow: 'hidden',
		marginBottom: 8,
		// borderWidth: 1,
		// borderColor: 'rgba(112, 112, 112, 0.3)',
		// borderBottomWidth: 1,
		// borderBottomColor: 'rgba(112, 112, 112, 0.3)',
	},
	image: {
		width:  32,
		height: 32,
		borderRadius: 16,
		marginRight: 16,
	},
	endArrow: {
		width: 12,
		height: 12,
		borderRightWidth: 2,
		borderBottomWidth: 2,
		borderRightColor: '#404140',
		borderBottomColor: '#404140',
		marginRight: 8,
		transform: [{ rotate: '45deg' }],
	},
	opened: {
		transform: [{ rotate: '-135deg' }],
	},
	title: {
		fontFamily: 'Rubik-Light',
		color: '#404140',
		fontSize: 24,
	},
	subtitle: {
		fontFamily: 'Rubik-Light',
		color: '#ADB2B9',
		fontSize: 24,
		flexGrow: 1,
	},
	button: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 22,
		paddingHorizontal: 15,
		// paddingVertical: 16,
		// paddingHorizontal: 8,
		alignItems: 'center',

		borderWidth: 1,
		borderColor: 'rgba(112, 112, 112, 0.3)',
		borderRadius: 10,
	},
	cardTitle: {
		marginTop: 16,
		fontFamily: 'Rubik-Regular',
		color: '#404140',
		fontSize: 14,
		textAlign: 'center',
	},
	cardSubtitle: {
		fontFamily: 'Rubik-Regular',
		color: '#7C7C7C',
		fontSize: 12,
		textAlign: 'center',
	},
	body: {
		// paddingBottom: 16,
		paddingTop: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	eachItem: {
		width: width / 2 - 24,
		marginBottom: 16,
		borderRadius: 16,
	},
	img: {
		width: width / 2 - 24,
		height: width / 3 - 16,
		borderRadius: 16,
	},
})
