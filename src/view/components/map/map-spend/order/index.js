import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'
import Header from '@containers/header'
//styles
import styles from './styles'
import LogoTitle from '@containers/map/logo-title'
import OrderItem from '@containers/map/order-item'
import ModalQr from '@containers/map/modal-qr'
import { generateQr, clearQrValue } from '@reducers/qrValue'
import { loaderState } from '@reducers/loader'

function OrderScreen({ order, profileState, qrValue, dispatch }) {
	const [data, setData] = useState(order.point_data)
	const [price, setPrice] = useState(0)

	useEffect(() => {
		setPrice(getPrice(data))
	}, [])

	const renderItem = ({ item }) => <OrderItem item={item} changeValue={changeValue} />
	const keyExtractor = (item) => `${item.product_id}`

	const changeValue = (id, value) => {
		let tempArray = []
		for (let i = 0; i < data.length; i++) {
			let obj = { ...data[i] }
			if (obj.unique_id === id) {
				obj.product_amount = value
			}
			if (obj.product_amount) {
				tempArray.push(obj)
			}
		}
		setData([...tempArray])
		setPrice(getPrice(tempArray))
	}

	const getPrice = (array) => {
		let total = 0
		array.forEach((element) => {
			total += element.product_amount * element.product_price
		})
		return total
	}

	const opnModal = () => {
			console.log('opnModal_QR', data)
			dispatch(generateQr(data, clsModal))
	}
	const clsModal = () => {
		dispatch(loaderState(false))
		dispatch(clearQrValue())
	}

	return (
		<View style={styles.container}>
			{/* <MapHeaderWhite title={`${order.user_balance} ${profileState.currency}`} /> */}
			<Header title={`${order.user_balance} ${profileState.currency}`}/>
			<View style={styles.field}>
				<LogoTitle logo={order.point_image} title={order.point_name} />
				<Text style={styles.text}>{I18n.t('DO_PREORDER')}</Text>
				<FlatList style={styles.scroll} data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
				<Text style={styles.price}>{`${price} ${profileState.currency}`}</Text>

				{order.user_balance > price ? (
					<TouchableOpacity style={styles.button} onPress={opnModal}>
						<Image source={require('@assets/img/qr.png')} style={styles.qr} />
						<Text style={styles.qrText}>{I18n.t('CASH.BUTTON')}</Text>
						<View style={styles.qr}></View>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.buttonInvert} disabled>
						<Image source={require('@assets/img/qr.png')} style={styles.qr} />
						<Text style={styles.qrTextInvert}>{I18n.t('INSUFFICIENT_FUNDS')}</Text>
						<View style={styles.qr}></View>
					</TouchableOpacity>
				)}
			</View>
			<ModalQr visible={!!qrValue} qrvalue={qrValue} price={price} hide={clsModal} />
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		order: state.order,
		profileState: state.profileState,
		qrValue: state.qrValue,
	}
}

export default connect(mapStateToProps)(OrderScreen)
