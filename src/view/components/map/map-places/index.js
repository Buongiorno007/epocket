import React from 'react'
import { View, Platform, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import route from '@services/route'
import Basket from '@containers/basket'
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
			<Marker key={data.id} coordinate={data.location}>
				<View style={{ width: 10, height: 10, backgroundColor: 'lightblue', borderRadius: 5 }}></View>
			</Marker>
		)
	}

	return (
		<View style={styles.container}>
			<View
				style={{
					height: 90,
					paddingHorizontal: 16,
					paddingTop: 50,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<TouchableOpacity onPress={() => route.pop()}>
					<Image source={require('@assets/img/chevron.png')} style={styles.image} />
				</TouchableOpacity>
				<Text style={styles.text}>{'МЕСТА НА КАРТЕ'}</Text>
				<TouchableOpacity onPress={() => route.pop()}>
					<Image source={require('@assets/img/filter.png')} style={styles.image} />
				</TouchableOpacity>
			</View>
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
