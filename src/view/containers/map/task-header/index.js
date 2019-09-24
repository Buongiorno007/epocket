import React, { useState } from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import route from "@services/route"
import { connect } from "react-redux"
import sbHeight from "@services/getSBHeight"

function TaskHeader({ price = "+ 0", name = "Adidas", profileState }) {
  const [priceWith, setPriceWidth] = useState(0)

  return (
    <View style={styles.container}>
      <View
        style={styles.viewPrice}
        onLayout={event => {
          const { width } = event.nativeEvent.layout
          setPriceWidth(width)
        }}
      >
        <Text style={styles.price}>{`${price} ${profileState.currency}`}</Text>
      </View>
      <Text style={styles.text}>{name}</Text>
      <View style={[styles.buttonView, { width: priceWith }]}>
        <TouchableOpacity style={styles.button} onPress={() => console.log("INFO")}>
          <Image source={require("@assets/dv4/taskClose.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const mapStateToProps = state => {
  return {
    profileState: state.profileState,
  }
}

export default connect(mapStateToProps)(TaskHeader)

const styles = StyleSheet.create({
  container: {
    height: 40 + sbHeight,
    paddingHorizontal: 16,
    paddingTop: sbHeight,
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
  },
  buttonView: {
    height: 24,
    alignItems: "flex-end",
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
