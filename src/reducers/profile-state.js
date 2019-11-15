import { Platform } from "react-native"
import { PROFILE } from "./__proto__"
//constants
import { urls } from "@constants/urls"
import config from "@constants/config"
//services
import { httpPost } from "@services/http"
import { toAge } from "@services/converteDate"
import route from "@services/route"
import BackgroundGeolocationModule from "@services/background-geolocation-picker"
//reducers
import { loaderState } from "@reducers/loader"
import { setInstaToken } from "@reducers/insta-token"
import { setBalance } from "@reducers/user-balance"
import { setToken } from "@reducers/token"
import { getPush } from "@reducers/push"
import { current } from "@reducers/location"
import { setColor } from "@reducers/user-color"
//locales
import I18n from "@locales/I18n"

const RESULT = "[user info] RESULT"

const initialState = new PROFILE()

export default (state = initialState, action) => {
  switch (action.type) {
    case RESULT:
      return action.user
    default:
      return state
  }
}

export const getUser = token => async dispatch => {
  geolocation()
  try {
    const response = await httpPost(urls.get_user, JSON.stringify({}), token)
    console.log('getUser', response)
    const user = {
      name: response.body.user_name,
      phone: response.body.user_phone,
      photo: response.body.photo,
      sex: response.body.sex ? 1 : 0,
      currency: response.body.currency_plural,
      birthDay: toAge(response.body.birth_day),
    }
    await dispatch(saveUser(user))
    await dispatch(setToken(token))
    // await dispatch(getPush(token))
    await dispatch(setColor(user.sex))
    await dispatch(setInstaToken(response.body.is_insta_logged))
    await dispatch(setBalance(Number(response.body.balance)))
    route.navigate("Main")
  } catch (error) {}
}

const geolocation = () => {
  if (Platform.OS === "ios") {
    BackgroundGeolocationModule.ready(config(), state => {
      !state.enabled && BackgroundGeolocationModule.start(function() {})
    })
  } else {
    BackgroundGeolocationModule.configure(config())
    BackgroundGeolocationModule.checkStatus(status => {
      !status.isRunning && BackgroundGeolocationModule.start()
    })
  }
}

export const saveUser = user => ({ type: RESULT, user })
