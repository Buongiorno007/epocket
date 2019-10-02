import { PROGRESSTASK } from "./__proto__"
import route from "@services/route"
import { loaderState } from "./loader"

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
  console.log(id, "ID")
  route.push("MallProgressTask")
}

export const checkQr = text => async dispatch => {
  dispatch(loaderState(true))
  console.log(text, "ICOMETEXT")
  setTimeout(() => dispatch(loaderState(false)), 1500)
}

export const setProgressTask = task => ({ type: SET_PROGRESS_TASK, task })
