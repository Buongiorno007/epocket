import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		width,
		height,
	},
	align: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	padding: {
		paddingHorizontal: 16,
	},
})
