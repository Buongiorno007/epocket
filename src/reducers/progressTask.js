import { PROGRESSTASK } from "./__proto__"
import route from "@services/route"
import { loaderState } from "./loader"
import { httpGet, httpPost, httpPut } from "@services/http"
import { urls } from "@constants/urls"
import { serializeJSON } from "@services/serialize-json"
import { socialPost } from "@services/post-to-social"
import { setImage } from './image'
import { Alert} from 'react-native'

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
    console.log(response, "RESPONSE getProgressTask")
    await dispatch(setProgressTask(new PROGRESSTASK(response.body)))
    await route.push("MallProgressTask")
  } catch (e) {
    console.log(e, "EEEER")
  }
}

export const checkQr = (text, setMarker) => async (dispatch, getState) => {
  const { id } = getState().mallTask
  const { token } = getState()
  dispatch(loaderState(true))
  body = JSON.stringify({
    qrCode: text,
    mission_id: Number(id),
  })
  try {
    const response = await httpPost(urls.task_process, body, token)
    console.log(urls.task_process, response, "RESPONSE checkQr POST")
    await response.body.message || response.body.end ? (console.log('zz')) : (
      Alert.alert(
        //title
        'Hello',
        //body
        'You scanned wrong QR Code',
        [
          {text: 'Forgive me, I`ll scann again', onPress: () => setMarker(true)},
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      )
    )
    await response.body.next ? await dispatch(setProgressTask(new PROGRESSTASK(response.body.next))) : await dispatch(setProgressTask(new PROGRESSTASK(response.body)))
    dispatch(loaderState(false))
  } catch (e) {
    console.log(e, "EEEER checkQr")
    dispatch(loaderState(false))
  }
}

export const createPost = ref => async (dispatch, getState) => {
  const { token, mallPoint, mallTask } = getState()
  dispatch(loaderState(true))
  const options = {
    quality: 0.5,
    base64: true,
    fixOrientation: true,
    forceUpOrientation: true,
    width: 500,
    height: 500,
  }
  const data = await ref.takePictureAsync(options)
  // console.log(data, 'takepicdata')
  body = {
    photo: "data:image/jpeg;base64, " + data.base64,
    outlet_id: mallPoint.id,
    mission_id: mallTask.id,
    device: true,
  }
  await dispatch(setImage(body.photo))
  try {
    const response = await httpPost(urls.insta_upload_photo, serializeJSON(body), token, true)
    // await dispatch(loaderState(false))
    return { ...response.body }
  } catch (e) {
    console.log(e, "EEE takePicture")
    await dispatch(loaderState(false))
    await route.popToTop()
    return {}
  }
}

export const photoPosted = (postData, setPostData) => async (dispatch, getState) => {
  const { token, insta_token, mallTask } = getState()
  dispatch(loaderState(true))
  body = JSON.stringify({
    insta: true,
    // end: true,
    mission_id: Number(mallTask.id),
  })
  if (insta_token) {
    socialPost(
      postData,
      async () => {
        dispatch(loaderState(false))
        console.log(urls.task_process, body, token, "PUT")
        await dispatch(setImage("")) 
        try {
          const response = await httpPut(urls.task_process, body, token)
          await dispatch(setProgressTask(new PROGRESSTASK(response.body)))
          console.log(urls.task_process, response, "success response PUT")
        } catch (e) {
          console.log(e, "ER photoPosted")
        }
      },
      () => {
        dispatch(loaderState(false))
      },
    )
    setPostData({})
  } else {
    route.navigate("ProfileSettings")
  }
}

export const finishMission = () => async (dispatch, getState) => {
  const { id } = getState().mallTask
  const { token } = getState()
  body = JSON.stringify({
    mission_id: Number(id),
  })
  try {
    const response = await httpPut(urls.task_process, body, token)
    console.log(urls.task_process, response, "RESPONSE finishMission PUT")
    // await route.popToTop()
    route.popToTop()
  } catch (e) {
    console.log(e, "EEEER checkQr")
  }
}

export const setProgressTask = task => ({ type: SET_PROGRESS_TASK, task })
