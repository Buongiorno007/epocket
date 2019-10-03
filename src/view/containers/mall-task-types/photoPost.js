import React, { useState } from "react"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import { RNCamera } from "react-native-camera"
import I18n from "@locales/I18n"
import { checkQr } from "@reducers/progressTask"
import BeforePost from "./photoPost/beforePost"
const { width } = Dimensions.get("window")

function PhotoPost({ progressTask, loader, dispatch }) {
  const [forPost, setForPost] = useState("")
  return (
    // <View style={styles.container}>
    //   {/* <Text style={styles.title}>{progressTask.taskDetails.firstDescr}</Text> */}
    //   <BeforePost />
    // </View>
    forPost ? null : <BeforePost />
  )
}

const mapStateToProps = state => ({
  progressTask: state.progressTask,
  loader: state.loader,
})

export default connect(mapStateToProps)(PhotoPost)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#111",
    textAlign: "center",
    marginBottom: 24,
  },
})
