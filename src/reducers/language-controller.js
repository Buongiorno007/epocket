import { NativeModules, Platform } from 'react-native'
//locales
import RU from "../locales/ru"
import EN from "../locales/en"
export const CHANGE_LANGUAGE_CONTROLLER = 'language-controller/CHANGE_LANGUAGE_CONTROLLER';

export default (state = RU, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE_CONTROLLER:
            return action.language
        default:
            return state;
    }
}

export const handleLanguageChanged = () => async dispatch => {
    let locale = "ru";
    if (Platform.OS === "ios") {
        // iOS:
        locale = NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2)
    } else {
        // Android:
        locale = NativeModules.I18nManager.localeIdentifier.substring(0, 2)
    }
    switch (locale) {
        case "en":
            dispatch(changeLanguageController(EN))
            break;
        default:
            dispatch(changeLanguageController(RU))
            break;
    }
}
export const changeLanguageController = (language) => ({
    type: CHANGE_LANGUAGE_CONTROLLER,
    language
})

