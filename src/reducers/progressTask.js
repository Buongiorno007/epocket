import { PROGRESSTASK } from "./__proto__"
import route from "@services/route"
import { loaderState } from "./loader"
import { httpGet, httpPost } from "@services/http"
import { urls } from "@constants/urls"

const SET_PROGRESS_TASK = "[progressTask] SET_PROGRESS_TASK"
const initialState = new PROGRESSTASK()

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESS_TASK:
      return action.task
    default:
      return state
  }
}

export const getProgressTask = () => async (dispatch, getState) => {
  const { id } = getState().mallTask
  const { token } = getState()
  console.log(`${urls.task_process}?mission_id=${id}`, token, "RESULT")
  try {
    const response = await httpGet(`${urls.task_process}?mission_id=${id}`, token)
    await dispatch(setProgressTask(new PROGRESSTASK(response.body)))
    await route.push("MallProgressTask")
  } catch (e) {
    console.log(e, "EEEER")
  }
}

export const checkQr = text => async dispatch => {
  const { token } = getState()
  dispatch(loaderState(true))
  body = {
    qrCode: text,
  }
  try {
    const response = await httpPost(urls.task_process, JSON.stringify(body), token)
    console.log(response, "RESPONSE checkQr")
    dispatch(loaderState(false))
  } catch (e) {
    console.log(e, "EEEER checkQr")
    dispatch(loaderState(false))
  }
}

export const setProgressTask = task => ({ type: SET_PROGRESS_TASK, task })
