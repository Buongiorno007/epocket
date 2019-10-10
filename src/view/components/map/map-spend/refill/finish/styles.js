import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'

const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
	layout: {
		width,
		height,
		backgroundColor: colors.white,
	},
})
