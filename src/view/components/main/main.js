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
import RootEnabled from '../../containers/root-enabled/root-enabled'
import DateAbuseEnabled from '../../containers/date-abuse-enabled/date-abuse-enabled'
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
import { updateRootStatus } from '../../../reducers/root-status'
import { loadNTPDate } from '../../../reducers/date-abuse-status'
//services
import GeolocationService from '../../../services/geolocation-service'

class Main extends React.Component {
	state = {
		develop: false,
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange)
	}
	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange)
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.setActiveCard(false)
			return true
		})
		this.props.setColor(this.props.profileState.sex)
		// if (__DEV__) {
		//   this.setState({ develop: true });
		// }
	}
	_handleAppStateChange = (nextAppState) => {
		if (nextAppState === 'active') {
			this.props.loaderState(true)
			this.props.loadNTPDate()
			this.props.updateRootStatus()
			this.props.loaderState(false)
		}
	}
	renderLastTab() {
		let container
		if (
			this.props.game_status === 'start' ||
			this.props.game_status === 'lock' ||
			this.props.game_status === 'initial'
		) {
			container = <GameStart />
		} else if (this.props.game_status === 'expired' || this.props.game_status === 'failed') {
			container = <GameExpired />
		} else {
			container = <GameStart />
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

				{!this.state.develop &&
					(Platform.OS === 'ios'
						? this.props.rootStatus &&
						  this.props.isLocation &&
						  (this.props.activeTab === 1 || this.props.activeTab === 0) && (
								<RootEnabled />
								// null
						  )
						: this.props.rootStatus && this.props.isLocation && <RootEnabled />)}

				{!this.state.develop && !this.props.dateAbuseStatus ? <DateAbuseEnabled /> : null}

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
	isLocation: state.isLocation,
	timerShow: state.timerShow,
	token: state.token,
	location: state.location,
	rootStatus: state.rootStatus,
	dateAbuseStatus: state.dateAbuseStatus,
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
			updateRootStatus,
			getGameInfo,
			loadNTPDate,
			loaderState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Main)
