import React, { useEffect, useState } from "react"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import { RNCamera } from "react-native-camera"
import I18n from "@locales/I18n"
import { checkQr } from "@reducers/progressTask"
const { width } = Dimensions.get("window")

function ScanQr({ progressTask, loader, dispatch }) {
  const [marker, setMarker] = useState(true)
  console.log('ScanQr ready: ', marker)

  const send = code => {
    setMarker(false)
    setTimeout(() => {      
      dispatch(checkQr(code.data, setMarker)) 
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t(`NEW_MISSIONS.${progressTask.task_details.first_descr}`)}</Text>
      <View style={styles.cameraView}>
        <RNCamera
          captureAudio={false}
          style={{ width: width - 32, height: width - 32 }}
          ratio={"1:1"}
          onBarCodeRead={marker ? send : () => {}}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          androidCameraPermissionOptions={{
            title: I18n.t("TITLE"),
            message: I18n.t("CAMERA_PERMISSION"),
            buttonPositive: I18n.t("OK"),
            buttonNegative: I18n.t("CANCEL"),
          }}
        />
      </View>
      <Text style={styles.name}>{"QR Scan"}</Text>
    </View>
  )
}

const mapStateToProps = state => ({
  progressTask: state.progressTask,
  loader: state.loader,
})

export default connect(mapStateToProps)(ScanQr)

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
  cameraView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  name: {
    fontFamily: "Rubik-Regular",
    color: "#111",
    fontSize: 16,
    textAlign: "center",
  },
})
