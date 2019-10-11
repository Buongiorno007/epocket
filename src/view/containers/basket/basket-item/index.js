import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { colors } from '@constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import { saveOrder } from '@reducers/order'
import { connect } from 'react-redux'

function BasketItem({ item, dispatch }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 1.0, y: 0.0 }
	const end = { x: 0.0, y: 0.0 }

	const goToOrderScreen = () => dispatch(saveOrder(item))

	return (
		<TouchableOpacity style={styles.container} onPress={goToOrderScreen}>
			<Image style={styles.image} source={{ uri: item.point_image }} />
			<Text style={styles.title}>{item.point_name}</Text>
			<View style={styles.grad}>
				<Text style={styles.gradText}>{item.point_basket_amount}</Text>
				<View style={styles.arrow}></View>
			</View>
		</TouchableOpacity>
	)
}
export default connect()(BasketItem)

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		borderBottomColor: 'rgba(112,112,112,0.3)',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16,
	},
	title: {
		fontFamily: 'Rubik-Light',
		fontSize: 18,
		color: '#404140',
		flexGrow: 1,
	},
	grad: {
		height: 24,
		borderRadius: 16,
		paddingHorizontal: 8,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.blood_red,
	},
	gradText: {
		fontFamily: 'Rubik-Regular',
		fontSize: 12,
		color: '#fff',
		marginRight: 8,
	},
	arrow: {
		width: 8,
		height: 8,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderColor: '#fff',
		transform: [{ rotate: '45deg' }],
	},
})
