import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native'
const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height
export default StyleSheet.create({
	layout: {
		position: 'absolute',
		width: width,
		height: height,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		zIndex: 990,
		...Platform.select({
			android: {
				backgroundColor: 'rgba(255,255,255,0.95)',
			},
		}),
	},
	blur: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	loader: {
		position: 'absolute',
		bottom: height * 0.25,
		width: width * 0.25,
		height: width * 0.25,
		zIndex: 99,
	},
})
