import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
	main_view: {
		position: "absolute",
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: 70,
		paddingTop: height * 0.01,
		backgroundColor: colors.backgroundForAnimated,
		width: width,
		height: height
	},
	main_view_secondary: {
		position: "absolute",
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: 70,
		paddingTop: 40,
		width: width,
		height: height
	},
	container_zifi_lock: {
		paddingTop: height * 0.05,
		alignItems: "center",
		justifyContent: "center"
	},
	btn_container: {
		width: width * 0.85,
		height: 40,
	},
	grad: {
		position: "absolute",
		height: height,
		width: width,
	},
	image_background: {
		position: "absolute",
		top: 0,
		height: height,
		width: width,
	},
	background_grey: {
		position: "absolute",
		height: height * 0.65,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		backgroundColor: colors.drag_panel_color,
		width: width,
		bottom: 60
	},
	image_to_post_container: {
		width: width * 0.6,
		height: width * 0.6,
		elevation: 2,
		shadowColor: colors.card_shadow,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 5,
		shadowOpacity: 1,
	},
	image_to_post: {
		width: width * 0.6,
		height: width * 0.6,
	},
	container: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		width: width * 0.85,
		alignItems: "center",
		justifyContent: "center",
	},
	text_container: {
		flexDirection: 'row',
		alignItems: "center",
		flexWrap: 'wrap',
		justifyContent: "center",
		width: width * 0.9,
	},
	game_title: {
		alignItems: "center",
		justifyContent: "center",
		width: width * 0.85
	},
	game_description: {
		width: width * 0.8,
		alignItems: "center",
		justifyContent: "center",
	},
	game_cost_text: {
		color: colors.black41,
		fontSize: 17,
		fontFamily: 'Rubik-Bold'
	},
	game_description_text: {
		textAlign: "center",
		color: colors.black41,
		fontSize: 15,
		fontFamily: 'Rubik-Regular'
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
	},
	zifi_text: {
		textAlign: "center",
		width: (width * 0.85),
		color: colors.white,
		fontSize: 15,
		fontFamily: 'Rubik-BoldItalic',
	},
	game_title_text: {
		textAlign: "center",
		width: (width * 0.85),
		color: colors.black,
		fontSize: 17,
		fontFamily: 'Rubik-Regular'
	},
	TextStyle: {
		color: '#fff',
		textAlign: 'center'
	},
	button_container: {
		justifyContent: "space-between",
		alignItems: "center",
		height: 90
	},
});
