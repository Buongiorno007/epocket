import { NativeModules, Platform } from "react-native"
import I18n from "react-native-i18n"
import en from "./eng"
import ru from "./rus"

const locale =
  Platform.OS === "ios"
    ? Number(Platform.Version) >= 13
      ? NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.SettingsManager.settings.AppleLocale.substr(0, 2)
    : NativeModules.I18nManager.localeIdentifier.substr(0, 2)

I18n.defaultLocale = "ru"
I18n.fallbacks = true
I18n.locale = locale || "ru"

I18n.translations = {
  en,
  ru,
}

export default I18n
