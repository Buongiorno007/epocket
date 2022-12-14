import { PROGRESSTASK, MALLPOINT, MALLTASK } from "./__proto__"
import route from "@services/route"
import { loaderState } from "./loader"
import { httpGet, httpPost, httpPut } from "@services/http"
import { urls } from "@constants/urls"
import { serializeJSON } from "@services/serialize-json"
import { socialPost } from "@services/post-to-social"
import { setImage } from './image'
import { Alert} from 'react-native'
import RNFS from "react-native-fs"
import ImageEditor from "@react-native-community/image-editor"
import { getMallTask } from "@reducers/mallTask"
import { setMallTask } from "@reducers/mallTask"
import { setPoint } from "@reducers/mallPoint"

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

export const getInstaPost = (mission_id, outlet_id) => async (dispatch, getState) => {
  // const { id } = getState().mallTask
  const { token } = getState()
  console.log(`${urls.task_process}?mission_id=${mission_id}`, token, "getInstaPost")
  try {
    const response = await httpGet(`${urls.task_process}?mission_id=${mission_id}`, token)
    console.log(response, "RESPONSE getInstaPost")
    await dispatch(setPoint(new MALLPOINT({id : outlet_id})))
    await dispatch(setMallTask(new MALLTASK({id : mission_id})))
    await dispatch(setProgressTask(new PROGRESSTASK(response.body)))
    await route.push("MallProgressTask")
  } catch (e) {
    console.log(e, "EEEER")
  }
}

export const checkQr = (text, setMarker) => async (dispatch, getState) => {
  const { id } = getState().mallTask
  const { token } = getState()
  const { cln } = getState().progressTask
  dispatch(loaderState(true))
  body = JSON.stringify({
    cln,
    qrCode: text,
    mission_id: Number(id),
  })
  try {
    const response = await httpPost(urls.task_process, body, token)
    console.log(urls.task_process, response, "RESPONSE checkQr POST")
    await response.body.message || response.body.end ? (console.log('QR OK')) : (
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
    response.body.message === "ok" && setMarker(true)
    dispatch(loaderState(false))
  } catch (e) {
    console.log(e, "EEEER checkQr")
    dispatch(loaderState(false))
    setMarker(true)
  }
}

export const createPost = (ref) => async (dispatch, getState) => {
  const { token, mallPoint, mallTask } = getState()
  const { cln, id } = getState().progressTask
  dispatch(loaderState(true))
  const options = {
    quality: 0.5,
    base64: true,
    fixOrientation: true,
    forceUpOrientation: true,
    // width: 1080,
    // height: 1080,
  }
  const data = await ref.takePictureAsync(options)
  // console.log(data, 'takepicdata')
  cropData = {
    // offset:{ x: (data.width-1080) / 2, y: (data.height-1080) / 2 },
    // size:{ width: 1080, height: 1080 },
    offset:{ x: 0, y: (data.height - data.width) / 2 },
    size:{ width: data.width, height: data.width },
  //  displaySize:{width:1080, height:1080}, //THESE 2 ARE OPTIONAL. 
  //  resizeMode:'contain', 
  }
  const croppedImage = await ImageEditor.cropImage(data.uri, cropData)
  const toBase64 = await RNFS.readFile(croppedImage, 'base64')
  // console.log('croppedImage', croppedImage)
  // console.log('toBase64', toBase64)
  // console.log('data.base64', data.base64)
  body = {
    cln,
    sub_id: id,
    photo: "data:image/jpeg;base64, " + toBase64,
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
    await dispatch(getInstaList())
    await dispatch(loaderState(false))
    await route.popToTop()
    return {}
  }
}

export const photoPosted = (postData, setPostData) => async (dispatch, getState) => {
  const { token, insta_token, mallTask } = getState()
  const { cln } = getState().progressTask
  dispatch(loaderState(true))
  body = JSON.stringify({
    cln,
    insta: true,
    // end: true,
    mission_id: Number(mallTask.id),
  })
  if (insta_token) {
    socialPost(
      postData,
      async () => {
        // console.log(urls.task_process, body, token, "PUT")
        await dispatch(setImage(""))
        await setPostData({})
        try {
          const response = await httpPut(urls.task_process, body, token)
          await response.body.token && !response.body.token? (
            Alert.alert(
              //title
              'Hello',
              //body
              'You need to reconnect to Instagram',
              [
                {text: 'OK', onPress: () => route.navigate("ProfileSettings")},
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            )  
          ) : await dispatch(setProgressTask(new PROGRESSTASK(response.body)))
          await dispatch(loaderState(false))
          console.log(urls.task_process, response, "success response PUT")
        } catch (e) {
          console.log(e, "ER photoPosted")
        }
      },
      () => {
        dispatch(loaderState(false))
      },
    )
  } else {
    route.navigate("ProfileSettings")
  }
}

export const finishMission = () => async (dispatch, getState) => {
  const { id } = getState().mallTask
  const { token } = getState()
  const { cln } = getState().progressTask
  body = JSON.stringify({
    cln,
    mission_id: Number(id),
  })
  try {
    const response = await httpPut(urls.task_process, body, token)
    console.log(urls.task_process, response, "RESPONSE finishMission PUT")
    await dispatch(getInstaList())
    await route.popToTop()
  } catch (e) {
    console.log(e, "EEEER checkQr")
  }
}

export const getInstaList = () => async (dispatch, getState) => {
  const { id } = getState().mallTask
  const { token } = getState()
  const { cln } = getState().progressTask
  dispatch(loaderState(true))
  try {
    const response = await httpGet(urls.inspa_single, token)
    console.log(urls.inspa_single, response, "RESPONSE getInstaList Get")
    let data = {
      tasks : response.body.data,
    }
    await dispatch(getMallTask(data))
    dispatch(loaderState(false))
  } catch (e) {
    console.log(e, "EEEER getInstaList")
    dispatch(loaderState(false))
  }
}

export const setProgressTask = task => ({ type: SET_PROGRESS_TASK, task })