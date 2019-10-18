import React, { useRef, useState } from "react"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, Text } from "react-native"
import { RNCamera } from "react-native-camera"
import { connect } from "react-redux"
import I18n from "@locales/I18n"
import { createPost } from "@reducers/progressTask"
const { width } = Dimensions.get("window")

function BeforePost({ progressTask, setPostData, dispatch }) {
  const [type, setType] = useState(false)
  const [flash, setFlash] = useState(false)
  const [taken, setTaken] = useState(false)
  const cameraRef = useRef()

  const takePicture = async () => {
    try {
      setTaken(true)

      const response = await dispatch(createPost(cameraRef.current))
      console.log('takePicture', response)
      await setPostData(response)
    } catch (e) {
      console.log(e, "CANT GET")
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t(`NEW_MISSIONS.${progressTask.task_details.first_descr}`)}</Text>
        <View style={[taken ? {display:'none'} : {}, styles.cameraView]}>
          <Image
            source={{ uri: progressTask.task_details.photo }}
            style={{ width: 100, height: 100, position: "absolute", top: 0, left: 0, zIndex: 2 }}
          />
          <RNCamera
          captureAudio={false}
          // ratio={'1:1'}
          ref={cameraRef}
          style={[taken ? {display: 'none'} : { width: width - 64, height: 100 }]}
          ratio={"1:1"}
          type={type ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
          flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: I18n.t("TITLE"),
            message: I18n.t("CAMERA_PERMISSION"),
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          />          
        </View>

      {/* <Image style={[taken ? {} : {display:'none'}, styles.cameraView]} resizeMode={'contain'} source={require("@assets/img/instagram.png")}/> */}

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => setType(!type)}>
          <Image style={styles.smallImage} source={require("@assets/dv4/change.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <Image style={styles.bigImage} source={require("@assets/dv4/photoMake.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFlash(!flash)}>
          <Image style={styles.smallImage} source={require("@assets/dv4/flash.png")} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const mapStateToProps = state => ({
  progressTask: state.progressTask,
  token: state.token,
  mallPoint: state.mallPoint,
  mallTask: state.mallTask,
})

export default connect(mapStateToProps)(BeforePost)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#111",
    textAlign: "center",
    marginBottom: 24,
  },
  cameraView: {
    width: width - 32, 
    maxHeight: width,
    overflow: 'hidden',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallImage: {
    width: 40,
    height: 40,
  },
  bigImage: {
    width: 64,
    height: 64,
    marginHorizontal: 32,
  },
})
