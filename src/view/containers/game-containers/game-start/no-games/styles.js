import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	grad: {
		top: iPhoneX ? 40 : 32,
		height: iPhoneX ? height - 100 : height,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
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
		marginBottom: 16,
		textTransform: 'uppercase',
	},
	visit: {
		color: '#414141',
		textAlign: 'center',
	},
	game_aval: {
	  width,
	  height: 55,
	  backgroundColor: colors.transparent,
	  paddingHorizontal: 15,
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  marginTop: 16,
	},
	game_aval_img: {
	  width: 32,
	  height: 32,
	}
})
