import React from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform } from "react-native"
import route from "@services/route"
import sbHeight from "@services/getSBHeight"
import { connect } from "react-redux"

function MapTaskHeader({ title = "", noinfo, dispatch, token, malltask }) {
  const body = JSON.stringify({
    mission_id: malltask.id,
  })
  const OPTIONS = {
		method: 'POST',
		headers: {'Content-Type': 'application/json', Authorization: `JWT ${token}`},
		body : body
  }
  refr = () => {
    console.log(malltask.id)
    fetch("https://epocket.dev.splinestudio.com/mission/reset-list",OPTIONS)
    .then(response => console.log(response))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => route.pop()}>
        <Image source={require("@assets/dv4/chevron.png")} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={ __DEV__ ? refr : ()=>{} } disabled={noinfo}>
        <Image source={require("@assets/dv4/info.png")} style={[styles.image, noinfo && {display: 'none'}]} />
      </TouchableOpacity>
    </View>
  )
}
const mapStateToProps = state => ({
  token: state.token,
  malltask: state.mallTask
})
export default connect(mapStateToProps)(MapTaskHeader)

const styles = StyleSheet.create({
  container: {
    height: 56 + sbHeight,
    paddingHorizontal: 16,
    paddingTop: sbHeight,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
  },
  button: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  text: {
    fontFamily: "Rubik-Medium",
    fontSize: 20,
    color: "#111",
  },
})
