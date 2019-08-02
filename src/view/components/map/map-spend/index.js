import React from 'react'
import { View, ScrollView, Platform, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'
import route from '../../../../services/route'

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
			<View
				key={`${data.id}`}
				style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'linghtblue' }}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<LinearGradient colors={colors} start={start} end={end} style={styles.linear}>
				<ScrollView style={styles.scroll}>
					<Text style={{ marginBottom: 8 }}>{'Места на карте'}</Text>
					<TouchableOpacity onPress={() => route.push('MapPlaces')} style={styles.map_view}>
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
					</TouchableOpacity>
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
