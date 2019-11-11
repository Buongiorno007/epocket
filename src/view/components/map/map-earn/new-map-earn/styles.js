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
		height: Platform.OS === 'android' ? height - 48 : height,
    },
    scrollView:{
        marginTop: sbHeight,
    },
	linear: {
		flex: 1,
		backgroundColor: colors.map_gray,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 16,
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
		flex: 1
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
		fontFamily: 'Rubik-Medium',
		fontSize: 15,
		marginTop: 16,
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
	}
})
