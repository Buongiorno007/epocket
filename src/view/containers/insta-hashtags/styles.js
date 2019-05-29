import { StyleSheet, Dimensions } from 'react-native'

import { colors } from './../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		height: 40,
		width: width * 0.7,
		alignSelf: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		flexDirection: 'row',
	},
	items: {
		fontSize: 12,
		color: colors.blue_hashtag,
	},
})
