import { MALLPOINT } from "./__proto__"
import { urls } from "@constants/urls"
import { httpPost } from "@services/http"
import route from "@services/route"
import moment from "moment-timezone"

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

export const getMallPoint = id => async (dispatch, getState) => {
  const { token, mallPoint } = getState()
  if (id !== mallPoint.id) {
    let body = {
      outlet_id: id,
      tzone: {
        timezone: moment.tz.guess(),
        timedelta: moment().format("Z"),
      },
    }
    try {
      const response = await httpPost(urls.new_mission_list, JSON.stringify(body), token)
      dispatch(setPoint(new MALLPOINT(response.body)))
      route.push("MallPoint")
    } catch (e) {
      console.log(e, "getEarnPoint catch(e)")
    }
  } else {
    route.push("MallPoint")
  }
}

export const setPoint = point => ({ type: SET_POINT, point })
