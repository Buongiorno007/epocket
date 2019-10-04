import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import TaskHeader from "../../containers/map/task-header"
import Steps from "../../containers/mall-task/steps"

function TaskInProgress({ profileState }) {
  return (
    <View style={{ flex: 1 }}>
      <TaskHeader />
      <Steps />
    </View>
  )
}
const mapStateToProps = state => ({
  profileState: state.profileState,
})

export default connect(mapStateToProps)(TaskInProgress)
