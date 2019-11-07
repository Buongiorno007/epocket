import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import I18n from '@locales/I18n'
import route from "@services/route"
import { connect } from "react-redux"
//styles
import styles from './styles'

function WalletItem({ item, profileState }) {
	// const zone = new Date()
	// const timeZone = zone.getTimezoneOffset() / 60
	// let hour = (new Date(item.date).getHours()) - timeZone
	// console.log(new Date(item.date), 'walletItemDate')
	let hour = (new Date(item.date).getHours())
	let hours = hour < 10 ? '0' + hour : hour
	let minutes = ('0' + new Date(item.date).getMinutes()).slice(-2)
	//additional_data
	const additionalInformation = () => {
		console.log(item, 'ill navigate')
		route.push('WalletInformation', {item: item})
	}

	let isPending = false
	let allPending = 0
	let waiting = '#111111'
	let arr =[]
	item.info ? (
		item.info.forEach(element => {
			element.status.id === 7 ? waiting = '#B1B1B1' : null
			element.status.id === 7 ? allPending += Number(element.price) : null
			element.status.id === 7 ? isPending = true : null
			element.status.id === 1 ? arr.push(element.status.id) : arr = []
		})
	) : null
	// arr.length ? console.log(' empty', hours, minutes) : console.log('not empty', hours, minutes)
	return (
		<TouchableOpacity disabled={!item.info} style={[styles.view, arr.length && {display: 'none'}]} onPress={additionalInformation}>
			<Image style={styles.circle} source={{ uri: item.info ? item.image : item.photo }} />
			<View style={styles.titles}>
				<Text style={styles.title}>{`${item.info ? item.name === 'PURCHASE' ? I18n.t('WALLET.PURCHASE') : item.name : item.trade_point_name === "Refill Phone" ? I18n.t('REFILL.PAYMENT_G') : I18n.t('GAME.CORRECT')}`}</Text>
				<Text style={styles.description}>{`${item.info ? item.trade_point_name : item.trade_point_name === "Refill Phone" ? profileState.phone : item.trade_point_name}`}</Text>
			</View>
				<View style={styles.priceContainer}>
					<Text style={[styles.text, styles.price_positive, {color: waiting}]}>
						{`${item.price} ${profileState.currency}`}
					</Text>					
					{isPending ? (
					<Text style={styles.time}>{`${I18n.t('WALLET.PENDING')} ${allPending} ${profileState.currency}`}</Text>
					):(
					<Text style={styles.time}>{`${hours}:${minutes}`}</Text>
					)} 
			</View>
		</TouchableOpacity>
	)
}
const mapStateToProps = state => {
	return {
		profileState: state.profileState,
	}
}
export default connect(mapStateToProps)(WalletItem)