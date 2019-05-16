import { Linking, Platform, PermissionsAndroid } from "react-native";
import RNInstagramStoryShare from "../native_modules/react-native-instagram-story-share/src";
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import I18n from "@locales/I18n";

confirmFuction = () => {
  //this func will be overrided for iOS for callBack
  // console.log("confirmFuction not overrided");
};
callCallback = callback => {
  // console.log("instagram callback: ", callback);
  if (Platform.OS != "ios") {
    let filePath;
    if (callback === "exception_video" || callback === "success_video") {
      filePath = "/storage/emulated/0/DCIM/epc_game_video.mp4";
    } else {
      filePath = "/storage/emulated/0/DCIM/epc_game_img.jpg";
    }
    setTimeout(() => {
      RNFS.exists(filePath)
        .then(res => {
          // console.log(res);
          if (res) {
            RNFS.unlink(filePath)
              .then(() => {
                // console.log("unlink success");
                this.confirmFuction();
              })
              .catch(err => {
                // console.log("unlink error", err);
              });
          }
        })
        .catch(err => {
          // console.log("filePath exists error", err);
        });
    }, 1000);
  }
  if (callback === "no_instagram") {
    if (Platform.OS === "ios") {
      Linking.openURL("itms-apps://itunes.apple.com/app/instagram/id389801252");
    } else {
      Linking.openURL("market://details?id=com.instagram.android");
    }
  }
};

// export function postToSocialStory(postData, deepLink, confirmFuction) {
//   //deprecated
//   if (Platform.OS === "ios") {
//     RNInstagramStoryShare.share(
//       {
//         backgroundImage: postData.base64,
//         deeplinkingUrl: deepLink
//       },
//       this.callCallback,
//       this.callCallback
//     );
//     confirmFuction();
//   } else {
//     let image_data = postData.base64.split("data:image/jpg;base64,")[1];
//     const dirs = RNFetchBlob.fs.dirs;
//     const file_path = dirs.DCIMDir + "/epc_game_img.jpg";
//     RNFS.writeFile(file_path, image_data, "base64")
//       .then(() => {
//         RNInstagramStoryShare.share(
//           {
//             backgroundImage: file_path,
//             deeplinkingUrl: deepLink
//           },
//           this.callCallback,
//           this.callCallback
//         );
//       })
//       .catch(err => {
//         console.log("writeFile error", err);
//       });
//   }
// }
export function postToSocial(postData, deepLink, confirmFuction, video_status) {
  let base64Prefix = "data:image/jpg;base64,";
  const dirs = RNFetchBlob.fs.dirs;
  let file_path;
  let type;
  if (Platform.OS === "ios") {
    if (video_status) {
      base64Prefix = "data:video/mp4;base64,";
      postData.base64 = "";
      RNFetchBlob.config({
        fileCache: true,
        appendExt: "mp4"
      })
        .fetch("GET", postData.video) //postData
        .then(res => {
          let shareImageBase64 = {
            url: res.path()
          };
          setTimeout(() => {
            Share.open(shareImageBase64).then(
              result => {
                confirmFuction();
                RNFS.exists(res.path())
                  .then(result => {
                    if (result) {
                      RNFS.unlink(res.path())
                        .then(() => {
                          // console.log("unlink success");
                        })
                        .catch(err => {
                          // console.log("unlink error", err);
                        });
                    }
                  })
                  .catch(err => {
                    // console.log("filePath exists error", err);
                  });
              },
              error => {}
            );
          }, 2000);
        });
    } else {
      base64Prefix = "data:image/jpg;base64,";
      let shareImageBase64 = {
        url:
          postData.base64 && postData.base64.includes(base64Prefix)
            ? postData.base64
            : base64Prefix + postData.base64 //check for base64 prefix
      };
      // console.log(shareImageBase64);
      setTimeout(() => {
        Share.open(shareImageBase64).then(
          result => {
            confirmFuction();
          },
          error => {}
        );
      }, 2000);
    }
  } else {
    let post_data;
    if (video_status) {
      type = "mp4";
      post_data = postData.video; //postData
      file_path = dirs.DCIMDir + "/epc_game_video.mp4";
      requestStoragePermission(
        post_data,
        file_path,
        deepLink,
        confirmFuction,
        type,
        video_status
      );
    } else {
      type = "base64";
      if (postData.base64 && postData.base64.includes(base64Prefix)) {
        post_data = postData.base64.split("data:image/jpg;base64,")[1];
      } else {
        post_data = postData.base64;
      }
      file_path = dirs.DCIMDir + "/epc_game_img.jpg";
      RNFS.writeFile(file_path, post_data, type)
        .then(() => {
          RNInstagramStoryShare.shareToFeed(
            {
              backgroundImage: file_path,
              deeplinkingUrl: deepLink
            },
            Boolean(video_status),
            this.callCallback,
            this.callCallback
          );
          this.confirmFuction = confirmFuction; //override this.confirmFuction to call confirmFunction in callback
        })
        .catch(err => {
          // console.log("writeFile error", err);
          requestStoragePermission(
            post_data,
            file_path,
            deepLink,
            confirmFuction,
            type,
            video_status
          );
        });
    }
  }
}
async function requestStoragePermission(
  post_data,
  file_path,
  deepLink,
  confirmFuction,
  type,
  video_status
) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: I18n.t("PERMISSON.STORAGE_PERMISSON_TITLE"),
        message: I18n.t("PERMISSON.STORAGE_PERMISSON_MESSAGE"),
        buttonNegative: I18n.t("PROFILE_PAGE.DECLINE"),
        buttonPositive: I18n.t("OK").toUpperCase()
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log("You can use the WRITE_EXTERNAL_STORAGE");
      if (video_status) {
        RNFetchBlob.config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: false,
            path: file_path,
            mime: "text/plain",
            description: "File downloaded by download manager."
          }
        })
          .fetch("GET", post_data)
          .then(resp => {
            // console.log(resp);
            RNInstagramStoryShare.shareToFeed(
              {
                backgroundImage: file_path,
                deeplinkingUrl: deepLink
              },
              Boolean(video_status),
              this.callCallback,
              this.callCallback
            );
            this.confirmFuction = confirmFuction; //override this.confirmFuction to call confirmFunction in callback
          })
          .catch(err => {
            // console.log("writeFile error", err);
          });
      } else {
        RNFS.writeFile(file_path, post_data, type)
          .then(() => {
            RNInstagramStoryShare.shareToFeed(
              {
                backgroundImage: file_path,
                deeplinkingUrl: deepLink
              },
              Boolean(video_status),
              this.callCallback,
              this.callCallback
            );
            this.confirmFuction = confirmFuction; //override this.confirmFuction to call confirmFunction in callback
          })
          .catch(err => {
            // console.log("writeFile error", err);
          });
      }
    } else {
      // console.log("WRITE_EXTERNAL_STORAGE permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}
