// Выложи фото в Instagram и добавь хештеги в описании
import React, { useState } from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image, Platform, Clipboard } from "react-native"
import Modal from "react-native-modal";
import { connect } from "react-redux"
import I18n from "@locales/I18n"
import Video from "react-native-video"
import { photoPosted } from "@reducers/progressTask"
import { loaderState } from "@reducers/loader"
import { colors } from "@constants/colors"

const { width } = Dimensions.get("window")
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

function DirectlyPost({ progressTask, setPostData, postData, userPhoto, dispatch }) {
  console.log('DirectlyPost')
  Clipboard.setString(postData.hash_tag)
  const [video, setVideo] = useState(true)
  const [visible, setVisible] = useState(false)

  agreed = () =>{
    setVisible(!visible)
    dispatch(photoPosted(postData, setPostData))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t(`NEW_MISSIONS.${progressTask.task_details.second_descr}`)}</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* {video ? (
          <Video
            source={{
              uri: postData.video,
              // uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            }} // Can be a URL or a local file.
            onBuffer={() => {}} // Callback when remote video is buffering
            onError={() => setVideo(false)} // Callback when video cannot be loaded
            onLoad={() => {dispatch(loaderState(false))}}
            style={{ width: width - 32, height: width - 32 }}
            repeat={true}
            resizeMode={"contain"}
          />
        ) : (
          <Image source={{ uri: postData.img_watermark }} style={{ width: width - 32, height: width - 32 }} onLoad={() => {dispatch(loaderState(false))}}/>
        )}         */}
        <Image source={{uri : userPhoto}} style={{ width: width - 32, height: width - 32 }} resizeMode={'contain'} onLoad={() => {dispatch(loaderState(false))}}/>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => setPostData({})}>
          <Text style={styles.buttonText}>{I18n.t('NEW_MISSIONS.RESHOOT')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(!visible)}>
          <Text style={styles.buttonText}>{I18n.t('NEW_MISSIONS.PUBLISH')}</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={visible} deviceHeight={height} style={{justifyContent: 'center', alignItems: 'center'}} backdropOpacity={0.5} backdropColor={colors.black111}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Image style={styles.modalHeaderImage} source={require('@assets/img/warning.png')}/>
            <Text style={styles.modalTextHeader}>{I18n.t('MISSION.HASHTAG_ADD')}</Text>
            <View style={styles.modalMainImageContainer}><Image style={styles.modalMainImage} source={require('@assets/img/Instagram_how.gif')} resizeMode={'contain'}/></View>
            <Text style={styles.modalTextNormal}>{I18n.t('MISSION.HASHTAGS_MESSAGE')}</Text>
            <View style={styles.row}>
              <Image style={styles.modalImageChecked} source={require('@assets/img/checked.png')}/>
              <Text style={styles.modalTextBold}>{I18n.t('MISSION.HASHTAGS_COPIED')}</Text>
            </View>
            <View style={[styles.row, styles.modalButtonContainer]}>              
              <TouchableOpacity onPress={agreed} style={[styles.modalButton]}>
                <Text style={[styles.modalButtonText, {color: colors.white}]}>{I18n.t('COPY')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.modalButtonX}>
                <Image source={require('@assets/img/close.png')} style={styles.modalButtonXImg}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const mapStateToProps = state => ({
  progressTask: state.progressTask,
  insta_token: state.insta_token,
  userPhoto: state.image,
})

export default connect(mapStateToProps)(DirectlyPost)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#111",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: (width - 48) / 2,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E60050",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textTransform: "uppercase",
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#fff",
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: width - 80,
  },
  modalInner: {
    backgroundColor: 'white', 
    borderRadius: 24, 
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalTextHeader: {
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
    color: colors.black111,
    marginBottom: 8,
  },
  modalTextNormal: {
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    color: colors.black40,
    textAlign: 'center',
  },
  modalTextBold: {
    fontFamily: 'Rubik-Medium',
    fontSize: 12,
    color: colors.black111,
  }, 
  modalHeaderImage: {
    width: 42,
    height: 36,
    marginTop: 32,
    marginBottom: 8,
  },
  modalMainImageContainer: {
    marginBottom: 16,
    borderWidth: 1, 
    borderColor: colors.map_gray, 
    marginHorizontal: 16
  },
  modalMainImage: {
    width: width - 60,
    height: 120,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  modalImageChecked: {
    width: 8,
    height: 8,
    marginRight: 5,
  },
  modalButtonContainer: {
    height: 90, 
    alignSelf: 'stretch', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    height: 44,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: colors.blood_red
  },
  modalButtonText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    color: colors.settings_gray,
    fontWeight: 'bold',
  },
  modalButtonX: {
    position: 'absolute',
    right: 16,
    top: 16
  },
  modalButtonXImg: {
    width: 20,
    height: 20
  }
})