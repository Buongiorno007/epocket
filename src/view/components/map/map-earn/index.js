import React, { useState } from 'react'
import { View, Image, Platform } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { connect } from 'react-redux'

import styles from './styles'

function MapEarn({ mapPoints, lat, lng }) {
	const region = {
		latitude: 45,
		longitude: 35,
		latitudeDelta: 70,
		longitudeDelta: 70,
	}

	const renderMarker = (data) => {
		console.log(data, 'DATA')
		return (
			<Marker key={data.id || Math.random()} coordinate={data.location}>
				<View style={{ width: 10, height: 10, backgroundColor: 'pink' }}></View>
			</Marker>
		)
	}
	const renderCluster = (cluster) => null
	return (
		<View style={styles.container}>
			<ClusteredMapView
				style={{ flex: 1 }}
				// data={mapPoints.outlets}
				data={[
					{ location: { latitude: 45.1962667, longitude: 35.9340056 } },
					{ location: { latitude: 45.4962667, longitude: 35.6340056 } },
				]}
				initialRegion={region}
				provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}
				ref={(r) => {
					this.map = r
				}}
				// customMapStyle={mapStyle}
				// showsCompass={false}
				// animateClusters={false}
				// showUserLocation
				// followUserLocation
				// loadingEnabled
				// clusteringEnabled={this.state.discountActive ? false : true}
				// onPress={this.onRegionChange}
				// onRegionChangeComplete={this.onRegionChange}
				renderMarker={renderMarker}
				// renderCluster={renderCluster}
			>
				<Marker
					coordinate={{
						latitude: lat,
						longitude: lng,
					}}
				>
					<Image source={require('@assets/img/me.png')}></Image>
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
	}
}

export default connect(mapStateToProps)(MapEarn)
