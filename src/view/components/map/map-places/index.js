import React from 'react'
import { View, Platform, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import styles from './styles'

function MapPlaces({ lat, lng, mapPoints }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	const renderMarker = (data) => {
		return (
			<View key={data.id}>
				<Text> {'HELLO'} </Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<ClusteredMapView
				style={styles.map}
				data={mapPoints.cashouts}
				initialRegion={region}
				provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}
				renderMarker={renderMarker}
				animateClusters={false}
				showsCompass={false}
				edgePadding={{ top: 50, left: 50, bottom: 50, right: 50 }}
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
