import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

function Basket({ style }) {
	const a = true
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={() => console.log('PRESSED')}>
			<Image source={require('@assets/img/basket.png')} style={styles.image} />
			{a && (
				<View style={styles.count}>
					<Text style={styles.text}>1</Text>
				</View>
			)}
		</TouchableOpacity>
	)
}

export default Basket

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F63272',
		height: 40,
		borderRadius: 20,
		paddingHorizontal: 8,
		paddingVertical: 8,
		flexDirection: 'row',
	},
	image: {
		width: 24,
		height: 24,
	},
	count: {
		width: 24,
		height: 24,
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
})
