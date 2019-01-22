import { Platform } from "react-native";
import RNInstagramStoryShare from 'react-native-instagram-story-share'
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

export function postToSocial(postData, deepLink, confirmFuction) {
    if (Platform.OS === "ios") {
        RNInstagramStoryShare.share({
            backgroundImage: postData,
            deeplinkingUrl: deepLink
        }, this.callCallback, this.callCallback)
        confirmFuction();
    }
    else {
        let image_data = postData.split('data:image/jpg;base64,')[1];
        const dirs = RNFetchBlob.fs.dirs
        const file_path = dirs.DCIMDir + "/epc_game_img.jpg"
        this.setState({ filePath: file_path })
        RNFS.writeFile(file_path, image_data, 'base64')
            .then(() => {
                console.log("writeFile success")
                RNInstagramStoryShare.share({
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
