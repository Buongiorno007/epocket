import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderWhite from '@containers/map/map-header-white'
import I18n from '@locales/I18n'
//styles
import styles from './styles'
import BasketItem from '@containers/basket/basket-item'
import { SwipeListView } from 'react-native-swipe-list-view'
import { removeFromBasket } from "@reducers/basket"

function BasketComponent({ balance, profileState, basket, dispatch }) {

	const renderItem = ({ item }) => <BasketItem item={item} />
	const renderHiddenItem = ({item}) => {
		return (
			<TouchableOpacity style={styles.hiddenItem} onPress={() => dispatch(removeFromBasket(item.point_id))}>
				<Image source={require('@assets/img/ion-trash-sharp.png')} style={{width: 20, height: 20}}/>
			</TouchableOpacity>
		)
	}
	const keyExtractor = (item) => `${item.point_id}`

	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<MapHeaderWhite title={`${I18n.t('CASH.TITLE')} ${balance} ${profileState.currency}`} transparent />
				<View style={styles.textView}>
					<Text style={styles.text}>{I18n.t('PREORDER')}</Text>
				</View>
				{/* <FlatList
					style={styles.scroll}
					data={basket.data}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
				/> */}
				{basket.len === 0 ? (
					<View style={styles.scroll}>
						<Text style={styles.noOrder}>{I18n.t('HAVENT_PREORDER')}</Text>
					</View>
				) : (
					<SwipeListView 
						autoClose='true'
						style={styles.scroll}
						data={basket.data}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
						renderHiddenItem={renderHiddenItem}
						rightOpenValue={-75}
					/>
				)}
			</View>
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
