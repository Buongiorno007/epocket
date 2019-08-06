import React from 'react'
import { View, Platform, Image } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Basket from '@containers/basket'
import styles from './styles'
import MapSpendMarker from '@containers/map/map-spend-marker'
import MapHeader from '@containers/map/map-header'

function MapPlaces({ lat, lng, mapPoints }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	const renderMarker = (data) => {
		return <MapSpendMarker key={data.id} data={data} />
	}

	return (
		<View style={styles.container}>
			<MapHeader title={'Места на карте'} filters />
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
