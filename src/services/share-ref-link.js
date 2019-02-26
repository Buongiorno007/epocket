import { Linking, Platform, CameraRoll, Alert, PermissionsAndroid, Clipboard } from "react-native";
import Share from 'react-native-share';
import { Toast } from "native-base";
import { RU } from "./../locales/ru";

export function shareToAllSocial(shareLink) {
    let shareOptions = {
        title: "EpocketCash",
        message: shareLink,
    };
    Share.open(shareOptions)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
}
shareSingleThroughtLinking = (app_link, app_share_link, app_market_id) => {
    Linking.canOpenURL(app_link).then(supported => {
        if (!supported) {
            if (Platform.OS === "ios") {
                Linking.openURL('itms-apps://itunes.apple.com/app' + app_market_id)
            }
            else {
                Linking.openURL("market://details?id=" + app_market_id);
            }
        } else {
            Linking.openURL(app_share_link);
        }
    }).catch(err => console.log(err));
}
export function shareToOneSocial(shareLink, socialType) {
    const defaultOptions = {
        title: "EpocketCash",
        message: shareLink,
    };
    let market_link = ""
    switch (socialType) {
        case "copy":
            Clipboard.setString(shareLink);
            Toast.show({
                text: RU.REF_LINK.COPY_MESSAGE,
                buttonText: "",
                duration: 3000,
                style: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                onClose: () => { }
            })
            break;
        case "facebook":
            Share.shareSingle({ ...defaultOptions, social: Share.Social.FACEBOOK });
            break;
        case "facebook-messenger":
            Platform.OS === "ios" ? market_link = "/messenger/id454638411?mt=8" : market_link = "com.facebook.orca"
            this.shareSingleThroughtLinking('fb-messenger://', "fb-messenger://share/?link=" + shareLink + "&app_id=2150067405259447", market_link)
            break;
        case "telegram":
            Platform.OS === "ios" ? market_link = "/telegram-messenger/id686449807?mt=8" : market_link = "org.telegram.messenger"
            this.shareSingleThroughtLinking('tg://', "tg://msg?text=" + shareLink, market_link)
            break;
        case "viber":
            Platform.OS === "ios" ? market_link = "/viber-messenger-chats-calls/id382617920?mt=8" : market_link = "com.viber.voip"
            this.shareSingleThroughtLinking('viber://', "viber://forward?text=" + shareLink, market_link)
            break;
        case "whatsapp":
            Share.shareSingle({ ...defaultOptions, social: Share.Social.WHATSAPP });
            break;
        case "instagram":
            Share.shareSingle({ ...defaultOptions, social: Share.Social.INSTAGRAM });
            break;
        case "more":
            shareToAllSocial(shareLink)
            break;
        default:
            shareToAllSocial(shareLink)
            break;
    }
}