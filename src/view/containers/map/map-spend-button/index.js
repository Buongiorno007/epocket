import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'

function MapSpendButton({ img, text, callback, space = false }) {
	return (
		<TouchableOpacity style={[styles.touchStyle, space && styles.space]} onPress={callback}>
			<Image style={styles.img} source={img} />
			<Text style={styles.text}>{text}</Text>
			<View style={styles.arrow} />
		</TouchableOpacity>
	)
}

export default MapSpendButton

const styles = StyleSheet.create({
	touchStyle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	img: {
		width: 40,
		height: 40,
		marginRight: 16,
	},
	text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		color: '#404140',
		flexGrow: 1,
	},
	arrow: {
		width: 12,
		height: 12,
		borderTopWidth: 2,
		borderRightWidth: 2,
		borderColor: '#404140',
		transform: [{ rotate: '45deg' }],
	},
	space: {
		marginTop: 16,
	},
})
