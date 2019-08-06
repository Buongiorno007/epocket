import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

function Basket({ style = { position: 'absolute', bottom: 16, right: 16 }, invert = false }) {
	const a = 0
	return (
		<TouchableOpacity
			style={[styles.container, style, invert && styles.container_invert]}
			onPress={() => console.log('PRESSED')}
		>
			<Image
				source={invert ? require('@assets/img/basket_invert.png') : require('@assets/img/basket.png')}
				style={styles.image}
			/>
			<View style={[styles.count, invert && styles.count_invert]}>
				<Text style={[styles.text, invert && styles.text_invert]}>{a}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default Basket

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
