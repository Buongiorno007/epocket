import React, { useEffect } from 'react'
import { Text, Image } from 'react-native'
import { Button } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
//reducers
import { loaderState } from '@reducers/loader'
//services
import route from '@services/route'
//locales
import I18n from '@locales/I18n'
//styles
import styles from './styles'

function GameSuccess({ profileState, gameResult, dispatch }) {
	const colors = ['#770CE1', '#D629C5', '#F55890', '#FF8D50', '#F7BB42']
	const start = { x: 1.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	useEffect(() => {
		dispatch(loaderState(false))
	}, [])

	const navigate = () => {
		loaderState(true)
		route.navigate('Main')
	}

	return (
		<LinearGradient colors={colors} start={start} end={end} style={styles.container}>
			<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.SHOCKED')}</Text>
			<Image style={styles.zifi} source={require('@assets/img/zifi/shocked.gif')} />
			<Text style={styles.title}>
				{I18n.t('GAME.CONGRATULATION', { value: gameResult.award, currency: profileState.currency })}
			</Text>
			<Button full rounded style={styles.button} onPress={navigate}>
				<Text uppercase style={[styles.text]}>
					{I18n.t('GAME.RESULT.CONTINUE')}
				</Text>
			</Button>
		</LinearGradient>
	)
}

const mapStateToProps = (state) => ({
	profileState: state.profileState,
	gameResult: state.gameResult,
})

export default connect(mapStateToProps)(GameSuccess)
