import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux
import { loaderState } from '@reducers/loader'
import { getGameResult } from '@reducers/gameResult'
//containers
import CustomButton from '@containers/custom-button/custom-button'
import GameTimer from '@containers/game-containers/game-process/game-timer'
import GameField from '@containers/game-containers/game-process/game-field'
//services
import I18n from '@locales/I18n'
//styles
import styles from './styles'

function Gamee({ gameProcess, loaderState, getGameResult }) {
	const [but, setBut] = useState([])
	const [buttonActive, setButtonActive] = useState(true)

	useEffect(() => {
		loaderState(false)
	}, [])

	submitGame = () => {
		loaderState(true)
		setButtonActive(false)
		let answers = []
		but.forEach((element, index) => {
			if (element) answers.push(index + 1)
		})
		body = {
			id: gameProcess.id,
			answers: answers,
		}
		getGameResult(body)
	}

	return (
		<View style={styles.main_view}>
			<GameTimer finished={this.submitGame} />
			<GameField showChanges={(value) => setBut(value)} />
			<View style={styles.btn_container}>
				<CustomButton
					active={buttonActive}
					short
					gradient
					disabled={!buttonActive}
					title={I18n.t('GAME.CONFIRM').toUpperCase()}
					color={'#fff'}
					handler={() => {
						this.submitGame()
					}}
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

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			getGameResult,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Gamee)
