import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import route from '@services/route'

export default function MapHeader({ title = 'MЕСТА НА КАРТЕ', filters = false }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => route.pop()}>
				<Image source={require('@assets/img/chevron.png')} style={styles.image} />
			</TouchableOpacity>
			<Text style={styles.text}>{title}</Text>
			{filters ? (
				<TouchableOpacity onPress={() => route.push('Filters')}>
					<Image source={require('@assets/img/filter.png')} style={styles.image} />
				</TouchableOpacity>
			) : (
				<TouchableOpacity>
					<Text style={styles.text}>{'OK'}</Text>
				</TouchableOpacity>
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
	},
	image: {
		width: 20,
		resizeMode: 'center',
		height: 20,
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
		color: '#F63272',
	},
})
