import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	image: {
		width: 20,
		resizeMode: 'center',
		height: 20,
	},
	text: {
		color: '#F63272',
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
	},
	markerOutline: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderWidth: 2,
		borderColor: colors.black111,
		backgroundColor: colors.transparent,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infobox: {
		position: 'absolute', 
		left: 16,
		right: 16,
		bottom: 60, 
		backgroundColor: 'white', 
		borderRadius: 10, 
		padding: 10
	},
	infobox_image: { 
		width: 48, 
		height: 48, 
		borderRadius: 24, 
	},
	infobox_image_outline: {
		width: 56,
		height: 56,
		backgroundColor: colors.transparent,
		borderWidth: 2,
		borderColor: colors.blood_red,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 16 
	},
	infobox_title: {
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		color: colors.black111
	}
})
