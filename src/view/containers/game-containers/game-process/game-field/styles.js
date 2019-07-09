import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
import { colors } from '@constants/colors'

export default StyleSheet.create({
	main_view: {
		flex: 1,
		paddingHorizontal: 16,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	game_title: {
		flexDirection: 'row',
		marginTop: 30,
		width: width - 32,
		marginBottom: 8,
	},
	game_cost_text: {
		color: colors.black,
		fontSize: 16,
		fontFamily: 'Rubik-Regular',
		width: (width - 32) / 3,
		textAlign: 'left',
	},
	game_title_text: {
		color: colors.black,
		fontSize: 16,
		fontFamily: 'Rubik-Bold',
		width: (width - 32) / 3,
		textAlign: 'center',
	},
	game_time_text: {
		color: colors.black,
		fontSize: 15,
		fontFamily: 'Rubik-Regular',
		width: (width - 32) / 3,
		textAlign: 'right',
	},
	btn_container: {
		marginBottom: 24,
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: width - 32,
		height: width - 35,
	},
	item: {
		width: (width - 38) / 3,
		height: (width - 38) / 3,
		padding: 0,
		marginTop: -1,
		marginRight: -1,
		borderWidth: 1,
		zIndex: 9,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 0,
		borderColor: colors.black_o33,
	},
	game_description_text: {
		textAlign: 'center',
		color: colors.black41,
		fontSize: 15,
		fontFamily: 'Rubik-Bold',
		marginBottom: 16,
	},
	itemmmm: {
		// marginTop: -1,
		// marginLeft: -1,
		width: (width - 32) / 3,
		height: (width - 32) / 3,
		borderRadius: 0,
		borderWidth: 1,
		borderColor: colors.black_o33,
	},
	it: {
		marginTop: -1,
		width: (width - 32) / 3,
		height: (width - 32) / 3,
		borderRadius: 0,
		borderWidth: 1,
		borderColor: colors.black_o33,
	},
	itemmmm_pressed: {
		width: (width - 32) / 3,
		height: (width - 32) / 3,
		borderWidth: 1,
		borderRadius: 0,
		borderColor: colors.dark_pink,
		backgroundColor: colors.dark_pink_o10,
	},
	it_pressed: {
		marginTop: -1,
		width: (width - 32) / 3,
		height: (width - 32) / 3,
		borderWidth: 1,
		borderRadius: 0,
		borderColor: colors.dark_pink,
		backgroundColor: colors.dark_pink_o10,
	},
})
