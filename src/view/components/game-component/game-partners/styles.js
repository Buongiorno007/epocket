import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 28
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
	gradient: {
		width,
		height,
		alignItems: 'center',
		paddingBottom: 60,
		paddingTop: 40,
		zIndex: 3,
		backgroundColor: colors.white,
	},
	zifi_text: {
		fontFamily: 'Rubik-BoldItalic',
		color: colors.black111,
		fontSize: 15,
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginTop: 8,
		alignSelf: 'center',
	},
	container: {
		flex: 1,
		width,
		paddingHorizontal: 16,
	},
	visit_partners: {
		color: colors.black111,
		marginTop: 16,
		marginBottom: 8,
		alignSelf: 'center',
	},
	brands: {
		flex: 1,
		paddingVertical: 8,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255,255,255, 0.26)',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255,255,255, 0.26)',
	},
	visit_trc: {
		paddingVertical: 16,
	},
	visit_trc_text: {
		color: colors.black111,
		alignSelf: 'center',
	},
	each_brand: {
		width: width * 0.42,
		marginBottom: width * 0.16 - 32,
	},
})
