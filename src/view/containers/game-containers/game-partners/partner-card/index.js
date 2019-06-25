import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

export default function PartnersCard({ image, name }) {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: image }} />
			<View style={styles.text_view}>
				<Text>{name}</Text>
			</View>
		</View>
	)
}
