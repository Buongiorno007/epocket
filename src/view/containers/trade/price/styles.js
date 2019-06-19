import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: width * 0.045,
		lineHeight: width * 0.12,
		color: 'rgba(65, 65, 65, 1)',
	},
	price: {
		color: 'rgba(65, 65, 65, 0.8)',
	},
	line: {
		height: 1,
		borderColor: 'rgba(65, 65, 65, 1)',
		borderWidth: 0.5,
		borderStyle: 'dashed',
	},
})
