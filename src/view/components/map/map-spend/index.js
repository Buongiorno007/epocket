import React, { useEffect } from 'react'
import { View, ScrollView, Platform, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import route from '@services/route'
import Basket from '@containers/basket'
import MapSpendButton from '@containers/map/map-spend-button'
import styles from './styles'
import LottieView from 'lottie-react-native'

function MapSpend({ lat, lng, mapPoints }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	const renderMarker = (data) => {
		return (
			<Marker key={data.id} coordinate={data.location}>
				<Image style={{ width: 10, height: 10 }} source={require('@assets/img/spend.png')} />
			</Marker>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.map_view}>
				<ClusteredMapView
					style={styles.map}
					data={mapPoints.cashouts}
					initialRegion={region}
					provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}
					renderMarker={renderMarker}
					animateClusters={false}
					showsCompass={false}
					edgePadding={{ top: 50, left: 50, bottom: 50, right: 50 }}
					noPrice
				>
					<Marker
						coordinate={{
							latitude: lat,
							longitude: lng,
						}}
					>
						<Image style={{ width: 40, height: 40 }} source={require('@assets/img/smile.png')} />
					</Marker>
				</ClusteredMapView>
				<Basket style={styles.basket} />
				<TouchableOpacity style={styles.touchMap} onPress={() => route.push('MapPlaces')}>
					{Platform.OS === 'ios' ? (
						<LottieView style={styles.imageView} source={require('@assets/img/data.json')} autoPlay loop />
					) : (
						<Image style={{ width: 48, height: 48 }} source={require('@assets/img/map-arrows.png')} />
					)}
				</TouchableOpacity>
			</View>
			<LinearGradient colors={colors} start={start} end={end} style={styles.linear}>
				<ScrollView style={styles.scroll}>
					<Text style={styles.text}>{'Оплата по штрих-коду'}</Text>
					<View style={styles.fieldStyle}>
						<MapSpendButton
							img={require('@assets/img/barcode.png')}
							text={'Ваш штрих-код'}
							callback={() => route.push('Barcode')}
						/>
					</View>
					<Text style={styles.text}>{'Не выходя из дома'}</Text>
					<View style={styles.fieldStyle}>
						<MapSpendButton
							img={require('@assets/img/bask.png')}
							text={'Интернет магазин'}
							callback={() => route.push('Partnrs')}
						/>
						<MapSpendButton
							img={require('@assets/img/phone.png')}
							text={'Пополнение мобильного'}
							callback={() => route.push('Refill')}
							space
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
		lat: state.location.coordinate.lat,
		lng: state.location.coordinate.lng,
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(MapSpend)
