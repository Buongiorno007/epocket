import React from "react"
import { View, Text, ScrollView, ImageBackground, Image } from "react-native"
import MapHeaderWhite from "@containers/map/map-header-white"
import MapTaskHeader from "@containers/map/map-task-header"
import { connect } from "react-redux"
import styles from "./styles"
import MallItem from "@containers/mall"
import I18n from '@locales/I18n'

function MallPoint({ mallPoint }) {
  const renderBlock = (element, title) => {
    console.log('renderblock', element)
    return (
      <View style={{ marginTop: 16 }}>
        <Text style={styles.renderBlockText}>{`${title}: ${element.length}`}</Text>
        <View style={styles.renderBlockElement}>
          {element.map((item, index) => (
            <MallItem key={`${index}`} item={item} index={index} />
          ))}
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* <MapHeaderWhite title={mallPoint.title} toTop/> */}
      <MapTaskHeader title={mallPoint.title} noinfo goMain/>
      <View style={styles.imageContainer}> 
        <Image style={{flex: 1}} source={{ uri: mallPoint.image }} resizeMode={'cover'}/>
      </View>
      <View style={{ alignItems: "center" }}>
          <Text style={styles.subtitle}>{mallPoint.address}</Text>
      </View>
      {/* <ImageBackground style={styles.image} source={{ uri: mallPoint.image }}>
        <View style={styles.opacity}>
          <MapHeaderWhite title={I18n.t('MALL.TASKS')} toTop/>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{mallPoint.title}</Text>
            <Text style={styles.subtitle}>{mallPoint.address}</Text>
          </View>
        </View>
      </ImageBackground> */}
      <View style={styles.withModal}>
        <ScrollView style={styles.scroll}>
          {!!mallPoint.time_tasks.length && renderBlock(mallPoint.time_tasks, I18n.t('MALL.TASK_TIME'))}
          {!!mallPoint.active_tasks.length && renderBlock(mallPoint.active_tasks, I18n.t('MALL.TASK_SHOP'))}
          {!!mallPoint.soon_tasks.length && renderBlock(mallPoint.soon_tasks, I18n.t('MALL.TASK_SOON'))}
        </ScrollView>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  mallPoint: state.mallPoint,
})

export default connect(mapStateToProps)(MallPoint)
