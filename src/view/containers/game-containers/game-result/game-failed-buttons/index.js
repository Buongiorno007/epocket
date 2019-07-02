import React, { useState, useEffect } from 'react'
import { View, ImageBackground } from 'react-native'
import { Button, Text } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import styles from './styles'
import I18n from '@locales/I18n'
import route from '@services/route'
import { toHHMMSS } from '@services/convert-time'
import FastImage from 'react-native-fast-image'

function GameFailedButtons({ gameResult, ticker, visitSite, wait, publish }) {
	const colors = ['#FF9950', '#F55890']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 1.0, y: 0.0 }

	return (
		<View style={styles.container}>
			<Button full rounded style={styles.button} onPress={publish}>
				<LinearGradient colors={colors} start={start} end={end} style={styles.gradient}>
					<FastImage
						style={styles.insta_logo}
						resizeMode={FastImage.resizeMode.contain}
						source={require('@assets/instagram-logo.png')}
					/>
					<Text uppercase style={styles.button_text}>
						{I18n.t('GAME.PUBLISH_AND_CONTINUE')}
					</Text>
				</LinearGradient>
			</Button>
			{!ticker &&
				(gameResult.link ? (
					<Button full rounded style={styles.button_white} onPress={visitSite}>
						<Text uppercase style={styles.button_white_text}>
							{I18n.t('GAME.VISIT_WEBSITE')}
						</Text>
					</Button>
				) : (
					<Button full rounded style={styles.button_white} onPress={wait}>
						<Text uppercase style={styles.button_white_text}>
							{gameResult.timer > 60
								? I18n.t('GAME.WAIT_MIN', { value: toHHMMSS(gameResult.timer) })
								: I18n.t('GAME.WAIT_SEC', { value: gameResult.timer })}
						</Text>
					</Button>
				))}
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameResult: state.gameResult,
	}
}

export default connect(mapStateToProps)(GameFailedButtons)
