import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"

export default function MapTaskLogo({ logo = "", title = "", time = "" }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: logo }} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
      {time && <Text style={styles.timeText}>{time}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  text: {
    fontFamily: "Rubik-Light",
    fontSize: 24,
    color: "#111",
  },
  timeText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: "#B1B1B1",
  },
})
