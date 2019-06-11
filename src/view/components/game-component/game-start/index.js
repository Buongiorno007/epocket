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

type Props = typeof defaultProps
type State = typeof initialState

const defaultProps = {
	colors: ['#FF9950', '#F55890'],
	start: { x: 0.0, y: 0.0 },
	end: { x: 1.0, y: 0.0 },
}
const initialState = {
	currency: 'UAH',
}

class GameStart extends React.Component<Props, State> {
	static defaultProps = defaultProps
	state = initialState

	componentDidMount() {
		this.props.loaderState(true)
		const { profileState, location, token } = this.props
		this.setState({
			currency: profileState.currency || 'UAH',
		})
		this.props.getGameStart(location.lat, location.lng, token)
	}

	render = () => {
		const { gameStart, colors, start, end } = this.props
		return (
			<View style={styles.container}>
				{gameStart.id ? (
					<HaveGames gameStart={gameStart} currency={this.state.currency} />
				) : (
					<NoGames currency={this.state.currency} />
				)}
				<FooterNavigation />
			</View>
		)
	}
}
//
const mapStateToProps = (state) => {
	return {
		token: state.token,
		location: state.location.coordinate,
		profileState: state.profileState,
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
