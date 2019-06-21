import React, { useState, useEffect } from 'react'
import { View, WebView, Image } from 'react-native'
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
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import Partners from '../../../containers/game-containers/game-partners/partners-view'

function GamePartners({ gameResult, timing, setSite, changeTimer }) {
	const [timer, setTimer] = useState(timing)
	const colors = ['#770CE1', '#D629C5', '#F55890', '#FF8D50', '#F7BB42']
	const start = { x: 1.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

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
				<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.MORE_GAMES')}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/playful.gif')} />
				<Partners />
			</LinearGradient>
			<FooterNavigation />
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameResult: state.gameResult,
	}
}

export default connect(mapStateToProps)(GamePartners)
