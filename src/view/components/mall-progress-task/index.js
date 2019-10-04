import React from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import Steps from "@containers/mall-task/steps"
import TaskHeader from "@containers/map/task-header"
import ScanQr from "@containers/mall-task-types/scanQr"
import PhotoPost from "@containers/mall-task-types/photoPost"
import MallTaskDone from "@components/mall-task-done"

function MallProgressTask({ progressTask }) {
  return progressTask.end ? (
    <MallTaskDone />
  ) : (
    <View style={styles.container}>
      <TaskHeader />
      <Steps />
      {progressTask.type === 4 && <ScanQr />}
      {progressTask.type === 3 && <PhotoPost />}
    </View>
  )
}

const mapStateToProps = state => ({
  progressTask: state.progressTask,
})

export default connect(mapStateToProps)(MallProgressTask)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
