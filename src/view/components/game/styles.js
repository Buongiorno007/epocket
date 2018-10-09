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
		marginBottom: height * 0.2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: width * 0.85,
		marginTop: 35
	},
	item: {
		width: (width * 0.85) / 3,
		height: (width * 0.85) / 3,
		borderWidth: 1,
		borderColor: '#000'
	},
	game_description: {
		width: width * 0.9,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20
	},
	game_title: {
		flexDirection: "row",
		marginTop: 30,
		width: width * 0.85
	},
	game_time: {
		width: width * 0.85,
		marginTop: 25,
	},
	game_time: {
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
		backgroundColor: '#F65F87',
	},
	TextStyle: {
		color: '#fff',
		textAlign: 'center'
	},
	gradient: {
		marginTop: 50,
		width: width * 0.85,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#ddd'
	},
	gradientt: {
		width: width * 0.85,
		height: 10,
		position: "absolute",
		right: 0,
		borderRadius: 5
	}
});
