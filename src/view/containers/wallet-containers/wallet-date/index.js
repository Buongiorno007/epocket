import React from 'react'
import { View, Text } from 'react-native'
import WalletItem from '../wallet-item'
//styles
import styles from './styles'

export default function WalletDate(item) {
	const returnItem = (item) => {
		return <WalletItem item={item} />
	}

	return (
		<View style={styles.view}>
			<Text>{item.date}</Text>
			{item.data.map(returnItem)}
		</View>
	)
}
