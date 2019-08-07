import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import route from '@services/route'

export default function MapHeaderWhite({ title = 'CHANGE TITLE' }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => route.pop()}>
				<Image source={require('@assets/img/chevron_w.png')} style={styles.image} />
			</TouchableOpacity>
			<Text style={styles.text}>{title}</Text>
			<View style={styles.image} />
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
		backgroundColor: 'rgba(255,255,255,.2)',
	},
	image: {
		width: 20,
		resizeMode: 'center',
		height: 20,
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
		color: '#fff',
	},
})
