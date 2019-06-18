import React from 'react'
import { View, Dimensions } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux
import { loaderState } from '@reducers/loader'
import { playClock, stopClock, playQuestComplete, playQuestFail } from '@reducers/sounds'
import { getGameResult } from '@reducers/gameResult'
import { setSounds } from '@reducers/sounds'
//containers
import CustomButton from '@containers/custom-button/custom-button'
import GameTimer from '@containers/game-containers/game-process/game-timer'
import GameField from '@containers/game-containers/game-process/game-field'
//services
import I18n from '@locales/I18n'

import styles from './styles'

const { width } = Dimensions.get('window')

class Gamee extends React.Component {
	but = []
	state = {
		buttonActive: true,
	}

	componentDidMount() {
		this.props.loaderState(false)
	}

	submitGame = () => {
		this.props.loaderState(true)
		this.setState({ buttonActive: false })
		let answers = []
		this.but.forEach((element, index) => {
			if (element) answers.push(index + 1)
		})
		body = {
			id: this.props.gameProcess.id,
			answers: answers,
		}
		this.props.getGameResult(body)
	}

	render() {
		return (
			<View style={styles.main_view}>
				<GameTimer finished={this.submitGame} />
				<GameField showChanges={(value) => (this.but = value)} />
				<View style={styles.btn_container}>
					<CustomButton
						active={this.state.buttonActive}
						short
						gradient
						disabled={!this.state.buttonActive}
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
}

const mapStateToProps = (state) => {
	return {
		sounds: state.sounds,
		gameProcess: state.gameProcess,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			playClock,
			stopClock,
			playQuestComplete,
			playQuestFail,
			setSounds,
			getGameResult,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Gamee)
