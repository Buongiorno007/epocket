import { MISSIONSTATE } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpPost } from '@services/http'
//reducers
import { Toast } from 'native-base'
import { getPoints } from '@reducers/mapPoints'

const SET_MISSION_RADIUS = '[missionState] SET_MISSION_RADIUS'
const SET_MISSION_TIMER = '[missionState] SET_MISSION_TIMER'
const SET_MISSION_FAIL_TIMER = '[missionState] SET_MISSION_FAIL_TIMER'
const SET_MISSION_PROCESS = '[missionState] SET_MISSION_PROCESS'
const SET_MISSION_EXPIRED = '[missionState] SET_MISSION_EXPIRED'
const SET_MISSION = '[missionState] SET_MISSION'
const RESET_MISSION = '[missionState] RESET_MISSION'

const initialState = new MISSIONSTATE()

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MISSION_RADIUS:
      return Object.assign({}, { ...state, inRadius: action.radius })
    case SET_MISSION_TIMER:
      return Object.assign({}, { ...state, timer: action.timer })
    case SET_MISSION_FAIL_TIMER:
      return Object.assign({}, { ...state, failTimer: action.failTimer })
    case SET_MISSION_PROCESS:
      return Object.assign({}, { ...state, process: action.process })
    case SET_MISSION_EXPIRED:
      return Object.assign({}, { ...state, expired: true })
    case SET_MISSION:
      return action.mission
    case RESET_MISSION:
      return initialState
    default:
      return state
  }
}

export const checkMission = id => async (dispatch, getState) => {
  const { outletId, inRadius, process, expired } = getState().missionState
  !inRadius && (await dispatch(setMissionRadius(true)))
  //   console.log(id, outletId, process, 'CHECKPROPS')
  if ((id !== outletId || !process) && !expired) {
    await dispatch(getMission(id))
  }
}
export const finishMissionState = () => async (dispatch, getState) => {
  const { expired } = getState().missionState
  if (expired) {
    dispatch(resetMission())
  } else {
    dispatch(setMissionRadius(false))
  }
}

export const getMission = id => async (dispatch, getState) => {
  const { token } = getState()
  let body = {
    outlet_id: id,
  }
  try {
    const response = await httpPost(urls.start_mission, JSON.stringify(body), token)
    console.log(response, 'RESPONSE')
    await dispatch(setMission(new MISSIONSTATE(response.body)))
  } catch (e) {
    console.log(e, 'checkMission')
    if (e.code === 415) {
      await dispatch(setMission(new MISSIONSTATE(e.body)))
    } else if (e.code === 418) {
      await dispatch(setMissionExpired())
    }
  }
}

export const missionResult = () => async (dispatch, getState) => {
  const { token } = getState()
  const { timer, failTimer, outletId, missionId } = getState().missionState
  let body = {
    outlet_id: outletId,
    mission_id: missionId,
  }
  if (!timer) {
    Toast.show({
      text: 'Миссия завершена',
      buttonText: 'ok',
      duration: 10000,
      onClose: () => {},
    })
    try {
      const response = await httpPost(urls.finish_mission, JSON.stringify(body), token)
    } catch (e) {
      console.log(e, 'missionResult e')
    }

    await dispatch(setMission(new MISSIONSTATE({ inRadius: true })))
    await dispatch(getPoints())
  } else if (!failTimer) {
    await dispatch(resetMission())
  }
}

export const setMission = mission => ({ type: SET_MISSION, mission })
export const setMissionExpired = () => ({ type: SET_MISSION_EXPIRED })
export const setMissionProcess = process => ({ type: SET_MISSION_PROCESS, process })
export const setMissionRadius = radius => ({ type: SET_MISSION_RADIUS, radius })
export const setMissionTimer = timer => ({ type: SET_MISSION_TIMER, timer })
export const setMissionFailtTimer = failTimer => ({ type: SET_MISSION_FAIL_TIMER, failTimer })
export const resetMission = () => ({ type: RESET_MISSION })
