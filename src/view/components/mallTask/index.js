import React from "react"
import { View } from "react-native"
import MapHeaderWhite from "@containers/map/map-header-white"
import { connect } from "react-redux"
import styles from "./styles"
import LinearGradient from "react-native-linear-gradient"

function MallTask({ mallTask }) {
  const colors = ["#F55890", "#FF9950"]
  const start = { x: 0, y: 0 }
  const end = { x: 0, y: 1 }

  console.log(mallTask, "MALL TASK")
  return (
    <LinearGradient start={start} end={end} colors={colors} style={styles.container}>
      <MapHeaderWhite title={mallTask.time} />
    </LinearGradient>
  )
}

const mapStateToProps = state => ({
  mallTask: state.mallTask,
})

export default connect(mapStateToProps)(MallTask)
