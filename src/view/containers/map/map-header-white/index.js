import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import route from '@services/route'
import Basket from '@containers/basket'

export default function MapHeaderWhite({ title = 'CHANGE TITLE', basket = false, id = false, transparent, toTop = false }) {
	const goBack = () => {
		toTop ? route.navigate("Main") : route.pop()
	}
	return (
		<View style={[styles.container, {backgroundColor: transparent ? 'rgba(255,255,255, 0)' : 'rgba(255,255,255,.2)',}]}>
			<TouchableOpacity onPress={() => goBack()} hitSlop={{top: 10, bottom: 10, left: 10, right: 50}}>
				<Image source={require('@assets/img/chevron_w.png')} style={styles.image} />
			</TouchableOpacity>
			<Text style={styles.text}>{title}</Text>
			{basket ? (
				<View style={styles.image}>
					<Basket style={styles.basket} id={id} />
				</View>
			) : (
				<View style={styles.image} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 90,
		paddingHorizontal: 16,
		paddingTop: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		zIndex: 2,
	},
	image: {
		width: 20,
		resizeMode: 'contain',
		height: 20,
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
		color: '#fff',
	},
	basket: {
		position: 'absolute',
		bottom: -6,
		right: 0,
	},
})
