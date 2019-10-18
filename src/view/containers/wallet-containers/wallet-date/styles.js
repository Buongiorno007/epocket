import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	view: {
		width: '100%',
		marginTop: 24,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: colors.gray_e5
	},
	date: {
		color: 'rgba(0,0,0,0.4)',
		alignSelf: 'flex-start',
	},
})
