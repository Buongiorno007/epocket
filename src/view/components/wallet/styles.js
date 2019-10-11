import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')
import sbHeight from "@services/getSBHeight"
const { height } =
	Platform.OS === 'android' && Platform.Version > 28 ? Dimensions.get('screen') : Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	content: {
		flex: 1,
		backgroundColor: 'gray',
	},
	circles: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: width,
		height: 120,
		zIndex: 0,
	},
	wallet: {
		// marginTop: 48,
		// marginBottom: 32,
		fontSize: 20,
		color: '#fff',
		textAlign: 'center',
	},
	wallet_c: {
		borderRadius: 24, 
		height: 120, 
		marginHorizontal: 16, 
		backgroundColor: colors.blood_red,
		marginTop: sbHeight,
		justifyContent: 'center',
	},
	history: {
		flex: 1,
		backgroundColor: '#F5F9FE',
		// borderTopLeftRadius: 24,
		// borderTopRightRadius: 24,
		marginBottom: 60,
		paddingVertical: 16,
	},
	scroll: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		flex: 1,
	},
	date: {
		marginTop: 24,
		width: '100%',
	},
})
