import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import MapHeaderWhite from '@containers/map/map-header-white'
import I18n from '@locales/I18n'
//styles
import styles from './styles'
import BasketItem from '@containers/basket-item'

function BasketComponent({ balance, profileState, basket }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	const renderItem = ({ item }) => <BasketItem item={item} />
	const keyExtractor = (item) => `${item.point_id}`

	return (
		<View style={styles.container}>
			<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
				<MapHeaderWhite title={`${I18n.t('CASH.TITLE')} ${balance} ${profileState.currency}`} />
				<View style={styles.textView}>
					<Text style={styles.text}>{I18n.t('PREORDER')}</Text>
				</View>
				<FlatList
					style={styles.scroll}
					data={basket.data}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
				/>
			</LinearGradient>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		balance: state.balance,
		basket: state.basket,
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(BasketComponent)
