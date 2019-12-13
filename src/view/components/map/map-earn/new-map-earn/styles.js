import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
import sbHeight from "@services/getSBHeight"
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

export default StyleSheet.create({
	container: {
		height: '100%',
		// height: Dimensions.get('window').height,
		// height: Platform.OS === 'android' ? height - 48 : height,
	},
    marginTop:{
        marginTop: sbHeight,
	},
	paddingBottom: {
		paddingBottom: 100
	},
	linear: {
		flex: 1,
		backgroundColor: colors.map_gray,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 16,
		paddingBottom: 120
		// paddingVertical: 16,
	},
	map_view: {
		width: width - 32,
		height: width * 0.7,

		borderRadius: 24,
		marginHorizontal: 16,
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
				elevation: 3,
			},
		}),
		overflow: 'hidden',
	},
	map_view_big: {
		flex: 1,
		height,
	},
	map: {
		flex: 1,
	},
	touchMap: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		backgroundColor: colors.transparent,
		// bottom: 7,
		// left: 8,
		// width: 64,
		// height: 64,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	imageView: {
		flex: 1,
	},
	basket: {
		position: 'absolute',
		bottom: 22,
		right: 16,
		zIndex: 2,
	},
	fieldStyle: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		backgroundColor: colors.white,
		borderRadius: 24,
		marginBottom: 16,
	},
	text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		marginBottom: 8,
		marginLeft: 16,
		color: colors.black111,
	},
	text_top: {
		marginLeft: 32,
		marginTop: 16
	},
	tittle: {
		fontFamily: 'Rubik-Bold',
		fontSize: 34,
		// marginTop: 16,
		color: colors.black111,
	},
	touchMap: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		backgroundColor: colors.transparent,
	},
	displayNone: {
		display: 'none'
	},
	goBack: {
		position: 'absolute',
		top: sbHeight,
		zIndex: 3,
		width,
		height: 100,
		justifyContent: 'center',
		paddingLeft: 16,
		backgroundColor: colors.transparent
	},
	goBackImg: {
		width: 30,
		height: 50,
	},
	markerOutline: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderWidth: 2,
		borderColor: colors.black111,
		backgroundColor: colors.transparent,
		justifyContent: 'center',
		alignItems: 'center'
	},
	infobox: {
		position: 'absolute',
		left: 16,
		right: 16,
		bottom: 60,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 16
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
		fontSize: 21,
		color: colors.black111
	},
	infobox_time: {
		fontFamily: 'Rubik-Regular',
		fontSize: 15,
		color: colors.black111,
	},
	infobox_text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 13,
		color: colors.gray_a6,
		marginTop: 10
	}

})
