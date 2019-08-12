import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking } from 'react-native'

export default function PartnerCard({ item }) {
	const openLink = (link) => {
		Linking.canOpenURL(link)
			.then((supported) => {
				if (supported) {
					Linking.openURL(link)
				}
			})
			.catch((err) => {})
	}
	return (
		<TouchableOpacity style={styles.container} onPress={() => openLink(item.link)}>
			<Image style={styles.image} source={{ uri: item.image }} />
			<Text style={styles.text}>{item.name}</Text>
			<View style={styles.arrow}></View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: 'rgba(112, 112, 112, 0.3)',
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16,
		resizeMode: 'center',
	},
	text: {
		fontFamily: 'Rubik-Light',
		fontSize: 24,
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
})
