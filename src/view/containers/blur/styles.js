import { StyleSheet, Dimensions, Platform } from 'react-native'

import { colors } from '../../../constants/colors'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	blur_container: {
		position: 'absolute',
		width: width,
		height: height,
		zIndex: 98,
		backgroundColor: 'rgba(242, 242, 242, 0.5)',
	},
	blur_container_strong: {
		backgroundColor: 'rgba(242, 242, 242, 0.9)',
	},
	blur_loader_dark: {
		backgroundColor: 'rgb(80, 62, 93)',
	},
	blur_container_dark: {
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
	},
	bottom_padding: {
		bottom: Platform.OS === 'ios' ? 60 : 0,
	},
})
