import React from "react"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import { RNCamera } from "react-native-camera"
import I18n from "@locales/I18n"
import { checkQr } from "@reducers/progressTask"
const { width } = Dimensions.get("window")

function ScanQr({ progressTask, loader, dispatch }) {
  const send = code => {
    dispatch(checkQr(code.data))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{progressTask.taskDetails.firstDescr}</Text>
      <View style={styles.cameraView}>
        <RNCamera
          captureAudio={false}
          style={{ width: width - 100, height: width - 100 }}
          onBarCodeRead={!loader ? send : () => {}}
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
  cameraView: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginVertical: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#111",
    textAlign: "center",
  },
  name: {
    fontFamily: "Rubik-Regular",
    color: "#111",
    fontSize: 16,
    textAlign: "center",
  },
})
