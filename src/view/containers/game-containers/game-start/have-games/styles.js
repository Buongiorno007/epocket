import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	grad: {
		top: iPhoneX ? 40 : 32,
		height: iPhoneX ? height - 100 : height - 92,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	zifi_text: {
		textAlign: 'center',
		color: '#BDC3C9',
		fontSize: 16,
		fontFamily: 'Rubik-BoldItalic',
		marginBottom: 24,
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginBottom: 24,
		alignSelf: 'center',
	},
	game_cost_text: {
		color: '#F63272',
		fontSize: 16,
		fontFamily: 'Rubik-Bold',
		textAlign: 'center',
	},
})
