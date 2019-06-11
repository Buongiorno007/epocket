import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { colors } from '@constants/colors'
const { width, height } = Dimensions.get('window')
const iPhoneX = Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: '#F5F9FE',
	},
})
