import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors } from '../../../constants/colors';

export default StyleSheet.create({
	main_view: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F9FE',
		width: width,
		height: height
	},
	btn_container: {
		flex: 1,
	},
	container: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		width: width * 0.85,
		alignItems: "center",
		justifyContent: "center",
		marginTop: width * 0.19
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
		marginTop: 30,
		width: width * 0.85
	},
	game_description: {
		width: width * 0.8,
		alignItems: "center",
		justifyContent: "center",
		flex: 0.5
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
		marginBottom: width * 0.05
	},
	zifi_text: {
		textAlign: "center",
		width: (width * 0.85),
		color: colors.zifi_text,
		fontSize: 17,
		fontFamily: 'Rubik-BoldItalic',
		marginTop: width * 0.05
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
	}
});
