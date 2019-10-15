import React, { useState } from "react"
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native"
import animation from "@constants/layout"
import { connect } from "react-redux"
import styles from "./styles"

const { width } = Dimensions.get("window")

function MallTaskAccordion({ item, profileState }) {
  console.log(item, 'mallTaskItem!!!!!')
  const [expanded, setExpanded] = useState(false)
  const [priceWith, setPriceWidth] = useState(0)

  const handleDisplay = () => {
    animation()
    setExpanded(!expanded)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDisplay}>
        <View style={styles.buttonView}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <Text style={[styles.title, { width: width - 104 - priceWith }]} numberOfLines={2}>
            {item.name}
          </Text>
          <View
            style={styles.viewPrice}
            onLayout={event => {
              const { width } = event.nativeEvent.layout
              setPriceWidth(width)
            }}
          >
            <Text style={styles.price}>{`${item.price} ${profileState.currency}`}</Text>
          </View>
        </View>
        <View style={[styles.arrowView, expanded && styles.activeArrow]}>
          <View style={styles.arrow} />
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.dropView}>
          <Text style={styles.dropText}>{item.desc}</Text>
        </View>
      )}
    </View>
  )
}

const mapStateToProps = state => {
  return {
    profileState: state.profileState,
  }
}

export default connect(mapStateToProps)(MallTaskAccordion)
