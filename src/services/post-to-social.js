import { Linking, Platform } from "react-native"
import RNFetchBlob from "rn-fetch-blob"
import RNFS from "react-native-fs"
import Share from "react-native-share"

callCallback = callback => {
  console.log("instagram callback: ", callback)
  if (Platform.OS !== "ios") {
    let filePath
    if (callback === "exception_video" || callback === "success_video") {
      filePath = "/storage/emulated/0/DCIM/epc_game_video.mp4"
    } else {
      filePath = "/storage/emulated/0/DCIM/epc_game_img.jpg"
    }
    setTimeout(() => {
      RNFS.exists(filePath)
        .then(res => {
          console.log(res)
          if (res) {
            RNFS.unlink(filePath)
              .then(() => {
                console.log("unlink success")
                this.confirmFuction()
              })
              .catch(err => {
                console.log("unlink error", err)
              })
          }
        })
        .catch(err => {
          console.log("filePath exists error", err)
        })
    }, 1000)
  }
  if (callback === "no_instagram") {
    if (Platform.OS === "ios") {
      Linking.openURL("itms-apps://itunes.apple.com/app/instagram/id389801252")
    } else {
      Linking.openURL("market://details?id=com.instagram.android")
    }
  }
}

export function socialPost(data, confirmFunction, errorFunction) {
  const dirs = RNFetchBlob.fs.dirs
  RNFetchBlob.config({ 
    fileCache: true, 
    appendExt: "mp4" })
    .fetch("GET", data.video)
    .then(async res => {
      const path = await res.path()
      const base = await res.base64()
      console.log('path',path)
      console.log('base',base)
      const shareOptions = {
        url: Platform.OS === "ios" ? path : "data:video/mp4;base64," + base,
        social: Share.Social.INSTAGRAM
      }
      try {
        // await Share.open(shareOptions)
        await Share.shareSingle(shareOptions)
        setTimeout(async () => {
          confirmFunction()
          try {
            await RNFS.exists(path)
            await RNFS.unlink(path)
          } catch (e) {
            console.log(e, "unavailable unlink")
          }
        }, 5000)
      } catch (e) {
        errorFunction()
        console.log(e, "ERROR Share.open")
      }
    })
}
