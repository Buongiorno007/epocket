import React, { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
import { connect } from "react-redux"
import { getMallTask } from "@reducers/mallTask"
import { colors } from "@constants/colors"

const { width } = Dimensions.get("window")

function MallItem({ item, index, profileState, dispatch }) {
  const [priceWidth, setPriceWidth] = useState(1)
  return (
    <TouchableOpacity
      // disabled={item.disabled}
      style={[styles.container, ]}
      onPress={() => dispatch(getMallTask(item))}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ width: width - 118 - priceWidth }}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode={"tail"}>
          {item.name}
        </Text>
        <Text style={styles.subtitle}>{item.time}</Text>
      </View>
      <View
        style={[styles.layout, item.type === 3 ? styles.color2 : styles.color1]}
        onLayout={event => {
          const { width } = event.nativeEvent.layout
          setPriceWidth(width)
        }}
      >
        <Text style={styles.arrowTitle}>{`${item.price} ${profileState.currency}`}</Text>
        {item.type !== 1 && <View style={styles.arrow} />}
      </View>
    </TouchableOpacity>
  )
}
const mapStateToProps = state => {
  return {
    profileState: state.profileState,
  }
}

export default connect(mapStateToProps)(MallItem)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "white",
    // borderTopColor: "rgba(112, 112, 112, 0.3)",
    // borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray_e6,
    borderRadius: 12,
    minHeight: 100
  },
  noBorder: {
    borderTopWidth: 0,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  layout: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  color1: {
    backgroundColor: "#E60050",
  },
  color2: {
    backgroundColor: "#D3D3D3",
  },
  arrow: {
    width: 8,
    height: 8,
    borderRightWidth: 1,
    borderRightColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    transform: [{ rotate: "45deg" }],
    marginLeft: 8,
    alignItems: "center",
  },

  arrowTitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#fff",
  },
  arrowTitlePink: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#F63272",
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-light",
    color: "#404140",
  },
  subtitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#7C7C7C",
  },
})
