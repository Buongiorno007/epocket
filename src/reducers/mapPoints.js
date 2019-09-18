import { MAPPOINTS } from "./__proto__"
//constants
import { urls } from "@constants/urls"
//services
import { httpPost } from "@services/http"
//reducers
import moment from "moment-timezone"
import route from "@services/route"

const SET_POINTS = "[mapPoints] SET_POINTS"
const SET_FILTERS = "[mapPoints] SET_FILTERS"

const initialState = new MAPPOINTS()

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POINTS:
      return action.points
    case SET_FILTERS:
      return Object.assign({}, { ...state, filters: action.filters })
    default:
      return state
  }
}

export const getPoints = () => async (dispatch, getState) => {
  const { token } = getState()
  const { lat, lng } = getState().location.coordinate

  body = JSON.stringify({
    geolocation_status: lat !== 0 && lng !== 0,
    lat: lat,
    lng: lng,
    tzone: {
      timezone: moment.tz.guess(),
      timedelta: moment().format("Z"),
    },
  })
  if (lat || lng) {
    try {
      const response = await httpPost(urls.outlets, body, token)
      dispatch(savePoints(new MAPPOINTS(response.body)))
    } catch (error) {
      console.log(error, "getPoints ERROR")
    }
  }
}

export const useFilters = body => async (dispatch, getState) => {
  const { token } = getState()
  const { lat, lng } = getState().location.coordinate

  const obj = {
    type: "",
    filters: [],
    lat,
    lng,
  }

  await body.forEach(element => {
    if (element.checked === true) {
      obj.type = element.id
      if (element.data) {
        element.data.forEach(item => item.checked && obj.filters.push(item.id))
      }
    }
  })

  try {
    const response = await httpPost(urls.filters, JSON.stringify(obj), token)
    await dispatch(saveFilters(body))
    route.pop()
    console.log(response, "RESPONSE ON FILTERS")
  } catch (e) {
    console.log(e, "RRRR")
  }
}

export const saveFilters = filters => ({ type: SET_FILTERS, filters })
export const savePoints = points => ({ type: SET_POINTS, points })
