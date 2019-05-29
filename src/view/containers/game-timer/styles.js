import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	time_counter_text: {
		color: colors.dark_pink,
		fontFamily: 'Rubik-Bold',
		fontSize: 18,
		padding: 2,
		textAlign: 'center',
	},
	time_divider: {
		color: colors.dark_pink,
	},
	small_epc_counter_container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	small_time_counter_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: width * 0.53,
	},
	small_time_counter: {
		width: width * 0.23,
		backgroundColor: colors.dark_pink_o10,
		borderRadius: 25,
	},
})
