import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { connect } from "react-redux"
import styles from "./styles"
import route from "@services/route"
import MallTaskAccordion from "@containers/mall/mall-task/accordion"
import MapTaskHeader from "@containers/map/map-task-header"
import MapTaskLogo from "@containers/map/map-task-logo"
import { getProgressTask } from "@reducers/progressTask"
import I18n from '@locales/I18n'

function MallTask({ mallTask, dispatch }) {
  const time = mallTask.time.substring(6)
  const renderItem = ({ item }) => <MallTaskAccordion item={item} />
  const keyExtractor = item => `${item.id}`

  const startMission = () => dispatch(getProgressTask())

  return (
    <View style={styles.container}>
      <MapTaskHeader title={I18n.t('MALL.TASK_LIST')} />
      <MapTaskLogo logo={mallTask.image} title={mallTask.name} time={mallTask.time} />
      <FlatList style={[styles.scroll, mallTask.type === 1 && styles.none ]} data={mallTask.tasks} renderItem={renderItem} keyExtractor={keyExtractor} />
      {mallTask.type === 1 && <View style={styles.timeTaskContainer}>
        <Text style={styles.timeTaskHeaderText}>{I18n.t('MALL.TASK_TIME')}</Text>
        <Text style={styles.timeTaskNormalText}>{I18n.t('MALL.DONT_LEAVE')}<Text style={styles.timeTaskBoldText}>{time}</Text>{I18n.t('MALL.AND_GET')}</Text>
        <Text style={styles.timeTaskNormalText}><Text style={styles.timeTaskBoldText}>{I18n.t('MALL.WARNING')}</Text>{I18n.t('MALL.LOSE')}</Text>
      </View>}
      <TouchableOpacity
        disabled={mallTask.type === 3}
        style={[mallTask.type === 2 ? styles.buttonActive : styles.button, mallTask.type === 1 && styles.none ]}
        onPress={startMission}
      >
        <Text style={[styles.buttonText, mallTask.type === 2 && styles.buttonTextActive]}>
          {mallTask.type === 2 ? I18n.t('MALL.START') : `${I18n.t('MALL.SOON')} ${mallTask.time}`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => ({
  mallTask: state.mallTask,
})

export default connect(mapStateToProps)(MallTask)
