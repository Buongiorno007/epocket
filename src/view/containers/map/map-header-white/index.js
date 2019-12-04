import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import route from '@services/route'
import Basket from '@containers/basket'

export default function MapHeaderWhite({ title = 'CHANGE TITLE', basket = false, id = false, transparent, toTop = false }) {
	const goBack = () => {
		toTop ? route.navigate("Main") : route.pop()
	}
	return (
		<View style={[styles.container, {backgroundColor: transparent ? 'rgba(255,255,255, 0)' : 'white',}]}>
			<TouchableOpacity onPress={() => goBack()} hitSlop={{top: 10, bottom: 10, left: 10, right: 50}}>
				{transparent ? <Image source={require('@assets/img/chevron_w.png')} style={styles.image} /> : <Image source={require('@assets/img/arrow-black-left.png')} style={styles.image} />}
			</TouchableOpacity>
			{transparent ? <Text style={styles.text}>{title}</Text> : <Text style={styles.text_b}>{title}</Text>}
			{basket ? (
				<View style={styles.image}>
					<Basket style={styles.basket} id={id} invert/>
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
	text_b: {
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
		color: '#111111',
	},
	basket: {
		position: 'absolute',
		bottom: -6,
		right: 0,
	},
})
