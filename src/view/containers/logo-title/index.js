import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function LogoTitle({ logo = '', title = '' }) {
	return (
		<View style={styles.container}>
			<Image source={{ uri: logo }} style={styles.image} />
			<Text style={styles.text}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
	},
	image: {
		width: 48,
		height: 48,
		borderRadius: 24,
		marginBottom: 8,
	},
	text: {
		fontFamily: 'Rubik-Light',
		fontSize: 24,
		color: '#fff',
	},
})
