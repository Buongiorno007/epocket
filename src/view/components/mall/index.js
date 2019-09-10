import React from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'

function MallPoint({ storePoint, dispatch }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: storePoint.image }}>
        <View style={styles.opacity}>
          <MapHeaderWhite title={`Задания`} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>{storePoint.title}</Text>
            <Text style={styles.subtitle}>{storePoint.address}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = state => ({
  storePoint: state.storePoint,
})

export default connect(mapStateToProps)(MallPoint)
