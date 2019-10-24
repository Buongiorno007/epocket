import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')
const { height } =
	Platform.OS === 'android' && Platform.Version > 28 ? Dimensions.get('screen') : Dimensions.get('window')

export default StyleSheet.create({
	container: {
		width,
		height,
		paddingHorizontal: 16,
		// backgroundColor: colors.white,
		backgroundColor: colors.map_gray
	},
})
