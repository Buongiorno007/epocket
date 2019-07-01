import React from 'react'
import { View, BackHandler, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//components
import Map from './../map/map'
import Profile from './../profile/profile'
import History from './../history/history'
//containers
import ReturnToMall from '../../containers/return-to-mall-timer/return-to-mall-timer'
import TimerModal from '../../containers/timer-modal/timer-modal'
import LocationDisabled from '../../containers/location-disabled/location-disabled'
//constants
import styles from './styles'
//redux
import { setActiveCard } from '../../../reducers/set-active-card'
import { setColor } from '../../../reducers/user-color'
import GameS from '@components/game-component/game-start'
import GamePartners from '@components/game-component/game-partners'
//services
import GeolocationService from '../../../services/geolocation-service'
import { getGameStart } from '@reducers/gameStart'

class Main extends React.Component {
	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.setActiveCard(false)
			return true
		})
		this.props.setColor(this.props.profileState.sex)
		this.props.activeTab === 0 && this.props.getGameStart()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.activeTab !== 0 && this.props.activeTab === 0) this.props.getGameStart()
		if (prevProps.game_status === 'ticker' && this.props.game_status !== 'ticker') this.props.getGameStart()
	}

	renderLastTab() {
		let container
		if (this.props.game_status === 'ticker') {
			container = <GamePartners />
		} else {
			container = <GameS />
		}

		return container
	}
	render() {
		return (
			<View style={styles.main_view}>
				<View style={styles.content}>
					{this.props.activeTab === 0 ? this.renderLastTab() : null}
					{this.props.activeTab === 1 ? <Map /> : null}
					{this.props.activeTab === 2 ? <History /> : null}
					{this.props.activeTab === 3 ? <Profile /> : null}
				</View>

				{this.props.timerShow &&
					this.props.timer_status &&
					JSON.stringify(this.props.closestMall) !== JSON.stringify(this.props.selectedMall) && (
						<ReturnToMall />
					)}

				{Platform.OS === 'ios'
					? !this.props.isLocation &&
					  (this.props.activeTab === 1 || this.props.activeTab === 0) && <LocationDisabled />
					: !this.props.isLocation && <LocationDisabled />}
				<TimerModal />
				<GeolocationService />
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	activeTab: state.activeTab,
	timer_status: state.timer_status,
	game_status: state.game_status,
	isLocation: state.location.status,
	timerShow: state.timerShow,
	selectedMall: state.selectedMall,
	closestMall: state.closestMall,
	profileState: state.profileState,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setActiveCard,
			setColor,
			getGameStart,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Main)
