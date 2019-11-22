import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native'
import { colors } from '@constants/colors'

const { width, height } = Dimensions.get('window')

function MapSpendButton({ img, text, callback, space = false }) {
	return (
		<TouchableOpacity style={[styles.touchStyle, space && styles.space]} onPress={callback}>
			<Image style={styles.img} source={img} />
			<Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>{text}</Text>
			<View style={styles.arrow} />
		</TouchableOpacity>
	)
}

export default MapSpendButton

const styles = StyleSheet.create({
	touchStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.gray_e6,
		borderRadius: 12,
		padding: 16
	},
	img: {
		width: 40,
		height: 40,
		marginRight: 16,
	},
	text: {
		width: width - 84, 
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
