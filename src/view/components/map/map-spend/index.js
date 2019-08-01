import React from 'react'
import { View, ScrollView, Platform, Image } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import styles from './styles'

function MapSpend({ lat, lng, mapPoints }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}
	console.log(mapPoints, 'MAPPOINTS CASHOUTS')
	const renderMarker = (data) => {
		return (
			<View
				key={`${data.id}`}
				style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'linghtblue' }}
			/>
		)
	}
	return (
		<View style={styles.container}>
			<ScrollView style={styles.scroll}>
				<View style={{ flex: 1, height: 150 }}>
					<ClusteredMapView
						style={{ flex: 1 }}
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
			</ScrollView>
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
