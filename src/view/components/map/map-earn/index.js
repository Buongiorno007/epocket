import React from 'react'
import { View, Image, Platform } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { connect } from 'react-redux'
import MapEarnMarker from '@containers/map/map-earn-marker'
import MissionBanner from '@containers/mission-banner'
import styles from './styles'

function MapEarn({ profileState, mapPoints, lat, lng }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	const renderMarker = (data) => {
		return <MapEarnMarker key={data.id} data={data} />
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

export default connect(mapStateToProps)(MapEarn)
