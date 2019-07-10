import React from 'react'
import { View, Image, Text } from 'react-native'
import I18n from '@locales/I18n'
//styles
import styles from './styles'

export default function WalletItem({ item }) {
	console.log(item, 'ITEM item')
	return (
		<View style={styles.view}>
			<Image style={styles.circle} source={{ uri: item.img }} />
			<View style={styles.titles}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
				{/* {item.status && <Text>{I18n.t(`HISTORYS.${item.status}`)}</Text>} */}
			</View>
			<Text style={[styles.text, item.price.includes('+') ? styles.price_positive : styles.price_negative]}>
				{item.price}
			</Text>
		</View>
	)
}
