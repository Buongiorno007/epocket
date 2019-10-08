import { NativeModules, Platform } from "react-native"
import I18n from "react-native-i18n"
import en from "./eng"
import ru from "./rus"

const locale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2)
      // "en"
    : NativeModules.I18nManager.localeIdentifier.substr(0, 2)
    
    if (locale === undefined) {
      // iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
      locale = NativeModules.SettingsManager.settings.AppleLanguages[0]
      if (locale == undefined) {
            locale = "en" // default language
      }
  }

I18n.defaultLocale = "ru"
I18n.fallbacks = true
I18n.locale = locale

I18n.translations = {
  en,
  ru,
}

export default I18n
