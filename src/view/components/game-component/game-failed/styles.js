import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blood_red,
		// justifyContent: 'flex-end',
	},
	gradient: {
		width,
		height,
		position: 'absolute',
		top: 0,
		left: 0,
	},
	layout: {
		flex: 1,
		backgroundColor: colors.white,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginTop: 168,
	},
	zifi_layout: {
		position: 'absolute',
		alignSelf: 'center',
		top: -128,
	},
	zifi_text: {
		fontFamily: 'Rubik-BoldItalic',
		color: '#fff',
		fontSize: 15,
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginTop: 8,
		alignSelf: 'center',
	},
	correct: {
		width: width - 96,
		height: width - 96,
		marginHorizontal: 48,
		marginVertical: 32,
		borderWidth: 1, 
		borderColor: colors.blood_red,
	},
	timer: {
		alignSelf: 'center',
		marginTop: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(246, 50, 114, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	timer_text: {
		color: '#F63272',
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
		marginHorizontal: 32,
	},
	img_container: { 
		flex: 1, 
		justifyContent: 'center',
	},
})
