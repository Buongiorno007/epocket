import React, { useEffect } from 'react'
import { View, Image, Platform } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { connect } from 'react-redux'
import MapEarnMarker from '@containers/map/map-earn-marker'
import MissionBanner from '@containers/map/mission-banner'
import { findNearest, getDistance } from 'geolib'
import styles from './styles'

function MapEarn({ profileState, mapPoints, lat, lng }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	useEffect(() => {
		if (mapPoints.outlets.length) {
			moveToNearest()
		}
	}, [])

	const renderMarker = (data) => {
		return <MapEarnMarker key={data.id} data={data} />
	}

	const moveToNearest = () => {
		let nearestMall = findNearest(region, mapPoints.outlets)
		let distance = getDistance(region, nearestMall) - nearestMall.rad
		if (distance > 0 && this.map) {
			setTimeout(() => {
				this.map.getMapRef().animateToRegion(
					{
						latitude: lat,
						longitude: lng,
						latitudeDelta: 0.000028 * distance,
						longitudeDelta: 0.000028 * distance,
					},
					500,
				)
			}, 500)
		}
	}

	return (
		<View style={styles.container}>
			<MissionBanner />
			<ClusteredMapView
				style={{ flex: 1 }}
				data={mapPoints.outlets}
				initialRegion={region}
				provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}
				ref={(r) => {
					this.map = r
				}}
				renderMarker={renderMarker}
				animateClusters={false}
				showsCompass={false}
				edgePadding={{ top: 50, left: 50, bottom: 50, right: 50 }}
				currency={profileState.currency}
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

export default connect(mapStateToProps)(MapEarn)
