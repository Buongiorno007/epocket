import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '../../../constants/colors'
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 28
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
	main_view: {
		width,
		height,
		alignItems: 'center',
		justifyContent: 'center',
	},
	grad: {
		height: height,
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
	},
	list_container: {
		backgroundColor: colors.drag_panel_color,
		borderTopRightRadius: 12,
		borderTopLeftRadius: 12,
		height: height * 0.85,
		width: width,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingBottom: 50,
	},
	nav_buttons: {
		width: width * 0.85,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		zIndex: 1,
	},
	history_nav: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: height * 0.15,
	},
})
