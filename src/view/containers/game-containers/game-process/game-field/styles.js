import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
import { colors } from '@constants/colors'

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: width - 32,
		height: width - 35,
	},
	game_description_text: {
		textAlign: 'center',
		color: colors.black41,
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
		marginBottom: 16,
	},
	it: {
		marginTop: -1,
		width: (width - 35) / 3,
		height: (width - 35) / 3,
		borderWidth: 1,
		borderRadius: 0,
	},
	item: {
		borderColor: colors.transparent,
	},
	item_pressed: {
		borderWidth: 4,
		borderColor: colors.blood_red,
		backgroundColor: colors.dark_pink_o10,
	},
})
