import React from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform } from "react-native"
import route from "@services/route"
import sbHeight from "@services/getSBHeight"

export default function MapTaskHeader({ title = "" }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => route.pop()}>
        <Image source={require("@assets/dv4/chevron.png")} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log("INFO")}>
        <Image source={require("@assets/dv4/info.png")} style={styles.image} />
      </TouchableOpacity>
    </View>
  )
}

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
