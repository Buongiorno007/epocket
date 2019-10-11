import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	header: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginLeft: 16,
	},
	arrow: {
		width: 16,
		height: 16,
		borderLeftWidth: 3,
		borderLeftColor: colors.black111,
		borderTopWidth: 3,
		borderTopColor: colors.black111,
		transform: [{ rotate: '-45deg' }],
	},
	back_txt: {
		color: colors.white,
		fontSize: 16,
	},
})
