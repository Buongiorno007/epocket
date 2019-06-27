import React from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'
import route from '@services/route'
import styles from './styles'
import CustomButton from '@containers/custom-button/custom-button'
import { getGameProcess } from '@reducers/gameProcess'
import { bindActionCreators } from 'redux'
import { loaderState } from '@reducers/loader'

const HaveGames = ({ profileState, gameStart, loaderState, getGameProcess }) => {
	const game = async () => {
		await loaderState(true)
		await getGameProcess()
		route.navigate('Gamee')
	}
	return (
		<View style={styles.grad}>
			<Text>{`${gameStart.available_game_len}/${gameStart.games_count} ` + I18n.t('GAME.GAMES_FOR_TODAY')}</Text>
			<View>
				<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.PLAYFUL')}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/playful.gif')} />
				<Text style={styles.game_cost_text}>
					{I18n.t('GAME.GAME_COST', { currency: profileState.currency, value: gameStart.award })}
				</Text>
			</View>
			<CustomButton
				active={true}
				short
				style={{ marginBottom: 16 }}
				gradient
				title={I18n.t('GAME.START').toUpperCase()}
				color={'#ffffff'}
				handler={game}
			/>
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
		gameStart: state.gameStart,
	}
}
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			getGameProcess,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HaveGames)