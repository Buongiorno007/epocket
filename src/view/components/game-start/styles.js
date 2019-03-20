import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
	main_view: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F9FE',
		width: width,
		height: height
	},
	btn_container: {
	},
	container: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		width: width * 0.85,
		alignItems: "center",
		height: height * 0.5,
		justifyContent: "space-between",
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
		width: width * 0.85,
		position: "absolute",
		top: 35
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
	game_description_text_bold: {
		textAlign: "center",
		color: colors.black41,
		fontSize: 15,
		fontFamily: 'Rubik-Bold'
	},
	zifi: {
		width: width * 0.35,
		height: width * 0.35,
		marginBottom: width * 0.05
	},
	zifi_text: {
		textAlign: "center",
		width: (width * 0.85),
		color: colors.zifi_text,
		fontSize: 17,
		fontFamily: 'Rubik-BoldItalic',
	},
	white_text: {
		color: colors.white
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
	zifi_cloud: {
		position: "absolute",
		top: 0,
		left: 30,
		width: 70,
		height: 70
	},
	lock_container: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		backgroundColor: colors.backgroundForAnimated,
		width: width,
		paddingHorizontal: (width * 0.1) / 2,
		alignItems: "center",
		position: "absolute",
		top: 0,
		paddingTop: height * 0.05,
		paddingBottom: 60,
		height: height,
		justifyContent: "space-between",
	},
	image_background: {
		position: "absolute",
		height: height,
		width: width,
	},
	grad: {
		position: "absolute",
		height: height,
		width: width,
	},
	contentContainerStyle: {
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	visit_website_partners: {
		height: height * 0.42,
		borderTopWidth: 1,
		paddingVertical: 10,
		borderTopColor: colors.white_o70,
		borderBottomWidth: 1,
		borderBottomColor: colors.white_o70,
	},
	lock_visit_text: {
		textAlign: "center",
		color: colors.white,
		fontSize: 16,
		fontFamily: 'Rubik-Medium'
	},
	go_to_map: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	icon_arrow: {
		width: 15,
		height: 15,
		marginLeft: 5,
		transform: [{ rotate: '180deg' }]
	}
});
