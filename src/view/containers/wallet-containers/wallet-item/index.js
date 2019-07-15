import React from 'react'
import { View, Image, Text } from 'react-native'
//styles
import styles from './styles'

export default function WalletItem({ item }) {
	return (
		<View style={styles.view}>
			<Image style={styles.circle} source={{ uri: item.photo }} />
			<View style={styles.titles}>
				<Text style={styles.title}>{item.trade_point_name}</Text>
				<Text style={styles.description}>{item.description}</Text>
				{/* {item.status && <Text>{I18n.t(`HISTORYS.${item.status}`)}</Text>} */}
			</View>
			{item.price && (
				<Text style={[styles.text, item.price.includes('-') ? styles.price_negative : styles.price_positive]}>
					{item.price}
				</Text>
			)}
		</View>
	)
}
