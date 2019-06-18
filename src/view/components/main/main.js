import React from 'react'
import { View, BackHandler, Platform, AppState } from 'react-native'
//components
import Map from './../map/map'
import Profile from './../profile/profile'
import History from './../history/history'
import GameStart from './../game-start/game-start'
import Game from './../game/game'
import GameExpired from './../game-expired/game-expired'
//containers
import ReturnToMall from '../../containers/return-to-mall-timer/return-to-mall-timer'
import NoInternet from '../../containers/no-internet/no-internet'
import TimerModal from '../../containers/timer-modal/timer-modal'
import LocationDisabled from '../../containers/location-disabled/location-disabled'
//constants
import styles from './styles'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showDoneNotification } from '../../../reducers/main-task-done-notification'
import { showFailedNotification } from '../../../reducers/main-task-failed-notification'
import { setActiveCard } from '../../../reducers/set-active-card'
import { setColor } from '../../../reducers/user-color'
import { getGameInfo } from '../../../reducers/game-info'
import { loaderState } from '../../../reducers/loader'
import GameS from '@components/game-component/game-start'
//services
import GeolocationService from '../../../services/geolocation-service'

class Main extends React.Component {
	state = {
		develop: false,
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.setActiveCard(false)
			return true
		})
		this.props.setColor(this.props.profileState.sex)
		// if (__DEV__) {
		//   this.setState({ develop: true });
		// }
	}

	renderLastTab() {
		let container
		if (
			this.props.game_status === 'start' ||
			this.props.game_status === 'lock' ||
			this.props.game_status === 'initial'
		) {
			// container = <GameStart />
			container = <GameS />
		} else if (this.props.game_status === 'expired' || this.props.game_status === 'failed') {
			container = <GameExpired />
		} else {
			container = <Game />
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
	loader: state.loader,
	userColor: state.userColor,
	dashboard: state.dashboard,
	info: state.info,
	timer_status: state.timer_status,
	doneNotification: state.doneNotification,
	failedNotification: state.failedNotification,
	game_status: state.game_status,
	isLocation: state.location.status,
	timerShow: state.timerShow,
	token: state.token,
	location: state.location.coordinate,
	appState: state.appState,
	selectedMall: state.selectedMall,
	closestMall: state.closestMall,
	profileState: state.profileState,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			showDoneNotification,
			showFailedNotification,
			setActiveCard,
			setColor,
			getGameInfo,
			loaderState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Main)
