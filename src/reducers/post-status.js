import { Platform } from "react-native"
//constants
import { urls } from "@constants/urls"
//redux
import { loaderState } from "./loader"
import { setTabState } from "@reducers/tabs"
//services
import route from "@services/route"
import { httpPost } from "@services/http"
import { socialPost } from "@services/post-to-social"
import { getGameStart } from "@reducers/gameStart"
import { getGameProcess } from '@reducers/gameProcess'
import { saveGameResult } from '@reducers/gameResult'
import {  GAME_RESULT } from '@reducers/__proto__'


export const checkPostStatus = () => async (dispatch, getState) => {
  const { token, gameResult } = getState()
  let body = JSON.stringify({
    game_id: gameResult.game_id,
  })
  try {
    await httpPost(urls.post_game, body, token)
    await dispatch(getGameStart())
		await dispatch(getGameProcess())
		await dispatch(loaderState(false)) 
    await route.navigate("Gamee")
    // await route.push('Gamepage')
  } catch (error) {
    console.log(error, "checkPostStatus ERROR")
    dispatch(loaderState(false))
  }
}

export const publish = () => async (dispatch, getState) => {
  const { insta_token, gameResult } = getState()
  dispatch(loaderState(true))
  if (!insta_token) {
    await dispatch(setTabState(3))
    await route.navigate("ProfileSettings")
  } else {
    await socialPost(
      gameResult,
      () => {
        dispatch(checkPostStatus())
      },
      () => {
        dispatch(loaderState(false))
      },
    )
  }
}

export const waited = () => async (dispatch, getState) => {
  const { token } = getState()
  dispatch(loaderState(true))
  try {
    await httpPost(urls.game_result, JSON.stringify({ status: true, ticker: true }), token)
    await dispatch(dispatch(saveGameResult(new GAME_RESULT())))
  } catch (error) {
    console.log(error, "waited ERROR")
  }
  await route.navigate("Main")
}
