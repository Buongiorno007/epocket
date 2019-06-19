import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		...Platform.select({
			android: {
				height: width * 0.15,
			},
			ios: {
				height: width * 0.2,
			},
		}),
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	wrapper: {
		flex: 1,
	},
	size: {
		height: 40,
		justifyContent: 'center',
	},
	text: {
		fontSize: width * 0.04,
		color: '#000',
	},
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
	},
	date: {
		textAlign: 'center',
	},
	info: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	button: {
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40,
	},
	icon: {
		width: 15,
		height: 15,
	},
})
