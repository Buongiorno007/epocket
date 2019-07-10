import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	view: {
		width: '100%',
		marginTop: 24,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	circle: {
		width: width * 0.12,
		height: width * 0.12,
		borderRadius: width * 0.06,
		marginRight: 16,
	},
	titles: {
		flex: 1,
	},
	title: {
		fontSize: 14,
		color: '#404140',
		fontFamily: 'Rubik-Regular',
	},
	description: {
		fontSize: 12,
		color: '#7C7C7C',
		fontFamily: 'Rubik-Regular',
	},
	text: {
		fontFamily: 'Rubik-Light',
		fontSize: width * 0.06,
		marginLeft: 16,
	},
	price_positive: {
		color: '#0B9D32',
	},
	price_negative: {
		color: '#000',
	},
})
