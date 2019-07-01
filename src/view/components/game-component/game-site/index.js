import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import { WebView } from 'react-native-webview'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import I18n from '@locales/I18n'
import { toHHMMSS } from '@services/convert-time'
import { ICONS } from '@constants/icons'
import route from '@services/route'
import { urls } from '@constants/urls'
import { httpPost } from '@services/http'
import { connect } from 'react-redux'
import styles from './styles'
import { setGameStatus } from '@reducers/game-status'
import { loaderState } from '@reducers/loader'

function GameSite({ link, timing, changeTimer, setSite, token, setGameStatus, loaderState }) {
	const [timer, setTimer] = useState(timing)
	const colors = ['#FF9950', '#F55890']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 1.0, y: 0.0 }
	let intervalId = null

	useEffect(() => {
		if (timer) {
			intervalId = setTimeout(() => {
				if (timer) {
					setTimer(timer - 1)
				} else {
					console.log('finished')
				}
			}, 1000)
		}
	}, [timer])

	const main = async () => {
		loaderState(true)
		try {
			await httpPost(urls.game_result, JSON.stringify({ status: true, ticker: true }), token)
			await clearTimeout(intervalId)
			await setGameStatus('')
			await setSite()
			await route.navigate('Main')
		} catch (error) {
			console.log(error, 'game-site main ERROR')
			loaderState(false)
		}
	}

	return (
		<View style={styles.container}>
			<LinearGradient colors={colors} start={start} end={end} style={styles.gradient}>
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
			</LinearGradient>
			<WebView style={styles.web_site} source={{ uri: link }} />
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		token: state.token,
	}
}
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setGameStatus,
			loaderState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GameSite)
