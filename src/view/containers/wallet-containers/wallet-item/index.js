import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import I18n from '@locales/I18n'
import route from "@services/route"
import { connect } from "react-redux"
//styles
import styles from './styles'

function WalletItem({ item, profileState }) {
	const zone = new Date()
	const timeZone = zone.getTimezoneOffset() / 60
	let hour = (new Date(item.date).getHours()) - timeZone
	let hours = hour < 10 ? '0' + hour : hour
	let minutes = ('0' + new Date(item.date).getMinutes()).slice(-2)
	//additional_data
	const additionalInformation = () => {
		console.log(item, 'ill navigate')
		route.push('WalletInformation', {item: item})
	}
	return (
		<TouchableOpacity disabled={!item.info} style={styles.view} onPress={additionalInformation}>
			<Image style={styles.circle} source={{ uri: item.info ? item.image : item.photo }} />
			<View style={styles.titles}>
				<Text style={styles.title}>{`${item.info ? item.name : I18n.t('GAME.CORRECT')}`}</Text>
				<Text style={styles.description}>{item.trade_point_name}</Text>

				{/* {item.status && <Text>{I18n.t(`HISTORYS.${item.status}`)}</Text>} */}
			</View>
			{item.price && (
				<View style={styles.priceContainer}>
					<Text style={[styles.text, styles.price_positive]}>
						{`${item.price} ${profileState.currency}`}
					</Text>
					<Text style={styles.time}>{`${hours}:${minutes}`}</Text>
				</View>
			)}
		</TouchableOpacity>
	)
}
const mapStateToProps = state => {
	return {
		profileState: state.profileState,
	}
}
export default connect(mapStateToProps)(WalletItem)