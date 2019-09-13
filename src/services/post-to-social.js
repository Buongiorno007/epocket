import { Linking, Platform, PermissionsAndroid, AppState } from "react-native"
import RNInstagramStoryShare from "../native_modules/react-native-instagram-story-share"
import RNFetchBlob from "rn-fetch-blob"
import RNFS from "react-native-fs"
import Share from "react-native-share"
import I18n from "@locales/I18n"
import { convertToBase64 } from "./convert-to-base64"

confirmFuction = () => {
  //this func will be overrided for iOS for callBack
  console.log("confirmFuction not overrided")
}
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

export async function postToSocial(postData, deepLink, confirmFuction, video_status, errorFunction) {
  let base64Prefix = "data:image/jpg;base64,"
  const dirs = RNFetchBlob.fs.dirs
  let file_path
  let type
  //   if (video_status) {
  if (true) {
    base64Prefix = "data:video/mp4;base64,"
    postData.base64 = ""
    RNFetchBlob.config({
      fileCache: true,
      appendExt: "mp4",
    })
      .fetch("GET", postData.video) //postData
      .then(res => {
        let shareImageBase64 = {
          url: res.path(),
        }
        // setTimeout(() => {
        console.log(shareImageBase64, "SHARE BASE 64")
        Share.open(shareImageBase64).then(
          result => {
            confirmFuction()
            RNFS.exists(res.path())
              .then(result => {
                if (result) {
                  RNFS.unlink(res.path())
                    .then(() => {
                      console.log("unlink success")
                    })
                    .catch(err => {
                      console.log("unlink error", err)
                    })
                }
              })
              .catch(err => {
                console.log("filePath exists error", err)
              })
          },
          error => {
            errorFunction()
          },
        )
      })
  } else {
    base64Prefix = "data:image/jpg;base64,"
    if (postData.insta_img) {
      postData.base64 = await convertToBase64(postData.insta_img)
    }
    let shareImageBase64 = {
      url: postData.base64 && postData.base64.includes(base64Prefix) ? postData.base64 : base64Prefix + postData.base64, //check for base64 prefix
    }
    // setTimeout(() => {
    Share.open(shareImageBase64).then(
      result => {
        confirmFuction()
      },
      error => {
        console.log(error, "ERROR")
        errorFunction()
      },
    )
  }
}

export function socialPost(data, confirmFunction, errorFunction) {
  RNFetchBlob.config({ fileCache: true, appendExt: "mp4" })
    .fetch("GET", data.video)
    .then(async res => {
      const path = await res.path()
      const base = await res.base64()
      const shareOptions = {
        url: Platform.OS === "ios" ? path : "data:video/mp4;base64," + base,
      }
      try {
        await Share.open(shareOptions)
        setTimeout(async () => {
          confirmFunction()
          try {
            await RNFS.exists(path)
            await RNFS.unlink(path)
          } catch (e) {
            console.log(e, "unavailable unlink")
          }
        }, 1000)
      } catch (e) {
        errorFunction()
        console.log(e, "ERROR Share.shareSingle")
      }
    })
}
