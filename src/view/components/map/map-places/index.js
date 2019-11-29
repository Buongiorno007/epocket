import React, { useEffect } from 'react'
import { View, Platform, Image } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Basket from '@containers/basket'
import styles from './styles'
import MapSpendMarker from '@containers/map/map-spend-marker'
import MapHeaderPink from '@containers/map/map-header-pink'
import { findNearest, getDistance } from 'geolib'
import I18n from '@locales/I18n'

function MapPlaces({ lat, lng, mapPoints, profileState }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	useEffect(() => {
		if (mapPoints.cashouts.length) {
			moveToNearest()
		}
	}, [])

	const renderMarker = (data) => {
		return <MapSpendMarker key={data.id} data={data} />
	}

	const moveToNearest = () => {
		let nearestMall = findNearest(region, mapPoints.cashouts)
		let distance = getDistance(region, nearestMall)
		if (distance > 0 && this.map) {
			setTimeout(() => {
				this.map.getMapRef().animateToRegion(
					{
						latitude: lat,
						longitude: lng,
						latitudeDelta: 0.000032 * distance,
						longitudeDelta: 0.000032 * distance,
					},
					500,
				)
			}, 500)
		}
	}

	return (
		<View style={styles.container}>
			<MapHeaderPink title={I18n.t('MAP.PLACES')} filters />
			<ClusteredMapView
				style={styles.map}
				data={mapPoints.cashouts}
				initialRegion={region}
				ref={(r) => {
					this.map = r
				}}
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
					<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{uri: 'data:image/png;base64,' + profileState.photo}} />
				</Marker>
			</ClusteredMapView>
			<Basket />
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

export default connect(mapStateToProps)(MapPlaces)
