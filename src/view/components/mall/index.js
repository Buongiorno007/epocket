import React from "react"
import { View, Text, ScrollView, ImageBackground } from "react-native"
import MapHeaderWhite from "@containers/map/map-header-white"
import { connect } from "react-redux"
import styles from "./styles"
import MallItem from "@containers/mall"

function MallPoint({ mallPoint }) {
  const renderBlock = (element, title) => {
    return (
      <View style={{ marginTop: 24 }}>
        <Text style={{ marginBottom: 8, paddingHorizontal: 16 }}>{title}</Text>
        <View style={{ backgroundColor: "#F5F9FE", paddingHorizontal: 16 }}>
          {element.map((item, index) => (
            <MallItem key={`${index}`} item={item} index={index} />
          ))}
        </View>
      </View>
    )
  }

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
          {!!mallPoint.time_tasks.length && renderBlock(mallPoint.time_tasks, "Задание на время")}
          {!!mallPoint.active_tasks.length && renderBlock(mallPoint.active_tasks, "Задание от магазинов")}
          {!!mallPoint.soon_tasks.length && renderBlock(mallPoint.soon_tasks, "Скоро будут активны")}
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  mallPoint: state.mallPoint,
})

export default connect(mapStateToProps)(MallPoint)
