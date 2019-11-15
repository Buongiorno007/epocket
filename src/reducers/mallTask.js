import { MALLTASK } from "./__proto__"
import route from "@services/route"
import { getProgressTask } from "@reducers/progressTask"

const SET_MALL_TASK = "[mallTask] SET_MALL_TASK"
const initialState = new MALLTASK()

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MALL_TASK:
      return action.task
    default:
      return state
  }
}

export const getMallTask = item => async dispatch => {
  console.log(item, 'getMallTask')
  try {
    await dispatch(setMallTask(new MALLTASK(item)))
    item.name ? await route.push("MallTask") : null
    // await route.push("MallTask")
  } catch (e) {
    console.log("getMallTask can'tDispatch")
  }
}

export const setMallTask = task => ({ type: SET_MALL_TASK, task })
