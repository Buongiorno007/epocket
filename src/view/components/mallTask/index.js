import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { connect } from "react-redux"
import styles from "./styles"
import LogoTitle from "@containers/logo-title"
import route from "@services/route"
import MallTaskAccordion from "@containers/mall-task/accordion"
import MapTaskHeader from "../../containers/map/map-task-header"

function MallTask({ mallTask }) {
  const renderItem = ({ item }) => <MallTaskAccordion item={item} />
  const keyExtractor = item => `${item.id}`

  console.log(mallTask, "MALLTASK")

  return (
    <View style={styles.container}>
      <MapTaskHeader />
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
    </View>
  )
}

const mapStateToProps = state => ({
  mallTask: state.mallTask,
})

export default connect(mapStateToProps)(MallTask)
