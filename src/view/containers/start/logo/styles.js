import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		marginTop: width * 0.1,
		width: width * 0.5,
		height: width * 0.3,
	},
	image: {
		flex: 1,
		width: null,
		height: null,
	},
})
