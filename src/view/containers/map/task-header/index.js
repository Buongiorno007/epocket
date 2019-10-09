import React, { useState } from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from "react-native"
import route from "@services/route"
import { connect } from "react-redux"
import sbHeight from "@services/getSBHeight"

function TaskHeader({ progressTask, profileState }) {
  const { width } = Dimensions.get("window")

  const [priceWith, setPriceWidth] = useState(0)
  const textWidth = width - priceWith * 2 - 32

  return (
    <View style={styles.container}>
      <View
        style={styles.viewPrice}
        onLayout={event => {
          const { width } = event.nativeEvent.layout
          setPriceWidth(width)
        }}
      >
        <Text style={styles.price}>{`${progressTask.price} ${profileState.currency}`}</Text>
      </View>
      <Text style={[styles.text, { maxWidth: textWidth }]}>{progressTask.name}</Text>
      <View style={[styles.buttonView, { width: priceWith }]}>
        <TouchableOpacity style={styles.button} onPress={() => route.popToTop()}>
          <Image source={require("@assets/dv4/taskClose.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const mapStateToProps = state => {
  return {
    profileState: state.profileState,
    progressTask: state.progressTask,
  }
}

export default connect(mapStateToProps)(TaskHeader)

const styles = StyleSheet.create({
  container: {
    minHeight: 56 + sbHeight,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
  },
  viewPrice: {
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E60050",
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: sbHeight,
  },
  price: {
    fontFamily: "Rubik-Regular",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  text: {
    fontFamily: "Rubik-Medium",
    fontSize: 20,
    color: "#111",
    textAlign: "center",
    marginTop: sbHeight,
  },
  buttonView: {
    height: 24,
    alignItems: "flex-end",
    marginTop: sbHeight,
  },
  button: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
})
