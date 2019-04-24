import { Linking, Platform, Clipboard } from "react-native";
import Share from "react-native-share";
import { Toast } from "native-base";
// import PickedLanguage from "./../locales/language-picker";
import I18n from "@locales/I18n";

export function shareToAllSocial(shareLink) {
  let shareOptions = {
    title: "EpocketCash",
    message: shareLink
  };
  Share.open(shareOptions)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
}

shareSingleThroughtLinking = (app_link, app_share_link, app_market_id) => {
  Linking.canOpenURL(app_link)
    .then(supported => {
      if (!supported) {
        if (Platform.OS === "ios") {
          Linking.openURL("itms-apps://itunes.apple.com/app" + app_market_id);
        } else {
          Linking.openURL("market://details?id=" + app_market_id);
        }
      } else {
        Linking.openURL(app_share_link);
      }
    })
    .catch(err => console.log(err));
};

export function shareToOneSocial(shareLink, link_reward, socialType, curr) {
  // let extendedShareLink = PickedLanguage.REF_LINK.ADDITIONAL_SHARING_TEXT + link_reward + " " + PickedLanguage.EPC.toUpperCase() + "\n" + shareLink
  let extendedShareLink =
    I18n.t("REF_LINK.ADDITIONAL_SHARING_TEXT") +
    link_reward +
    " " +
    I18n.t("EPC", { currency: curr }).toUpperCase() +
    "\n" +
    shareLink;
  const defaultOptions = {
    title: "EpocketCash",
    message: extendedShareLink
  };
  let market_link = "";
  switch (socialType) {
    case "copy":
      Clipboard.setString(extendedShareLink);
      Toast.show({
        // text: PickedLanguage.REF_LINK.COPY_MESSAGE,
        text: I18n.t("REF_LINK.COPY_MESSAGE"),
        buttonText: "",
        duration: 3000,
        style: {
          alignItems: "center",
          justifyContent: "center"
        },
        onClose: () => {}
      });
      break;
    case "facebook":
      Share.shareSingle({ ...defaultOptions, social: Share.Social.FACEBOOK });
      break;
    case "facebook-messenger":
      Platform.OS === "ios"
        ? (market_link = "/messenger/id454638411?mt=8")
        : (market_link = "com.facebook.orca");
      this.shareSingleThroughtLinking(
        "fb-messenger://",
        "fb-messenger://share/?link=" +
          extendedShareLink +
          "&app_id=2150067405259447",
        market_link
      );
      break;
    case "telegram":
      Platform.OS === "ios"
        ? (market_link = "/telegram-messenger/id686449807?mt=8")
        : (market_link = "org.telegram.messenger");
      this.shareSingleThroughtLinking(
        "tg://",
        "tg://msg?text=" + extendedShareLink,
        market_link
      );
      break;
    case "viber":
      Platform.OS === "ios"
        ? (market_link = "/viber-messenger-chats-calls/id382617920?mt=8")
        : (market_link = "com.viber.voip");
      this.shareSingleThroughtLinking(
        "viber://",
        "viber://forward?text=" + extendedShareLink,
        market_link
      );
      break;
    case "whatsapp":
      Share.shareSingle({ ...defaultOptions, social: Share.Social.WHATSAPP });
      break;
    case "instagram":
      Share.shareSingle({ ...defaultOptions, social: Share.Social.INSTAGRAM });
      break;
    case "more":
      shareToAllSocial(extendedShareLink);
      break;
    default:
      shareToAllSocial(extendedShareLink);
      break;
  }
}
