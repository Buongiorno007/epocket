import React from 'react'
import { View, ScrollView, Platform, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'
import route from '../../../../services/route'
import Basket from '@containers/basket'

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
				<View style={{ width: 20, height: 20, backgroundColor: 'blue', borderRadius: 5 }}></View>
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
					<View style={styles.imageView}>
						<Image style={{ width: 16, height: 16 }} source={require('@assets/img/diagonal-arrows.png')} />
					</View>
				</TouchableOpacity>
			</View>
			<LinearGradient colors={colors} start={start} end={end} style={styles.linear}>
				<ScrollView style={styles.scroll}>
					<Text>{'HELLO'}</Text>
					<Text>{'HELLO'}</Text>
					<Text>{'HELLO'}</Text>
					<Text>{'HELLO'}</Text>
					<Text>{'HELLO'}</Text>
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
