import { MALLPOINT } from "./__proto__"
import { urls } from "@constants/urls"
import { httpPost } from "@services/http"
import route from "@services/route"
import moment from "moment-timezone"
import { loaderState } from "./loader"
import { triggerInfoSet } from "@reducers/map-earn-trigger-infobox"

const SET_POINT = "[mallPoint] SET_POINT"

const initialState = new MALLPOINT()

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POINT:
      return action.point
    default:
      return state
  }
}

export const getMallPoint = (id) => async (dispatch, getState) => {
  dispatch(loaderState(true))
  const { token, mallPoint } = getState()
  // if (id !== mallPoint.id) {
    let body = {
      outlet_id: id,
      tzone: {
        timezone: moment.tz.guess(),
        timedelta: moment().format("Z"),
      },
    }
    try {
      const response = await httpPost(urls.new_mission_list, JSON.stringify(body), token)
      console.log('getMallPoint',urls.new_mission_list, response)
      dispatch(setPoint(new MALLPOINT(response.body)))
      dispatch(loaderState(false))
      dispatch(triggerInfoSet(true))
      // route.navigate("MallPoint")
    } catch (e) {
      console.log(e, "getEarnPoint catch(e)")
      dispatch(loaderState(false))
    }
  // } else {
    // route.push("MallPoint")
  // }
}

export const getMallPoint2 = (id) => async (dispatch, getState) => {
  dispatch(loaderState(true))
  const { token } = getState()
    let body = {
      outlet_id: id,
      tzone: {
        timezone: moment.tz.guess(),
        timedelta: moment().format("Z"),
      },
    }
    try {
      const response = await httpPost(urls.new_mission_list, JSON.stringify(body), token)
      console.log('getMallPoint2',urls.new_mission_list, response)
      dispatch(setPoint(new MALLPOINT(response.body)))
      dispatch(loaderState(false))
      route.navigate("MallPoint")
    } catch (e) {
      console.log(e, "getEarnPoint2 catch(e)")
      dispatch(loaderState(false))
    }
}

export const setPoint = point => ({ type: SET_POINT, point })
