import { PROGRESSTASK } from "./__proto__"
import route from "@services/route"

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

export const getProgressTask = item => async dispatch => {}

export const setProgressTask = task => ({ type: SET_PROGRESS_TASK, task })
