import { Linking, Platform, CameraRoll } from "react-native";
import RNInstagramStoryShare from 'react-native-instagram-story-share'
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { formatItem } from './format-hastags'
import Share from 'react-native-share';

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
                console.log("writeFile success")
                RNInstagramStoryShare.shareToFeed({
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


        let shareImageBase64 = {
            title: formatItem(postData.hash_tag),
            url: postData.base64,
            social: Share.Social.INSTAGRAM
        };
        console.log(shareImageBase64)
        setTimeout(() => {
            Share.open(shareImageBase64).then(
                result => {
                    console.log(result)
                    confirmPost()
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
                console.log("writeFile success")
                RNInstagramStoryShare.shareToFeed({
                    backgroundImage: file_path,
                    deeplinkingUrl: deepLink
                }, this.callCallback, this.callCallback)
            })
            .catch((err) => {
                console.log("writeFile error", err)
            })
    }
};
callCallback = (callback) => {
    console.log("callback", callback)
    if (Platform.OS != "ios") {
        setTimeout(() => {
            let filePath = "/storage/emulated/0/DCIM/epc_game_img.jpg";
            RNFS.exists(filePath)
                .then((res) => {
                    if (res) {
                        RNFS.unlink(filePath)
                            .then(() => console.log('epc_game_img.jpg DELETED'))
                    }
                })
        }, 1000);
    }
}
