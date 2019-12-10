import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { colors } from '@constants/colors'

export default function MapTaskLogo({ logo = "", title = "", time = "", outline }) {
  return (
    <View style={styles.container}>
      <View style={outline ? styles.imageOutline : null}><Image source={{ uri: logo }} style={styles.image} /></View>
      <Text style={styles.text}>{title}</Text>
      {!!time && <Text style={styles.timeText}>{time}</Text>}
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
    // marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  text: {
    fontFamily: "Rubik-Light",
    fontSize: 24,
    color: "#111",
    textAlign: "center",
  },
  timeText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: "#B1B1B1",
  },
	imageOutline: {
		width: 56,
		height: 56,
		borderRadius: 28,
		borderWidth: 2,
		borderColor: colors.black111,
		backgroundColor: colors.transparent,
		justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
	}
})
