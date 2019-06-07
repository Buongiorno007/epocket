import React from 'react'
import { View, Text, Image, FlatList, AppState } from 'react-native'
import { LinearTextGradient } from 'react-native-text-gradient'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { Button } from 'native-base'
import geolib from 'geolib'
import { connect } from 'react-redux'
//redux
import { setBalance } from '@reducers/user-balance'
import { setTabState } from '@reducers/tabs'
import { setNavigateToMall } from '@reducers/navigate-to-mall'
import { bindActionCreators } from 'redux'
import { setGameStatus } from '@reducers/game-status'
import { loaderState } from '@reducers/loader'
import { getGameInfo } from '@reducers/game-info'
import { launchGameExpiredTimer } from '@reducers/game-expired-timer'
import { errorState } from '@reducers/game-error'
import { setDistance } from '@reducers/distance'
import { updateMall } from '@reducers/selected-mall'
import { setOutlets } from '@reducers/outlet-list'
import { setInitialOutlets } from '@reducers/initial-outlets'
import { setWebSiteTimer } from '@reducers/website-timer'
import { setAppState } from '@reducers/app-state'
//constants
import styles from './styles'
import { urls } from '@constants/urls'
import { colors } from '@constants/colors'
import { ICONS } from '@constants/icons'
//containers
import CustomButton from '@containers/custom-button/custom-button'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import CustomAlert from '@containers/custom-alert/custom-alert'
import TrcInformation from '@containers/trc-information/trc-information'
import PartnerCard from '@containers/partner-card/partner-card'
import BrandWebsite from '@containers/brand-website/brand-website'
//services
import { httpPost } from '@services/http'
import { handleError } from '@services/http-error-handler'
import NavigationService from '@services/route'
import moment from 'moment-timezone'
import I18n from '@locales/I18n'

class GameStart extends React.Component {
	state = {
		errorVisible: false,
		website_visible: false,
		interval: null,
		errorText: '',
		brand_title: '',
		currency: 'UAH',
	}

	componentDidMount() {
		this.setState({
			currency: this.props.profileState.currency || 'UAH',
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.grad}>
					{true && <Text>{'10/10' + I18n.t('GAME.GAMES_FOR_TODAY')}</Text>}
					<View>{'sadfasdf'}</View>
					<Button transparent style={styles.btn} onPress={() => {}}>
						<LinearGradient
							colors={['#FF9950', '#F55890']}
							start={{ x: 0.0, y: 0.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={styles.btn_gradient}
						/>
						<Text style={styles.registration_text}>{I18n.t('GAME.START').toUpperCase()}</Text>
					</Button>
				</View>
				<FooterNavigation />
			</View>
		)
	}
}
//
const mapStateToProps = (state) => {
	return {
		isLocation: state.location.status,
		game_info: state.game_info,
		token: state.token,
		location: state.location.coordinate,
		userColor: state.userColor,
		game_error: state.game_error,
		game_status: state.game_status,
		selectedMall: state.selectedMall,
		distance: state.distance,
		activeTab: state.activeTab,
		appState: state.appState,
		website_timer: state.website_timer,
		game_ticker_data: state.game_ticker_data,
		profileState: state.profileState,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getGameInfo,
			setGameStatus,
			errorState,
			setAppState,
			setInitialOutlets,
			setOutlets,
			setDistance,
			setWebSiteTimer,
			updateMall,
			loaderState,
			setTabState,
			launchGameExpiredTimer,
			setNavigateToMall,
			setBalance,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GameStart)
