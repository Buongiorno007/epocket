import React from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from '@containers/start/logo'
import Navigate from '@containers/start/navigate'
import { list } from '@reducers/country'
import { internet } from '@reducers/connection'
import { status, current, coordinate } from '@reducers/location'
import { setSounds } from '@reducers/sounds'
import { getUser } from '@reducers/profile-state'
import { setGameStatus } from '@reducers/game-status'
import { loaderState } from '@reducers/loader'
import styles from './styles'

type Props = typeof defaultProps

const defaultProps = {
	colors: ['#F4F9FF', '#E0EFFF'],
	start: { x: 0.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class Start extends React.Component<Props> {
	static defaultProps = defaultProps

	componentDidMount() {
		this.props.internet()
		this.props.connection && this.init()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.connection !== this.props.connection && this.props.connection) {
			this.init()
		}
	}

	init = async () => {
		await this.props.loaderState(true)
		await this.props.setSounds()
		await this.props.current()
		await this.props.status()
		await this.props.coordinate()
		await this.getGame()
		await this.getToken()
	}

	getGame = async () => {
		const game = await AsyncStorage.getItem('game_status')
		if (game) {
			this.props.setGameStatus(game === 'game' || game === 'success' ? 'start' : game)
		}
	}

	getToken = async () => {
		const token = await AsyncStorage.getItem('token')
		if (token) {
			this.props.getUser(token)
		} else {
			this.props.list()
		}
	}

	render = () => {
		const { colors, start, end } = this.props
		return (
			<View style={[styles.layout, styles.align]}>
				<LinearGradient colors={colors} start={start} end={end} style={[styles.layout, styles.padding]}>
					<Logo />
					<Navigate />
				</LinearGradient>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	connection: state.connection,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			list,
			internet,
			status,
			coordinate,
			setSounds,
			setGameStatus,
			getUser,
			loaderState,
			current,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Start)
