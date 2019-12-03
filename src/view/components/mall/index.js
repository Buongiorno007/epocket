import React, {useState} from "react"
import { View, Text, ScrollView, ImageBackground, Image } from "react-native"
import MapHeaderWhite from "@containers/map/map-header-white"
import MapTaskHeader from "@containers/map/map-task-header"
import { connect } from "react-redux"
import styles from "./styles"
import MallItem from "@containers/mall"
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

  const images = [
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
    'https://epc.splinestudio.com/static/outlet_photo/Icon_512.png',
  ]
  return (
    <View style={styles.container}>
      {/* <MapHeaderWhite title={mallPoint.title} toTop/> */}
      <MapTaskHeader title={mallPoint.title} noinfo goMain/>
      <View style={styles.imageContainer}> 
        <ScrollView
          style={{flex: 1}}
          horizontal //scrolling left to right instead of top to bottom
          showsHorizontalScrollIndicator={false} //hides native scrollbar
          scrollEventThrottle={10} //how often we update the position of the indicator bar
          pagingEnabled //scrolls from one image to the next, instead of allowing any value inbetween

          onLayout={event => {
            this.frameWidth = event.nativeEvent.layout.width;
          }}
          onScroll={event => { 
            this.xOffset = event.nativeEvent.contentOffset.x;
            const index = Math.round(this.xOffset / this.frameWidth)
            setIndex(index)
          }}
        >
          {images.map((item, index) => <Image style={styles.image} source={{ uri: item }} resizeMode={'cover'} key={index}/>)}
        </ScrollView>
        {images.length > 1 && <View style={styles.dotsContainer}>
          {images.map((it, ind) => <View style={[styles.dots, {backgroundColor: ind === index ? 'white' : 'rgba(255,255,255, 0.30)'}]}></View>)}
        </View>}
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
