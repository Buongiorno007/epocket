import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import I18n from '@locales/I18n'
import route from "@services/route"
//styles
import styles from './styles'

export default function WalletItem({ item }) {
	//additional_data
	const additionalInformation = () => {
		console.log(item, 'ill navigate')
		route.push('WalletInformation', {item: item})
	}
	return (
		<TouchableOpacity disabled={!item.additional_data} style={styles.view} onPress={additionalInformation}>
			<Image style={styles.circle} source={{ uri: item.photo }} />
			<View style={styles.titles}>
				<Text style={styles.title}>{`${item.additional_data ? item.additional_data.description : I18n.t('GAME.CORRECT')} ${item.additional_data ? item.additional_data.stage : ''}`}</Text>
				<Text style={styles.description}>{item.trade_point_name}</Text>

				{/* {item.status && <Text>{I18n.t(`HISTORYS.${item.status}`)}</Text>} */}
			</View>
			{item.price && (
				<Text style={[styles.text, item.price.includes('-') ? styles.price_negative : styles.price_positive]}>
					{item.price}
				</Text>
			)}
		</TouchableOpacity>
	)
}
