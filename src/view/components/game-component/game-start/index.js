import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux
import { setGameStatus } from '@reducers/game-status'
import { loaderState } from '@reducers/loader'
import { getGameStart } from '@reducers/gameStart'
//constants
import { colors } from '@constants/colors'
//containers
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import HaveGames from '@containers/game-containers/game-start/have-games'
import NoGames from '@containers/game-containers/game-start/no-games'
//styles
import styles from './styles'

class GameStart extends React.Component {
	componentDidMount() {
		this.props.loaderState(true)
		this.props.getGameStart()
	}

	render = () => {
		const { gameStart } = this.props
		return (
			<View style={styles.container}>
				{gameStart.id ? <HaveGames /> : <NoGames />}
				<FooterNavigation />
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		gameStart: state.gameStart,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setGameStatus,
			loaderState,
			getGameStart,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GameStart)
