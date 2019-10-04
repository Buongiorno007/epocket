import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import MapHeaderWhite from '@containers/map/map-header-white'
import I18n from '@locales/I18n'
//styles
import styles from './styles'
import LogoTitle from '@containers/logo-title'
import OrderItem from '@containers/order-item'
import ModalQr from '@containers/modal-qr'
import { generateQr, clearQrValue } from '@reducers/qrValue'
import { Toast } from 'native-base'

function OrderScreen({ order, profileState, qrValue, dispatch }) {
	const [data, setData] = useState(order.point_data)
	const [price, setPrice] = useState(0)

	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

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
		if (order.user_balance > price) {
			dispatch(generateQr(data))
		} else {
			Toast.show({
				text: 'У вас не достаточно средств',
				buttonText: 'ok',
				duration: 10000,
				onClose: () => {},
			})
		}
	}
	const clsModal = () => dispatch(clearQrValue())

	return (
		<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
			<MapHeaderWhite title={`${order.user_balance} ${profileState.currency}`} />
			<View style={styles.field}>
				<LogoTitle logo={order.point_image} title={order.point_name} />
				<Text style={styles.text}>{'Предзаказ'}</Text>
				<FlatList style={styles.scroll} data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
				<Text style={styles.price}>{`${price} ${profileState.currency}`}</Text>
				<TouchableOpacity style={styles.button} onPress={opnModal}>
					<Image source={require('@assets/img/qr.png')} style={styles.qr} />
					<Text style={styles.qrText}>{'СФОРМИРОВАТЬ QR'}</Text>
					<View style={styles.qr}></View>
				</TouchableOpacity>
			</View>
			<ModalQr visible={!!qrValue} qrvalue={qrValue} price={price} hide={clsModal} />
		</LinearGradient>
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
