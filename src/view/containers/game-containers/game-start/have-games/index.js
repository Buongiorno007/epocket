import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'
import route from '@services/route'
import styles from './styles'
import CustomButton from '@containers/custom/custom-button/custom-button'
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
			<TouchableOpacity style={[styles.game_aval]} onPress={() => {route.navigate('Main')}}>
				{/* <Text style={styles.game_aval_t}>{`${gameStart.available_game_len}/${gameStart.games_count} ` + I18n.t('GAME.GAMES_FOR_TODAY')}</Text> */}
				<Image style={styles.game_aval_img} source={require('@assets/img/arrow-black-left.png')} resizeMode={'contain'} />
				<Text style={styles.game_aval_t}>{`${gameStart.available_game_len} ` + I18n.t('GAME.GAMES_FOR_TODAY')}</Text>
				<Image style={styles.game_aval_img} source={require('@assets/img/close_black.png')} resizeMode={'contain'} />
			</TouchableOpacity>
			<View>
				<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.PLAYFUL')}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/playful.gif')} />
				<Text style={styles.game_cost_text}>
					{I18n.t('GAME.GAME_COST', { currency: profileState.currency, value: gameStart.award })}
				</Text>
				<Text style={styles.game_desc_text}>{I18n.t('GAME_DESCR')}</Text>
			</View>
			{/* <CustomButton
				active={true}
				style={{ marginBottom: 16 }}
				gradient
				title={I18n.t('GAME.START').toUpperCase()}
				color={'#ffffff'}
				handler={game}
			/> */}
			<Button full rounded style={[styles.button]} onPress={game}>
				<Text style={[styles.button_t]}>
					{I18n.t('GAME.START').toUpperCase()}
				</Text>
			</Button>
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
