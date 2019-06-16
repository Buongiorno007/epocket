import React from 'react'
import { Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loaderState } from '@reducers/loader'
import route from '@services/route'
import styles from './styles'
import I18n from '@locales/I18n'

type Props = typeof defaultProps

const defaultProps = {
	colors: ['#770CE1', '#D629C5', '#F55890', '#FF8D50', '#F7BB42'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class GameSuccess extends React.Component<Props> {
	static defaultProps = defaultProps

	componentDidMount() {
		this.props.loaderState(false)
	}

	render = () => {
		const { colors, start, end } = this.props
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.container}>
				<Text>{'Zifi в восторге '}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/shocked.gif')} />
				<Text style={styles.text}>{I18n.t('GAME.CONGRATULATION', { value: '2', currency: 'UAH' })}</Text>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	profileState: state.profileState,
	gameResult: state.gameResult,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GameSuccess)
