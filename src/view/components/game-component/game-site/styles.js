import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

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
		backgroundColor: colors.blood_red,
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
		backgroundColor: colors.white,
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
		color: colors.black111,
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
	},
	button_text: {
		color: colors.blood_red,
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
