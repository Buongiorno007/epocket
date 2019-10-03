import React, { useRef, useState } from "react"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, Text } from "react-native"
import { RNCamera } from "react-native-camera"
import { connect } from "react-redux"
import I18n from "@locales/I18n"

function BeforePost({ progressTask }) {
  const [type, setType] = useState(false)
  const [flash, setFlash] = useState(false)
  const cameraRef = useRef()

  return (
    <View style={styles.container}>
      <RNCamera
        captureAudio={false}
        // ratio={'1:1'}
        ref={cameraRef}
        style={{ width: 200, height: 200 }}
        type={type ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
        flashMode={flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: I18n.t("TITLE"),
          message: I18n.t("CAMERA_PERMISSION"),
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => setType(!type)}>
          <Image style={styles.smallImage} source={require("@assets/dv4/change.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
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
})

export default connect(mapStateToProps)(BeforePost)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: "lightblue",
    alignItems: "center",
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
