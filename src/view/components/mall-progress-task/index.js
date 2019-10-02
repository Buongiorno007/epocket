import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./styles"
import route from "@services/route"
import Steps from "@containers/mall-task/steps"
import TaskHeader from "@containers/map/task-header"

function MallProgressTask({ progressTask }) {
  return (
    <View style={styles.container}>
      <TaskHeader />
      <Steps />
    </View>
  )
}

const mapStateToProps = state => ({
  progressTask: state.progressTask,
})

export default connect(mapStateToProps)(MallProgressTask)
