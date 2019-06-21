import React, { useState, useEffect } from 'react'
import { View, WebView } from 'react-native'
import { Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles'
import FailerButtons from '@containers/game-containers/game-result/game-failed-buttons'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import I18n from '@locales/I18n'
import { toHHMMSS } from '@services/convert-time'
import { ICONS } from '@constants/icons'
import route from '@services/route'

function GameSite({ gameResult, timing, setSite, changeTimer }) {
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
	})

	const main = () => route.navigate('Main')

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
			<WebView style={styles.container} source={{ uri: gameResult.link }}></WebView>
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameResult: state.gameResult,
	}
}

export default connect(mapStateToProps)(GameSite)
