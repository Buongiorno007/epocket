import React from 'react'
import { View, Text, Platform, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Button } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { AccessToken } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//containers
import CustomButton from '../../containers/custom-button/custom-button'
//constants
import styles from './styles'
//redux

import { setGameStatus } from '../../../reducers/game-status'
import { setBalance } from '../../../reducers/user-balance'
import { getConnection } from '../../../reducers/net-info'
import { setSounds } from '../../../reducers/sounds'
import { loaderState } from '../../../reducers/loader'
import { setGeoVirgin } from '../../../reducers/geo-virgin'
import { getPush } from '../../../reducers/push'
import { setFacebookToken } from '../../../reducers/facebook-token'
import { setProfileVirgin } from '../../../reducers/profile-virgin'
import { updateRootStatus } from '../../../reducers/root-status'
import { loadNTPDate } from '../../../reducers/date-abuse-status'
import { locationStateListener, locationState } from '../../../reducers/geolocation-status'
import { locationCoordsListener, setLocation } from '../../../reducers/geolocation-coords'
import { setToken } from '../../../reducers/token'
import { setInstaToken } from '../../../reducers/insta-token'
//services
import geo_config from './geolocation-config'
import NavigationService from '../../../services/route'
import BackgroundGeolocationModule from '../../../services/background-geolocation-picker'
//constants
import { urls } from '../../../constants/urls'
// import { sendToTelegramm } from '../../../services/telegramm-notification';
import { httpGet } from '../../../services/http'
import I18n from '@locales/I18n'
import { setCountries } from '@reducers/countries'

class Start extends React.Component {
	componentDidMount = () => {
		this.props.loaderState(true)
		this.props.getConnection()
		this.props.setSounds()
		this.props.locationStateListener()
		this.props.locationCoordsListener()
		this.props.loadNTPDate()

		this.props.updateRootStatus()
		this._initialConfig()
	}

	_getLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.props.locationState(true)
				this.props.setLocation({
					lng: position.coords.longitude,
					lat: position.coords.latitude,
				})
			},
			(error) => {
				this.props.locationState(false)
			},
		)
	}
	getCountries() {
		httpGet(urls.echo).then(
			(result) => {
				this.props.setCountries(result.body.c_list)
				this.props.loaderState(false)
			},
			(error) => {
				console.log(error, 'No server request')
				this.props.loaderState(false)
			},
		)
	}

	_initialConfig = () => {
		AsyncStorage.multiGet(
			// ['insta_token', 'token', 'balance', 'facebook_token', 'geo_virgin', 'profile_virgin', 'game_status'],
			['insta_token', 'facebook_token', 'geo_virgin', 'profile_virgin', 'game_status', 'token'],
			(err, stores) => {
				stores.map((result) => {
					// get at each store's key/value so you can work with it
					let key = result[0]
					let value = result[1]
					switch (key) {
						case 'insta_token': {
							value && this.props.setInstaToken(value)
							break
						}
						case 'facebook_token': {
							value && this.props.setFacebookToken(value)
							value && Platform.OS === 'ios' && AccessToken.setCurrentAccessToken({ accessToken: value })
							break
						}
						case 'balance': {
							value && this.props.setBalance(Number(value))
							break
						}
						case 'geo_virgin': {
							value && this.props.setGeoVirgin(value)
							break
						}
						case 'profile_virgin': {
							value && this.props.setProfileVirgin(value)
							break
						}
						case 'game_status': {
							value ? this.props.setGameStatus(value) : this.props.setGameStatus('Start')
							break
						}
						case 'token': {
							if (value) {
								this.props.setToken(value)
								this._getLocation()
								if (Platform.OS === 'ios') {
									BackgroundGeolocationModule.ready(geo_config(), (state) => {
										if (!state.enabled) {
											BackgroundGeolocationModule.start(function() {})
										}
									})
								} else {
									BackgroundGeolocationModule.configure(geo_config())
									BackgroundGeolocationModule.checkStatus((status) => {
										console.log(status, 'STATUS')
										if (!status.isRunning) {
											BackgroundGeolocationModule.start()
										}
									})
								}
								NavigationService.navigate('Main')
							} else {
								this.getCountries()
							}
							break
						}
					}
				})
			},
		)
	}

	//WILL BE DEPRECATED//
	goToSignIn = () => {
		this.props.loaderState(true)
		NavigationService.navigate('SignIn')
	}
	goToSignUp = () => {
		this.props.loaderState(true)
		NavigationService.navigate('SignUp')
	}
	//WILL BE DEPRECATED//

	goToSign = (value) => {
		this.props.loaderState(true)
		NavigationService.navigate(value)
	}

	render() {
		return (
			<View style={styles.main_view}>
				<LinearGradient
					colors={['#F4F9FF', '#E0EFFF']}
					start={{ x: 0.0, y: 0.0 }}
					end={{ x: 0.0, y: 1.0 }}
					style={styles.grad}
				/>
				<Image source={require('@assets/img/brand.png')} />
				<View style={styles.signup_signin_buttons}>
					{/* <--//////////// WILL BE DEPRECATED ////////////--> */}
					{true && (
						<CustomButton //
							style={styles.signup_button}
							active
							title={I18n.t('SIGN_UP_TITLE').toUpperCase()}
							color={'#F55890'}
							handler={() => this.goToSignUp()}
						/>
					)}
					{/* <--//////////// WILL BE DEPRECATED ////////////--> */}

					<Button style={styles.registration} onPress={() => this.goToSign('Registration')}>
						<LinearGradient
							colors={['#FF9950', '#F55890']}
							start={{ x: 0.0, y: 0.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={styles.registration}
						/>
						<Text style={styles.registration_text}>{I18n.t('NEW_SIGN_UP_TITLE')}</Text>
					</Button>
					<Button style={styles.login} onPress={() => this.goToSign('Login')}>
						<Text style={styles.login_text}>{I18n.t('LOGIN')}</Text>
					</Button>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	token: state.token,
	game_info: state.game_info,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getConnection,
			locationState,
			setLocation,
			locationStateListener,
			locationCoordsListener,
			setToken,
			setInstaToken,
			setFacebookToken,
			setGeoVirgin,
			setBalance,
			loaderState,
			getPush,
			setProfileVirgin,
			setSounds,
			updateRootStatus,
			loadNTPDate,
			setGameStatus,
			setCountries,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Start)
