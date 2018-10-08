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
		width: width*0.85,
		marginTop: 35
	},
	item: {
		width: (width * 0.85) / 3,
		height: (width *0.85) / 3,
		borderWidth: 1,
    borderColor: '#000'
	},
	pressed_button: {
		width: (width * 0.85) / 3,
		height: (width *0.85) / 3,
		borderWidth: 2,
		borderColor: '#F63272',
		backgroundColor: '#F65F87',
  },
});
