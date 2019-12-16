import React, { useEffect, useState } from 'react'
import { View, Platform, Image, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Basket from '@containers/basket'
import styles from './styles'
import MapSpendMarker from '@containers/map/map-spend-marker'
import MapHeaderPink from '@containers/map/map-header-pink'
import { findNearest, getDistance } from 'geolib'
import I18n from '@locales/I18n'
import route from '@services/route'
import { triggerInfoSpSet } from '@reducers/map-spend-trigger-infobox'

function MapPlaces({ lat, lng, mapPoints, profileState, storePoint, triggerInfoSp, dispatch }) {
	const [infoBoxWidth, setInfoBoxWidth] = useState(0)
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

	workTime = () => {
		let timeSplitted = storePoint.work_time.split(',')
		return timeSplitted
	}

	return (
		<View style={styles.container} onStartShouldSetResponder={() => dispatch(triggerInfoSpSet(false))}>
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
					style={{ zIndex: 10 }}
				>
					<View style={styles.markerOutline}>
						<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: 'data:image/png;base64,' + profileState.photo }} />
					</View>
				</Marker>
			</ClusteredMapView>

			{triggerInfoSp && (
				<TouchableOpacity
					style={styles.infobox}
					onPress={() => route.push('StorePoint')}
					onLayout={(event) => {
						const { width } = event.nativeEvent.layout
						setInfoBoxWidth(width)
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.infobox_image_outline}>
							<Image style={styles.infobox_image} source={{ uri: storePoint.image[0] }} />
						</View>
						<View>
						<Text
							style={[styles.infobox_title, { width: infoBoxWidth - 90 }]}
							numberOfLines={1}
							ellipsizeMode={'tail'}
						>{`${storePoint.title}`}</Text>
						{workTime().map((workTime, ind) => <Text style={[styles.infobox_time, { width: infoBoxWidth - 90 }]} key={ind}>{workTime}</Text>)}
						{/* <Text
							style={[styles.infobox_time, { width: infoBoxWidth - 90 }]}
						>{`${storePoint.work_time}`}</Text> */}
						</View>
					</View>
					<Text style={styles.infobox_text}>{`${storePoint.address}`}</Text>
				</TouchableOpacity>
			)}

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
		storePoint: state.storePoint,
		triggerInfoSp: state.triggerInfoSp,
	}
}

export default connect(mapStateToProps)(MapPlaces)
