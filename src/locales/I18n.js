import { NativeModules, Platform } from "react-native"
import I18n from "react-native-i18n"
import en from "./eng"
import ru from "./rus"

const locale =
  Platform.OS === "ios"
    ? // ? NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2)
      "ru"
    : NativeModules.I18nManager.localeIdentifier.substr(0, 2)

I18n.defaultLocale = "ru"
I18n.fallbacks = true
I18n.locale = locale

I18n.translations = {
  en,
  ru,
}

export default I18n
