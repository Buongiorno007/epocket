import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
	main_view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F9FE'
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
		borderColor: '#000'
	},
	item_last_line: {
		width: (width * 0.85) / 3,
		height: (width * 0.85) / 3,
		padding: 0,
		marginTop: Platform.OS === "ios" ? -2 : -1,
		marginRight: -1,
		borderWidth: 1,
		borderColor: '#000'
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
		width: width * 0.85
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
		borderColor: '#F63272',
		backgroundColor: 'rgba(246,95,135,0.1)'
	},
	TextStyle: {
		color: '#fff',
		textAlign: 'center'
	}
});
