import React, { useEffect } from 'react'
import { Text, Image } from 'react-native'
import { Button, View } from 'native-base'
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
import { colors } from '@constants/colors'

function GameSuccess({ profileState, gameResult, dispatch }) {
	useEffect(() => {
		dispatch(loaderState(false))
	}, [])

	const navigate = () => {
		dispatch(loaderState(true))
		route.navigate('Main')
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.SHOCKED')}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/shocked.gif')} />
				<Text style={styles.title}>
					{I18n.t('GAME.CONGRATULATION')}
					<Text style={styles.red}>{`${gameResult.award} ${profileState.currency}`}</Text>
				</Text>
			</View>
			<Button full rounded style={styles.button} onPress={navigate}>
				<Text uppercase style={[styles.text]}>
					{I18n.t('GAME.RESULT.CONTINUE').toUpperCase()}
				</Text>
			</Button>
		</View>
	)
}

const mapStateToProps = (state) => ({
	profileState: state.profileState,
	gameResult: state.gameResult,
})

export default connect(mapStateToProps)(GameSuccess)
