import React from 'react'
import { View, Text, Platform, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Button } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { AccessToken } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//constants
import styles from './styles'
//redux
import { setGameStatus } from '../../../reducers/game-status'
import { setBalance } from '../../../reducers/user-balance'
import { getConnection } from '../../../reducers/net-info'
import { setSounds } from '../../../reducers/sounds'
import { loaderState } from '../../../reducers/loader'
import { getPush } from '../../../reducers/push'
import { updateRootStatus } from '../../../reducers/root-status'
import { loadNTPDate } from '../../../reducers/date-abuse-status'
import { locationStateListener, locationState } from '../../../reducers/geolocation-status'
import { locationCoordsListener, setLocation } from '../../../reducers/geolocation-coords'
import { setToken } from '../../../reducers/token'
import { saveUser } from '../../../reducers/profile-state'
import { setCountries } from '@reducers/countries'
//services
import geo_config from './geolocation-config'
import NavigationService from '../../../services/route'
import BackgroundGeolocationModule from '../../../services/background-geolocation-picker'
//constants
import { urls } from '../../../constants/urls'
// import { sendToTelegramm } from '../../../services/telegramm-notification';
import { httpGet, httpPost } from '../../../services/http'
import I18n from '@locales/I18n'
import { toAge } from '@services/converteDate'

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

	saveData = (data) => {
		const user = {
			name: data.user_name,
			phone: data.user_phone,
			photo: data.photo,
			sex: data.sex ? 1 : 0,
			currency: I18n.locale === 'ru' ? data.currency_plural : data.currency,
			birthDay: toAge(data.birth_day),
		}
		this.props.saveUser(user)
		this.props.setBalance(Number(data.balance))
		NavigationService.navigate('Main')
	}

	_initialConfig = () => {
		AsyncStorage.multiGet(['game_status', 'token'], (err, stores) => {
			stores.map((result) => {
				let key = result[0]
				let value = result[1]
				switch (key) {
					case 'game_status': {
						value && value !== 'game' ? this.props.setGameStatus(value) : this.props.setGameStatus('start')
						break
					}
					case 'token': {
						if (value) {
							if (Platform.OS === 'ios') {
								BackgroundGeolocationModule.ready(geo_config(), (state) => {
									if (!state.enabled) {
										BackgroundGeolocationModule.start(function() {})
									}
								})
							} else {
								BackgroundGeolocationModule.configure(geo_config())
								BackgroundGeolocationModule.checkStatus((status) => {
									if (!status.isRunning) {
										BackgroundGeolocationModule.start()
									}
								})
							}
							httpPost(urls.get_user, JSON.stringify({}), value).then(
								(result) => {
									console.log(result.body, 'START SIGNIN')
									this.props.setToken(value)
									this.props.getPush(value)
									this._getLocation()
									this.saveData(result.body)
								},
								(error) => {
									console.log(error, 'ERROR')
									this.getCountries()
								},
							)
						} else {
							this.getCountries()
						}
						break
					}
				}
			})
		})
	}

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
					<Button style={styles.registration} onPress={() => this.goToSign('Registration')}>
						<LinearGradient
							colors={['#FF9950', '#F55890']}
							start={{ x: 0.0, y: 0.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={styles.registration}
						/>
						<Text style={styles.registration_text}>{I18n.t('SIGN_UP_TITLE').toUpperCase()}</Text>
					</Button>
					<Button style={styles.login} onPress={() => this.goToSign('Login')}>
						<Text style={styles.login_text}>{I18n.t('SIGN_IN_TITLE').toUpperCase()}</Text>
					</Button>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getConnection,
			locationState,
			setLocation,
			locationStateListener,
			locationCoordsListener,
			setToken,
			setBalance,
			loaderState,
			getPush,
			setSounds,
			updateRootStatus,
			loadNTPDate,
			setGameStatus,
			setCountries,
			saveUser,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Start)
