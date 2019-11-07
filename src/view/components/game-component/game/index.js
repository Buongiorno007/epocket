import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from "native-base"
import { connect } from 'react-redux'
//reducers
import { loaderState } from '@reducers/loader'
import { getGameResult } from '@reducers/gameResult'
//containers
import CustomButton from '@containers/custom/custom-button/custom-button'
import GameTimer from '@containers/game-containers/game-process/game-timer'
import GameField from '@containers/game-containers/game-process/game-field'
//locales
import I18n from '@locales/I18n'
//styles
import styles from './styles'
import route from '@services/route'

function Gamee({ gameProcess, gameStart, dispatch }) {
	const [but, setBut] = useState([])
	const [buttonActive, setButtonActive] = useState(true)

	useEffect(() => {
		dispatch(loaderState(false))
	}, [])

	submitGame = () => {
		dispatch(loaderState(true))
		setButtonActive(false)
		let answers = []
		but.forEach((element, index) => {
			if (element) answers.push(index + 1)
		})
		body = {
			id: gameProcess.id,
			answers: answers,
		}
		dispatch(getGameResult(body))
	}

	return (
		<View style={styles.main_view}>
			<View style={styles.exitContainer}>
				<View style={styles.game_aval}>
					<Text style={styles.game_aval_t}>{`${gameStart.available_game_len} ` + I18n.t('GAME.GAMES_FOR_TODAY')}</Text>
				</View>
				<Button style={styles.buttonExit} onPress={() => {submitGame()}}>
					<Image source={require('@assets/img/close.png')} style={{width: 20, height: 20}}/>
				</Button>
			</View>
			<GameTimer finished={this.submitGame} />			
			<GameField showChanges={(value) => setBut(value)} />
			<View style={styles.btn_container}>
				{/* <CustomButton
					active={buttonActive}
					gradient
					disabled={!buttonActive}
					title={I18n.t('GAME.CONFIRM').toUpperCase()}
					color={'#fff'}
					handler={this.submitGame}
				/> */}
				<Button full rounded style={[styles.button]} onPress={this.submitGame} disabled={!buttonActive}>
					<Text style={[styles.text]}>
						{I18n.t('GAME.CONFIRM').toUpperCase()}
					</Text>
				</Button>				
			</View>			
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		gameProcess: state.gameProcess,
		gameStart: state.gameStart,
	}
}

export default connect(mapStateToProps)(Gamee)
