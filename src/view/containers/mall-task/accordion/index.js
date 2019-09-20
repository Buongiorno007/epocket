import React, { useState } from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import animation from "@constants/layout"
import { connect } from "react-redux"
import styles from "./styles"

function MallTaskAccordion({ item, profileState }) {
  const [expanded, setExpanded] = useState(false)

  const handleDisplay = () => {
    animation()
    setExpanded(!expanded)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDisplay}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{`${item.price} ${profileState.currency}`}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.eachItem}>
          <Text style={styles.cardTitle}>{item.desc}</Text>
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
