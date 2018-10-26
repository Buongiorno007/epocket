import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
	main_view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.drag_panel_color
	},
	grad: {
		height: height,
		width: width,
		alignItems: 'center',
		justifyContent: 'center'
	},
	list_container: {
		backgroundColor: colors.drag_panel_color,
		top: 15,
		flex: 3,
		borderTopRightRadius: 12,
		borderTopLeftRadius: 12,
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		paddingBottom: 50
	},
	nav_buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	history_nav: {
		top: 10,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	btn_container: {
		flex: 1,
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: width * 0.85,
		alignItems: "center",
		justifyContent: "center",
		marginTop: height * 0.05
	},
	item: {
		width: (width * 0.85) / 3,
		height: (width * 0.85) / 3,
		padding: 0,
		marginTop: -1,
		marginRight: -1,
		borderWidth: 1,
		zIndex: 9,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 0,
		borderColor: colors.black_o33
	},
	item_last_line: {
		width: (width * 0.85) / 3,
		height: (width * 0.85) / 3,
		padding: 0,
		borderRadius: 0,
		marginTop: Platform.OS === "ios" ? -2 : -1,
		marginRight: -1,
		borderWidth: 1,
		zIndex: 9,
		justifyContent: "center",
		alignItems: "center",
		borderColor: colors.black_o33
	},
	game_description: {
		width: width * 0.9,
		alignItems: "center",
		justifyContent: "center",
		flex: 0.5
	},
	game_title: {
		flexDirection: "row",
		marginTop: 30,
		width: width * 0.85
	},
	game_time: {
		width: width * 0.85,
		marginBottom: 5
	},
	custom_progress: {
		transform: [{ rotate: '180deg' }]
	},
	game_time_text: {
		textAlign: "right",
		width: width * 0.85,
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Rubik-Regular'
	},
	game_cost_text: {
		textAlign: "left",
		width: (width * 0.85) / 3,
		color: colors.black,
		fontSize: 15,
		fontFamily: 'Rubik-Regular'
	},
	game_title_text: {
		textAlign: "center",
		width: (width * 0.85) / 3,
		color: colors.black,
		fontSize: 15,
		fontFamily: 'Rubik-Bold'
	},
	game_description_text: {
		textAlign: "center",
		color: colors.black41,
		fontSize: 13,
		fontFamily: 'Rubik-Regular'
	},
	pressed_button: {
		width: (width * 0.85) / 3,
		height: (width * 0.85) / 3,
		borderWidth: 2,
		padding: 0,
		marginTop: -1,
		marginRight: -1,
		zIndex: 11,
		borderRadius: 0,
		justifyContent: "center",
		alignItems: "center",
		borderColor: colors.dark_pink,
		backgroundColor: colors.dark_pink_o10
	},
	image_in_square: {
		alignSelf: "center",
		width: (width * 0.85) / 3 - 3,
		height: (width * 0.85) / 3 - 3,
		zIndex: 10
	},
	pressed_button_last_line: {
		width: (width * 0.85) / 3,
		height: (width * 0.85) / 3,
		borderWidth: 2,
		padding: 0,
		zIndex: 11,
		borderRadius: 0,
		marginTop: Platform.OS === "ios" ? -2 : -1,
		marginRight: -1,
		borderColor: colors.dark_pink,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.dark_pink_o10
	},
	TextStyle: {
		color: colors.white,
		textAlign: 'center'
	}
});
