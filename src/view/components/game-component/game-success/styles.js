import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	zifi_text: {
		color: colors.white,
		fontSize: 15,
		fontFamily: 'Rubik-BoldItalic',
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginBottom: 24,
		marginTop: 8,
		alignSelf: 'center',
	},
	title: {
		textAlign: 'center',
		marginBottom: 16,
		fontSize: 16,
		fontFamily: 'Rubik-Medium',
		color: colors.white,
	},
	button: {
		height: 40,
		marginTop: 16,
		width: width * 0.6,
		alignSelf: 'center',
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				shadowOpacity: 0.2,
				shadowOffset: {
					width: 0.2,
					height: 2,
				},
				shadowColor: '#000000',
				shadowRadius: 2,
			},
			android: {
				elevation: 4,
			},
		}),
	},
	text: {
		fontSize: 14,
		fontWeight: '700',
		color: colors.dark_pink,
	},
})
