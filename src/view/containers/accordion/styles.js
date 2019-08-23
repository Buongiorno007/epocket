import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		overflow: 'hidden',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(112, 112, 112, 0.3)',
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16,
	},
	endArrow: {
		flexGrow: 1,
	},
	title: {
		color: '#2a2f43',
		fontSize: 18,
		height: 18,
	},
	button: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 16,
		// backgroundColor: 'lightblue',
		alignItems: 'center',
	},
	body: {
		// paddingBottom: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	eachItem: {
		width: width / 2 - 24,
		marginBottom: 16,
	},
	img: {
		width: width / 2 - 24,
		height: width / 3 - 16,
	},
})
