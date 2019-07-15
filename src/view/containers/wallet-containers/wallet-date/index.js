import React from 'react'
import { View, Text } from 'react-native'
import WalletItem from '../wallet-item'
//styles
import I18n from '@locales/I18n'
import styles from './styles'

export default function WalletDate({ item }) {
	const returnItem = (item) => {
		return <WalletItem key={item.date} item={item} />
	}

	const splitDate = (date) => {
		const year = date.split('-')[0]
		const month = date.split('-')[1]
		const day = date.split('-')[2]
		return { day, month, year }
	}

	const { day, month, year } = splitDate(item.date)
	return (
		<View style={styles.view}>
			<Text style={styles.date}>{`${day}  ${I18n.t('MONTH.' + month)} ${year}`} </Text>
			{item.data.map(returnItem)}
		</View>
	)
}
