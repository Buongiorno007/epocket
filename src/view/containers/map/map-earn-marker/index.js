import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { Marker, Circle } from 'react-native-maps'
import { connect } from 'react-redux'
import styles from './styles'
import { getDistance } from 'geolib'
import { setMissionRadius } from '@reducers/missionState'

function MapEarnMarker({ profileState, data, missionState, lat, lng, dispatch }) {
	useEffect(() => {
		getDist()
	}, [lat || lng])
	const getDist = () => {
		let distance =
			getDistance(
				{ latitude: data.lat, longitude: data.lng },
				{
					latitude: lat,
					longitude: lng,
				},
			) - data.rad
		dispatch(setMissionRadius(distance < 0))
	}
	return (
		<View>
			<Marker coordinate={data.location} onPress={() => console.log(data.location, 'DATA LOCATION')}>
				<View style={styles.container}>
					<Image style={styles.img} source={{ uri: data.photo }} />
					<View style={styles.text_view}>
						<Text style={styles.text}>{`${data.price} ${profileState.currency}`}</Text>
					</View>
				</View>
			</Marker>
			<Circle
				center={data.location}
				radius={data.rad}
				fillColor={missionState.inRadius ? 'rgba(45, 198, 255, 0.2)' : null}
				strokeWidth={2}
				strokeColor={'rgba(31, 173, 226, 0.2)'}
			/>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
		missionState: state.missionState,
		lat: state.location.coordinate.lat,
		lng: state.location.coordinate.lng,
	}
}

export default connect(mapStateToProps)(MapEarnMarker)
