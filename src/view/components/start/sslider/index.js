import React, {useState} from "react"
import { View, Image, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, PanResponder } from "react-native"
import I18n from "@locales/I18n"
import { colors } from '@constants/colors'
const { width } = Dimensions.get('window')
const { height } =
	Platform.OS === 'android' && Platform.Version > 26 ? Dimensions.get('screen') : Dimensions.get('window')

const Renderitem = ({screen, setScreen}) => {
    let image = ''
    let pag = ''
    let text = ''
    let text_desc = ''
    switch (screen) {
      case 0:
        image = require('@assets/img/sslider0.png')
        pag = require('@assets/img/sslider_p0.png')
        text = I18n.t('SSLIDER.FIRST')
        text_desc = I18n.t('SSLIDER.FIRST_DESC')
        break;
      case 1:
        image = require('@assets/img/sslider1.png')
        pag = require('@assets/img/sslider_p1.png')
        text = I18n.t('SSLIDER.SECOND')
        text_desc = I18n.t('SSLIDER.SECOND_DESC')
        break;
      case 2:
        image = require('@assets/img/sslider2.png')
        pag = require('@assets/img/sslider_p2.png')
        text = I18n.t('SSLIDER.THIRD')
        text_desc = I18n.t('SSLIDER.THIRD_DESC')
        break;
      case 3:
        image = require('@assets/img/sslider3.png')
        pag = require('@assets/img/sslider_p3.png')
        text = I18n.t('SSLIDER.FOURTH')
        text_desc = I18n.t('SSLIDER.FOURTH_DESC')
        break;
    
      default:
          // image = require('@assets/img/sslider0.png')
          // pag = require('@assets/img/sslider_p0.png')
          // text = I18n.t('SSLIDER.FIRST')
          // text_desc = I18n.t('SSLIDER.FIRST_DESC')
        break;
    }
    const [position, setPosition] = useState({x: 0})
    const panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        setPosition({ x: gestureState.dx });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // console.log(position)
        position.x > 0 ? setScreen({screen : screen <= 0 ? 0 : screen - 1}) : setScreen({screen : screen > 4 ? 4 : screen + 1})
      }
    });
    return (
      <View style={styles.container} {...panResponder.panHandlers}>
      <Image source={image} style={styles.image_big} resizeMode={'contain'}/>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text_desc}>{text_desc}</Text>
      <Image source={pag} style={styles.image_small}/>
      <TouchableOpacity onPress={() => setScreen({screen : screen + 1})} style={[styles.btn, styles.shadow, styles.btn_red]}>
          <Text style={[styles.btn_text, styles.text_white]}>{I18n.t('SSLIDER.NEXT')}</Text>
          </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen({screen : 4})} style={[styles.btn]}>
          <Text style={[styles.btn_text, styles.text_red]}>{I18n.t('SSLIDER.SKIP')}</Text>
          </TouchableOpacity>
      </View>
    )
  }

  export default Renderitem

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
      },
      image_big: {
          width: width - 64,
          height: width,
          marginBottom: 16
      },
      image_small: {
          marginTop: 16,
          marginBottom: 32
      },
      btn: { 
          height: 44,
          borderRadius: 24,
          marginBottom: 16,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch'
      },
      btn_red: {
        backgroundColor: colors.blood_red
      },
      text_white: {
          color: colors.white,
      },
      text_red: {
          color: colors.blood_red
      },
      btn_text: {
        fontFamily: 'Rubik-Medium',
        fontSize: 14,
        textTransform: 'uppercase'
      },
      text: {
        fontFamily: 'Rubik-Bold',
        fontSize: 17,
        color: colors.black111,
        marginBottom: 16
      },
      text_desc: {
        fontFamily: 'Rubik-Regular',
        fontSize: 15,
        color: colors.gray_b1,
        textAlign: 'center'
      },
      shadow: {
		...Platform.select({
			ios: {
			  shadowOpacity: 0.2,
			  shadowOffset: {
				width: 0.2,
				height: 2,
			  },
			  shadowColor: colors.pink_shadow,
			  shadowRadius: 2,
			},
			android: {
			  elevation: 4,
			},
		  }),
	}
  })