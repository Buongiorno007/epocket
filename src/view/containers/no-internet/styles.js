import { StyleSheet, Dimensions, Platform } from 'react-native'

import { colors } from '../../../constants/colors'

const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
	no_internet: {
		flexDirection: 'column',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: height,
		width: width,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: colors.no_internet_background,
		zIndex: 999,
	},
	purple_text: {
		position: 'absolute',
		top: height * 0.25,
		fontFamily: 'Rubik-Regular',
		fontSize: 20,
		color: colors.purple,
		textAlign: 'center',
	},
	no_internet_image: {
		position: 'absolute',
		bottom: 0,
		width: width,
		height: height * 0.5,
	},
})
