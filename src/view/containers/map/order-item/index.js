import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { colors } from '@constants/colors'
import { connect } from 'react-redux'

const { width } = Dimensions.get('window')

function OrderItem({ item, profileState, changeValue }) {
	return (
		<View style={styles.container}>
			<Image source={{ uri: item.product_photo }} style={styles.image} />
			<View style={styles.text}>
				<Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{`${item.product_name} `}</Text>
				<Text style={styles.price}>{`${item.product_price} ${profileState.currency}`}</Text>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => changeValue(item.unique_id, item.product_amount - 1)}
			>
				<Text style={styles.symbol}>-</Text>
			</TouchableOpacity>
			<Text style={styles.count}>{item.product_amount}</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => changeValue(item.unique_id, item.product_amount + 1)}
			>
				<Text style={styles.symbol}>+</Text>
			</TouchableOpacity>
		</View>
	)
}
const mapStateToProps = (state) => ({
	profileState: state.profileState,
})

export default connect(mapStateToProps)(OrderItem)

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 24,
	},
	image: {
		width: 40,
		height: 40,
		marginRight: 16,
	},
	title: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		color: colors.black111,
		marginBottom: 4,
	},
	price: {
		fontFamily: 'Rubik-Medium',
		fontSize: 14,
		color: colors.black111,
	},
	button: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.black111,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
	},
	count: {
		fontFamily: 'Rubik-Light',
		color: colors.black111,
		fontSize: 24,
		width: 40,
		textAlign: 'center',
	},
	symbol: {
		fontFamily: 'Rubik-Light',
		color: colors.black111,
		fontSize: 24,
	},
	text: {
		marginRight: 16,
		width: width - 224,
	},
})
