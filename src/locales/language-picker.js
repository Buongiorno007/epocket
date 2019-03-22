import { NativeModules, Platform } from 'react-native'
//locales
import { RU } from "./ru"
import { EN } from "./en"
const locale = Platform.OS === "ios" ?
    NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2) :
    NativeModules.I18nManager.localeIdentifier.substring(0, 2);
const PickedLanguage =
    locale === "ru" ?
        RU :
        EN
export default PickedLanguage