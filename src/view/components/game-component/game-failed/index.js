import React, { useState, useEffect } from 'react'
import { View, Image, Platform } from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles'
import GameSite from '@components/game-component/game-site'
import FailedButtons from '@containers/game-containers/game-result/game-failed-buttons'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import I18n from '@locales/I18n'
import { toHHMMSS } from '@services/convert-time'
import route from '@services/route'
import { postToSocial } from '@services/post-to-social'
import { setTabState } from '@reducers/tabs'
import { checkPostStatus } from '@reducers/post-status'

function GameFailed({ gameResult, insta_token, setTabState, checkPostStatus }) {
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
					route.navigate('Main')
				}
			}, 1000)
		}
	})

	shareToInsta = () => {
		if (Platform.OS === 'ios') {
			postToSocial(gameResult, 'https://www.instagram.com/epocketapp/', this.confirmPost, gameResult.video)
		} else {
			postToSocial(gameResult.insta_img, 'https://www.instagram.com/epocketapp/', this.confirmPost)
		}
	}

	confirmPost = () => {
		if (gameResult.game_id) {
			setTimeout(() => {
				checkPostStatus()
			}, 5000)
		}
	}

	const publish = async () => {
		if (insta_token) {
			this.shareToInsta()
		} else {
			await setTabState(3)
			await route.navigate('ProfileSettings')
		}
	}
	const visitSite = () => {
		setSite(!site)
	}
	const wait = () => {
		setTicker(!ticker)
	}

	console.log(insta_token, 'INSTATOKEN')

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
				<FailedButtons ticker={ticker} publish={() => publish} visitSite={() => visitSite} wait={() => wait} />
			</View>
			{site && (
				<GameSite
					timing={visitSiteTimer}
					changeTimer={(value) => setVisitSiteTimer(value)}
					setSite={() => setSite(!site)}
					link={gameResult.link}
				/>
			)}
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameResult: state.gameResult,
		insta_token: state.insta_token,
	}
}
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setTabState,
			checkPostStatus,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GameFailed)
