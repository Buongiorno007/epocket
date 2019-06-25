import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
import { colors } from '@constants/colors'

export default StyleSheet.create({
	container: {
		height: 100,
		backgroundColor: '#fff',
		borderRadius: 8,
		overflow: 'hidden',
	},
	image: {
		flex: 1,
	},
	text_view: {
		marginHorizontal: 8,
		borderTopColor: '#E9EEF5',
		borderTopWidth: 1,
		paddingVertical: 8,
		alignItems: 'center',
	},
	text: {
		fontFamily: 'Rubik-Bold',
		fontSize: 15,
	},
})
