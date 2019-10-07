import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
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

function Gamee({ gameProcess, dispatch }) {
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
			<GameTimer finished={this.submitGame} />
			<GameField showChanges={(value) => setBut(value)} />
			<View style={styles.btn_container}>
				<CustomButton
					active={buttonActive}
					gradient
					disabled={!buttonActive}
					title={I18n.t('GAME.CONFIRM').toUpperCase()}
					color={'#fff'}
					handler={this.submitGame}
				/>
			</View>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		gameProcess: state.gameProcess,
	}
}

export default connect(mapStateToProps)(Gamee)
