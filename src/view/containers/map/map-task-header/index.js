import React from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform } from "react-native"
import route from "@services/route"
import sbHeight from "@services/getSBHeight"
import { connect } from "react-redux"
import { convertArea } from "geolib"
import { urls } from "@constants/urls"
import { getStorePoint2 } from '@reducers/storePoint'

function MapTaskHeader({ title = "", noinfo, dispatch, token, malltask, mallPoint, goMain }) {
  const body = JSON.stringify({
    mission_id: malltask.id,
  })
  const OPTIONS = {
		method: 'POST',
		headers: {'Content-Type': 'application/json', Authorization: `JWT ${token}`}, 
		body : body
  }
  // DEV mode only Resets mission counter
  refr = () => {
    console.log(malltask.id)
    fetch(urls.task_reset,OPTIONS)
    .then(response => console.log(response))
  }

  handleInfo = () => {
    dispatch(getStorePoint2(mallPoint.sub_id))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => goMain ? route.navigate("Main")  : route.pop()} hitSlop={{top: 10, bottom: 10, left: 10, right: 50}}>
        <Image source={require("@assets/dv4/chevron.png")} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={ () => handleInfo() } disabled={noinfo}>
        <Image source={require("@assets/dv4/info.png")} style={[styles.image, noinfo && {display: 'none'}]} />
      </TouchableOpacity>
    </View>
  )
}
const mapStateToProps = state => ({
  token: state.token,
  malltask: state.mallTask,
  mallPoint: state.mallPoint
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
    maxWidth: 200,
  },
})