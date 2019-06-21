import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
import { colors } from '@constants/colors'

export default StyleSheet.create({
	container: {
		flex: 1,
		width,
		paddingHorizontal: 16,
		backgroundColor: 'pink',
	},
	visit_partners: {
		color: '#fff',
		marginTop: 16,
		marginBottom: 8,
		alignSelf: 'center',
	},
	brands: {
		flex: 1,
		paddingVertical: 8,
		backgroundColor: 'yellow',
	},
	visit_trc: {
		paddingVertical: 16,
		backgroundColor: 'blue',
	},
	visit_trc_text: {
		color: '#fff',
	},
})
