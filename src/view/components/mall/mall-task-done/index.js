import React from "react"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import route from "@services/route"
import {finishMission} from '@reducers/progressTask'
import I18n from '@locales/I18n'
const { width } = Dimensions.get("window")

function MallTaskDone({ progressTask, profileState ,dispatch }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require("@assets/dv4/congrat.png")} style={styles.image} />
        {/* <Text style={styles.title}>{`${I18n.t('MISSION.SUCCESS')} ${"100"} ${profileState.currency}`}</Text> */}
        <Text style={styles.title}>{`${I18n.t('MISSION.SUCCESS2')}`}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => dispatch(finishMission())}>
        <Text style={styles.btnText}>{I18n.t('TASK_EARN_MORE')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => ({
  progressTask: state.progressTask,
  profileState: state.profileState,
})

export default connect(mapStateToProps)(MallTaskDone)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 32,
    height: (width - 32) * 0.8,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Medium",
    color: "#111",
    textAlign: "center",
  },
  btn: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E60050",
  },
  btnText: {
    textTransform: "uppercase",
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    color: "#fff",
  },
})
