import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
	layout: {
		flex: 1,
		paddingVertical: width * 0.02,
	},
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	product: {
		flex: 1,
		height: width * 0.12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	hidden: {
		height: 0,
	},
	text: {
		fontSize: width * 0.035,
		fontWeight: '400',
		color: 'rgba(65, 65, 65, 1)',
	},
	small: {
		color: 'rgba(65, 65, 65, 0.6)',
	},
	price: {
		paddingRight: width * 0.05,
	},
	message: {
		fontSize: width * 0.04,
		color: 'rgba(112, 0, 0, 0.69)',
	},
	align: {
		alignItems: 'flex-end',
	},
	error: {
		flex: 2,
	},
	data: {
		flex: 1,
		justifyContent: 'center',
	},
	item_status: {
		width: width * 0.4,
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})
