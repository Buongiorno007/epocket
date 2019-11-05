import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blood_red
	},
	textView: {
		width,
		height: width * 0.6 - 90,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 18,
		color: colors.white,
		textAlign: 'center',
	},
	scroll: {
		flex: 1,
		backgroundColor: '#E5EDF7',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 8,
		paddingHorizontal: 16,
	},
	hiddenItem: {
		alignItems: 'center',	
		bottom: 0,
		justifyContent: 'center',	
		position: 'absolute',
		top: 0, 
		width: 75, 
		backgroundColor: colors.blood_red, 
		right: 0
	},
	noOrder: {
		textAlign: 'center', 
		marginTop: 16, 
		fontSize: 16, 
		fontFamily: 'Rubik-Medium'
	}
})
