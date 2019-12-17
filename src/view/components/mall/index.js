import React, {useState} from "react"
import { View, Text, ScrollView, ImageBackground, Image } from "react-native"
import MapTaskHeader from "@containers/map/map-task-header"
import { connect } from "react-redux"
import styles from "./styles"
import MallItem from "@containers/mall"
import MyCarousel from '@containers/carousel'
import I18n from '@locales/I18n'

function MallPoint({ mallPoint }) {
  
  const [index, setIndex] = useState(0)

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
      <MapTaskHeader title={mallPoint.title} goMain/>
      <MyCarousel data={mallPoint.image} pagination />
      <View style={styles.addres}>
          <Text style={styles.subtitle}>{mallPoint.address}</Text>
      </View>
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
