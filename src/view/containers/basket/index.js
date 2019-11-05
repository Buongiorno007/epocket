import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import route from '@services/route'
import { connect } from 'react-redux'
import { basketRoute } from '@reducers/order'

function Basket({
	style = { position: 'absolute', bottom: 16, right: 16 },
	invert = false,
	id = false,
	basket,
	dispatch,
}) {
	const routeTo = () => {
		id ? dispatch(basketRoute(id)) : route.push('BasketComponent')
	}
	return (
		<TouchableOpacity 
			style={[styles.container, style, invert && styles.container_invert]} 
			onPress={routeTo} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
			disabled={basket.len === 0 ? true : false}>
			<Image
				source={invert ? require('@assets/img/basket_invert.png') : require('@assets/img/basket.png')}
				style={styles.image}
			/>
			<View style={[styles.count, invert && styles.count_invert]}>
				<Text style={[styles.text, invert && styles.text_invert]}>{`${basket.len}`}</Text>
			</View>
		</TouchableOpacity>
	)
}

const mapStateToProps = (state) => {
	return {
		basket: state.basket,
	}
}

export default connect(mapStateToProps)(Basket)

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F63272',
		height: 32,
		borderRadius: 16,
		paddingHorizontal: 8,
		paddingVertical: 8,
		flexDirection: 'row',
	},
	image: {
		width: 16,
		height: 16,
	},
	count: {
		width: 16,
		height: 16,
		borderRadius: 12,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 8,
	},
	text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		color: '#F63272',
	},
	container_invert: {
		backgroundColor: 'rgba(255,255,255,0.65)',
	},
	count_invert: {
		backgroundColor: '#F63272',
	},
	text_invert: {
		color: '#fff',
	},
})
