import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Marker, Circle } from 'react-native-maps'
import { connect } from 'react-redux'
import styles from './styles'
import { getDistance } from 'geolib'
import { checkMission, finishMissionState } from '@reducers/missionState'
import { getMallPoint } from '@reducers/mallPoint'

function MapEarnMarker({ profileState, data, missionState, lat, lng, mapPoints, dispatch }) {
  useEffect(() => {
    if (getDist()) {
      dispatch(checkMission(data.id))
    } else if (missionState.outletId === data.id) {
      dispatch(finishMissionState())
    }
  }, [lat, lng, mapPoints])

  const getDist = () => {
    let distance =
      getDistance(
        { latitude: data.lat, longitude: data.lng },
        {
          latitude: lat,
          longitude: lng,
        },
      ) - data.rad
    return distance < 0
  }

  const returnLogo = () => {
    return missionState.outletId === data.id && missionState.process
      ? require('@assets/img/watch.png')
      : { uri: data.photo }
  }

  return (
    <View>
      <Marker coordinate={data.location} style={{zIndex: 1}} onPress={() => dispatch(getMallPoint(data.id))}>
        <View style={styles.container}>
          <View style={styles.imageBorder}><Image style={styles.img} source={returnLogo()} /></View>
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

const mapStateToProps = state => {
  return {
    profileState: state.profileState,
    missionState: state.missionState,
    lat: state.location.coordinate.lat,
    lng: state.location.coordinate.lng,
    mapPoints: state.mapPoints,
  }
}

export default connect(mapStateToProps)(MapEarnMarker)
