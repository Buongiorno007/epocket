import React from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { connect } from "react-redux"
import styles from "./styles"
import MallTaskAccordion from "@containers/mall/mall-task/accordion"
import MapTaskHeader from "@containers/map/map-task-header"
import MapTaskLogo from "@containers/map/map-task-logo"
import { getProgressTask } from "@reducers/progressTask"
import I18n from '@locales/I18n'

function MallTask({ mallTask, missionState, dispatch }) {
  const thisTime = new Date().getHours() + 3
  const time = mallTask.time.substring(6, 8)
  const renderItem = ({ item }) => <MallTaskAccordion item={item} />
  const keyExtractor = item => `${item.id}`

  const startMission = () => dispatch(getProgressTask())

  return (
    <View style={styles.container}>
      <MapTaskHeader title={mallTask.name} noinfo />
      <MapTaskLogo logo={mallTask.image[0]} title={mallTask.name} time={mallTask.time} />
      <FlatList style={[styles.scroll, mallTask.type === 1 && styles.none ]} data={mallTask.tasks} renderItem={renderItem} keyExtractor={keyExtractor} />
      {mallTask.type === 1 && <View style={styles.timeTaskContainer}>
        <Text style={styles.timeTaskHeaderText}>{I18n.t('MALL.TASK_TIME')}</Text>
        {thisTime >= time && !missionState.process ? (
          <Text style={styles.timeTaskNormalText}>{I18n.t('MALL.NOT_ENOUGH_TIME')}<Text style={styles.timeTaskBoldText}>{mallTask.time}</Text></Text>
        ) : (
          <>
          <Text style={styles.timeTaskNormalText}>{I18n.t('MALL.DONT_LEAVE')}{I18n.t('MALL.AND_GET')}</Text>
          <Text style={styles.timeTaskNormalText}><Text style={styles.timeTaskBoldText}>{I18n.t('MALL.WARNING')}</Text>{I18n.t('MALL.LOSE')}</Text>
          </>
        )}
      </View>}
      {mallTask.type !== 1 && <TouchableOpacity
        // disabled={mallTask.type === 3}
        disabled={mallTask.disabled}
        style={[mallTask.disabled ? styles.button : styles.buttonActive]}
        onPress={startMission}
      >
        <Text style={[styles.buttonText, !mallTask.disabled && styles.buttonTextActive]}>
          {mallTask.disabled ? `${I18n.t('MALL.SOON')} ${mallTask.time}` : I18n.t('MALL.START')}
        </Text>
      </TouchableOpacity>}
    </View>
  )
}

const mapStateToProps = state => ({
  mallTask: state.mallTask,
  missionState: state.missionState
})

export default connect(mapStateToProps)(MallTask)
