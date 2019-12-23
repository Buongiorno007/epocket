import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import { WebView } from 'react-native-webview'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
//reducers
import { setGameStatus } from '@reducers/game-status'
import { getGameStart } from "@reducers/gameStart"
import { loaderState } from '@reducers/loader'
//services
import { toHHMMSS } from '@services/convert-time'
import route from '@services/route'
import { httpPost } from '@services/http'
//constants
import { ICONS } from '@constants/icons'
import { urls } from '@constants/urls'
//locales
import I18n from '@locales/I18n'
//styles
import styles from './styles'

function GameSite({ link, timing, changeTimer = () => {}, setSite, token, dispatch }) {
	const [timer, setTimer] = useState(timing)
	const colors = ['#FF9950', '#F55890']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 1.0, y: 0.0 }
	let intervalId = null

	useEffect(() => {
		if (timer) {
			intervalId = setTimeout(() => {
				setTimer(timer - 1)
			}, 1000)
		}
	}, [timer])

	const main = async () => {
		dispatch(loaderState(true))
		try {
			await httpPost(urls.game_result, JSON.stringify({ status: true, ticker: true }), token)
			await clearTimeout(intervalId)
			await dispatch(setGameStatus(''))
			await setSite()
			await getGameStart()
			await dispatch(loaderState(false))
			await route.navigate('Gamepage')
			// await route.navigate('Main')
		} catch (error) {
			console.log(error, 'game-site main ERROR')
			dispatch(loaderState(false))
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.gradient}>
				<FastImage
					style={styles.icon}
					resizeMode={FastImage.resizeMode.contain}
					source={{
						uri: ICONS.COMMON.CASH_EPC_WHITE,
					}}
				/>
				{timer ? (
					<View style={styles.timer}>
						<Text style={styles.timer_text}>{toHHMMSS(timer)}</Text>
					</View>
				) : (
					<Button style={styles.button} onPress={main}>
						<Text style={styles.button_text}>{I18n.t('GAME.RESULT.CONTINUE_PLAY').toUpperCase()}</Text>
					</Button>
				)}
				{timer ? (
					<Button
						rounded
						transparent
						block
						style={styles.icon}
						onPress={() => {
							clearTimeout(intervalId)
							changeTimer(timer)
							setSite()
						}}
					>
						<FastImage
							style={styles.icon_img}
							resizeMode={FastImage.resizeMode.contain}
							source={{
								uri: ICONS.COMMON.CLOSE_WHITE,
							}}
						/>
					</Button>
				) : (
					<FastImage
						style={styles.icon}
						resizeMode={FastImage.resizeMode.contain}
						source={require('@assets/img/zifi/playful.gif')}
					/>
				)}
			</View>
			<WebView style={styles.web_site} source={{ uri: link }} />
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps)(GameSite)
