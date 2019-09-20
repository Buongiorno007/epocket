import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import MapHeaderWhite from "@containers/map/map-header-white"
import { connect } from "react-redux"
import styles from "./styles"
import LinearGradient from "react-native-linear-gradient"
import LogoTitle from "@containers/logo-title"
import route from "@services/route"
import MallTaskAccordion from "@containers/mall-task/accordion"
function MallTask({ mallTask }) {
  const colors = ["#F55890", "#FF9950"]
  const start = { x: 0, y: 0 }
  const end = { x: 0, y: 1 }

  const renderItem = ({ item }) => <MallTaskAccordion item={item} />
  const keyExtractor = item => `${item.id}`

  console.log(mallTask, "MALLTASK")

  return (
    <LinearGradient start={start} end={end} colors={colors} style={styles.container}>
      <MapHeaderWhite title={mallTask.time.replace("-", " - ")} />
      <View style={styles.top}>
        <LogoTitle logo={mallTask.image} title={mallTask.name} />
        <Text style={styles.task}>{"Задания"}</Text>
      </View>
      <FlatList style={styles.scroll} data={mallTask.tasks} renderItem={renderItem} keyExtractor={keyExtractor} />
      <TouchableOpacity
        disabled={mallTask.type === 3}
        style={mallTask.type === 2 ? styles.buttonActive : styles.button}
        onPress={() => route.popToTop()}
      >
        <Text style={[styles.buttonText, mallTask.type === 2 && styles.buttonTextActive]}>
          {mallTask.type === 2 ? "Выполнить" : `Будет активно ${mallTask.time}`}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const mapStateToProps = state => ({
  mallTask: state.mallTask,
})

export default connect(mapStateToProps)(MallTask)
