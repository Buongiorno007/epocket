import { Linking, Platform, CameraRoll } from "react-native";
import RNInstagramStoryShare from '../native_modules/react-native-instagram-story-share'
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { formatItem } from './format-hastags'
import Share from 'react-native-share';

confirmFuction = () => { //this func will be overrided for iOS for callBack
    console.log("confirmFuction not overrided")
}

callCallback = (callback) => {
    console.log("instagram sharing callback", callback)
    if (Platform.OS != "ios") {
        setTimeout(() => {
            let filePath = "/storage/emulated/0/DCIM/epc_game_img.jpg";
            RNFS.exists(filePath)
                .then((res) => {
                    if (res) {
                        RNFS.unlink(filePath)
                            .then(() => {
                                this.confirmFuction()
                            })
                    }
                })
        }, 1000);
    }
}

export function postToSocialStory(postData, deepLink, confirmFuction) {
    if (Platform.OS === "ios") {
        RNInstagramStoryShare.share({
            backgroundImage: postData.base64,
            deeplinkingUrl: deepLink
        }, this.callCallback, this.callCallback)
        confirmFuction();
    }
    else {
        let image_data = postData.base64.split('data:image/jpg;base64,')[1];
        const dirs = RNFetchBlob.fs.dirs
        const file_path = dirs.DCIMDir + "/epc_game_img.jpg"
        RNFS.writeFile(file_path, image_data, 'base64')
            .then(() => {
                RNInstagramStoryShare.share({
                    backgroundImage: file_path,
                    deeplinkingUrl: deepLink
                }, this.callCallback, this.callCallback)
            })
            .catch((err) => {
                console.log("writeFile error", err)
            })
    }
}
export function postToSocial(postData, deepLink, confirmFuction) {
    if (Platform.OS === "ios") {
        // CameraRoll.saveToCameraRoll(postData.success_image)
        //     .then((data) => {
        //         console.log('Success', 'Photo added to camera roll!', data)
        //         let localID = data.split("id=")[1].split("&ext=")[0]
        //         let instagramURL = `instagram://library?OpenInEditor=1&LocalIdentifier=` + localID + `/L0/001`;
        //         //let instagramURL = `instagram://share;
        //         Linking.openURL(instagramURL)
        //         setTimeout(() => {
        //             // CameraRoll.deletePhotos([data])
        //         }, 1000);
        //     })
        //     .catch(err => console.log('err:', err))

        let base64Prefix = 'data:image/jpg;base64,'
        let shareImageBase64 = {
            title: "",
            url: postData.base64.includes(base64Prefix) ? postData.base64 : postData.base64 + base64Prefix, //check for base64 prefix
            social: Share.Social.INSTAGRAM
        };
        console.log(shareImageBase64)
        setTimeout(() => {
            Share.open(shareImageBase64).then(
                result => {
                    confirmFuction()
                },
                error => {
                }
            )
        }, 2000);
    }
    else {
        let image_data = postData.base64.split('data:image/jpg;base64,')[1];
        const dirs = RNFetchBlob.fs.dirs
        const file_path = dirs.DCIMDir + "/epc_game_img.jpg"
        RNFS.writeFile(file_path, image_data, 'base64')
            .then(() => {
                RNInstagramStoryShare.shareToFeed({
                    backgroundImage: file_path,
                    deeplinkingUrl: deepLink
                }, this.callCallback, this.callCallback)
                this.confirmFuction = confirmFuction; //override this.confirmFuction to call confirmFunction in callback
            })
            .catch((err) => {
                console.log("writeFile error", err)
            })
    }
};