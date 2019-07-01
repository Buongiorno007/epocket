import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	container: {
		top: 0,
		left: 0,
		width,
		height,
		position: 'absolute',
		zIndex: 100,
	},
	gradient: {
		width,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
	web_site: {
		top: 0,
		left: 0,
		width,
		height,
		position: 'absolute',
		zIndex: 100,
	},
	timer: {
		width: width * 0.3,
		marginVertical: 16,
		marginTop: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: width * 0.6,
		marginVertical: 16,
		marginTop: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	timer_text: {
		color: '#fff',
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
	},
	button_text: {
		color: '#F63272',
		fontSize: 12,
		fontFamily: 'Rubik-Medium',
	},
	img_container: {
		flex: 1,
		justifyContent: 'center',
	},
	icon: {
		width: 27,
		height: 27,
		alignSelf: 'center',
		marginVertical: 16,
		marginTop: 40,
		justifyContent: 'center',
	},
	icon_img: {
		width: 27,
		height: 27,
	},
})
