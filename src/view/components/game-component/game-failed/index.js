import React, { useState, useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
//services
import { toHHMMSS } from '@services/convert-time'
//reducers
import { publish, waited } from '@reducers/post-status'
//components
import GameSite from '@components/game-component/game-site'
//containers
import FailedButtons from '@containers/game-containers/game-result/game-failed-buttons'
//locales
import I18n from '@locales/I18n'
//styles
import styles from './styles'

function GameFailed({ gameResult, dispatch }) {
	const [timer, setTimer] = useState(gameResult.timer)
	const [ticker, setTicker] = useState(false)
	const [site, setSite] = useState(false)
	const [visitSiteTimer, setVisitSiteTimer] = useState(gameResult.timer)
	const colors = ['#9B45F0', '#D833C8', '#F55890', '#FF8D50', '#F7BB42']
	const start = { x: 1.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	useEffect(() => {
		if (ticker && timer) {
			const intervalId = setTimeout(() => {
				if (timer) {
					setTimer(timer - 1)
				} else {
					clearTimeout(intervalId)
				}
			}, 1000)
		} else if (!timer) {
			dispatch(waited())
		}
	})

	const publicToInst = () => {
		dispatch(publish())
	}
	const visitSite = () => {
		setSite(!site)
	}
	const wait = () => {
		setTicker(!ticker)
	}

	return (
		<View style={styles.container}>
			<LinearGradient colors={colors} start={start} end={end} style={styles.gradient} />
			<View style={styles.layout}>
				<View style={styles.zifi_layout}>
					<Text style={styles.zifi_text}>
						{ticker ? I18n.t('GAME.ZIFI.WAIT') : I18n.t('GAME.ZIFI.FAILED')}
					</Text>
					<Image
						style={styles.zifi}
						source={
							ticker
								? require('@assets/img/zifi/surprised.gif')
								: require('@assets/img/zifi/grimaces.gif')
						}
					/>
				</View>
				{ticker && (
					<View style={styles.timer}>
						<Text style={styles.timer_text}>{toHHMMSS(timer)}</Text>
					</View>
				)}
				<View style={styles.img_container}>
					<FastImage
						style={styles.correct}
						resizeMode={FastImage.resizeMode.contain}
						source={{ uri: gameResult.insta_img }}
					/>
				</View>
				<FailedButtons ticker={ticker} publish={publicToInst} visitSite={visitSite} wait={wait} />
			</View>
			{site && (
				<GameSite
					timing={visitSiteTimer}
					changeTimer={(value) => setVisitSiteTimer(value)}
					setSite={visitSite}
					link={gameResult.link}
				/>
			)}
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameResult: state.gameResult,
	}
}

export default connect(mapStateToProps)(GameFailed)
