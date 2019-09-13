import React from "react"
import { View, Text, ScrollView, ImageBackground } from "react-native"
import MapHeaderWhite from "@containers/map/map-header-white"
import { connect } from "react-redux"
import styles from "./styles"

function MallPoint({ mallPoint, dispatch }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: mallPoint.image }}>
        <View style={styles.opacity}>
          <MapHeaderWhite title={`Задания`} />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{mallPoint.title}</Text>
            <Text style={styles.subtitle}>{mallPoint.address}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.withModal}>
        <ScrollView style={styles.scroll}>
          <Text>{"SDFsdfsdfsf"}</Text>
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  mallPoint: state.mallPoint,
})

export default connect(mapStateToProps)(MallPoint)
