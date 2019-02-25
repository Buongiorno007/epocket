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
            Linking.openURL("market://details?id=" + app_market_id);
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
            this.shareSingleThroughtLinking('fb-messenger://', "fb-messenger://share/?link=" + shareLink + "&app_id=2150067405259447", "com.facebook.orca")
            break;
        case "telegram":
            this.shareSingleThroughtLinking('tg://', "tg://msg?text=" + shareLink, "org.telegram.messenger")
            break;
        case "viber":
            this.shareSingleThroughtLinking('viber://', "viber://forward?text" + shareLink, "com.viber.voip")
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