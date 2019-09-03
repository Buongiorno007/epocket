import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import MapHeaderWhite from '@containers/map/map-header-white'
import I18n from '@locales/I18n'
//styles
import styles from './styles'
import LogoTitle from '@containers/logo-title'

function OrderScreen({ order }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	const renderItem = ({ item }) => {
		console.log(item, 'ITEM')
		return (
			<View>
				<Text>{'HELLO'}</Text>
			</View>
		)
	}
	const keyExtractor = (item) => `${item.product_id}`
	return (
		// <View style={styles.container}>
		<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
			<MapHeaderWhite title={''} />
			<View style={styles.field}>
				<LogoTitle logo={order.point_image} title={order.point_name} />
				<Text style={styles.text}>{'Предзаказ'}</Text>
				<FlatList
					style={styles.scroll}
					data={order.point_data}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
				/>
				<TouchableOpacity style={styles.button} onPress={() => {}}>
					<Image source={require('@assets/img/qr.png')} style={styles.qr} />
					<Text style={styles.qrText}>{'СФОРМИРОВАТЬ QR'}</Text>
					<View style={styles.qr}></View>
				</TouchableOpacity>
			</View>
		</LinearGradient>
		// </View>
	)
}

const mapStateToProps = (state) => {
	return {
		order: state.order,
	}
}

export default connect(mapStateToProps)(OrderScreen)
