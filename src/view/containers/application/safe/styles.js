import { StyleSheet, StatusBar, Platform } from 'react-native'

export default StyleSheet.create({
	layout: {
		flex: 1,
		borderWidth: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
})
