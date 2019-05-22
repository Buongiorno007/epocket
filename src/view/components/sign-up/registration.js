import React from 'react'
import {
	View,
	Text,
	Alert,
	ScrollView,
	TextInput,
	Platform,
	KeyboardAvoidingView,
	NativeModules,
	Image,
	TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { AccessToken } from 'react-native-fbsdk'
//containers
import BackButton from '../../containers/back/back'
import CustomButton from '../../containers/custom-button/custom-button'
import CustomAlert from '../../containers/custom-alert/custom-alert'
//redux
import { setToken } from '../../../reducers/token'
import { loaderState } from '../../../reducers/loader'
import { setBalance } from '../../../reducers/user-balance'
import { connect } from 'react-redux'
import { setColor } from '../../../reducers/user-color'
import { bindActionCreators } from 'redux'
import { setInstaToken } from '../../../reducers/insta-token'
import { setFacebookToken } from '../../../reducers/facebook-token'
import { setProfileVirgin } from '../../../reducers/profile-virgin'
import { setGeoVirgin } from '../../../reducers/geo-virgin'
import { getPush } from '../../../reducers/push'
import { saveUser } from '../../../reducers/profile-state'
import { locationStateListener, locationState } from '../../../reducers/geolocation-status'
import { locationCoordsListener, setLocation } from '../../../reducers/geolocation-coords'
//services
import NavigationService from '../../../services/route'
import { httpPost } from '../../../services/http'
import { handleError } from '../../../services/http-error-handler'
import geo_config from '../start/geolocation-config'
import BackgroundGeolocationModule from '../../../services/background-geolocation-picker'
//constants
import styles from './style'
import { colors } from '../../../constants/colors'
import { urls } from '../../../constants/urls'
import { ICONS } from '../../../constants/icons'
///////////////
import I18n from '@locales/I18n'
import SignForm from '@containers/signForm/signForm'

class Registration extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: <BackButton title={I18n.t('BACK')} route='Start' />,
		title: I18n.t('SIGN_UP_TITLE'),
		headerStyle: {
			backgroundColor: 'rgba(255,255,255,.2)',
		},
		headerTitleStyle: {
			fontWeight: 'bold',
			color: '#fff',
			fontSize: 18,
		},
	})

	state = {
		phoneNumber: '',
		phone: '',
		code: '',
		name: '',
		age: '',
		notCorrect: true,
		gender: 0,
	}

	componentDidMount() {
		this.props.loaderState(false)
	}

	login = () => {
		this.props.loaderState(true)
		let body = {
			phone: '+' + `${this.state.code}${this.state.phoneNumber}`.replace(/\D/g, ''),
		}
		httpPost(urls.sing_in, JSON.stringify(body)).then(
			(result) => {
				this.confirmLogin() //DEPRECATED
			},
			(error) => {
				let error_respons = handleError(error, body, urls.sign_in, '', this.constructor.name, 'login')
				this.props.loaderState(false)
			},
		)
	}

	confirmLogin = () => {
		this.props.loaderState(true)
		let body = {
			phone: '+' + `${this.state.code}${this.state.phoneNumber}`.replace(/\D/g, ''),
		}
		httpPost(urls.sing_in_confirm, JSON.stringify(body)).then(
			(result) => {
				if (result.status === 200) {
					this.props.loaderState(false)
					const locale =
						Platform.OS === 'ios'
							? NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2)
							: NativeModules.I18nManager.localeIdentifier.substring(0, 2)
					const user_info = {
						name: result.body.user,
						phone: this.state.phone,
						photo: result.body.photo,
						sex: result.body.sex ? 1 : 0,
						birthDay: result.body.birthDay,
						currency: locale === 'en' ? result.body.currency : result.body.currency_plural,
					}

					this.props.getPush(result.body.token)
					this.props.saveUser(user_info)
					this.props.setColor(user_info.sex)
					this.props.setToken(result.body.token)
					this.props.setBalance(result.body.balance)
					this.props.setProfileVirgin(result.body.profile_virgin)
					this.props.setGeoVirgin(result.body.geo_virgin)
					// this.isFblogged(result.body.token);
					// this.isInstalogged(result.body.token);
					NavigationService.navigate('Main')
				}
			},
			(error) => {
				this.props.loaderState(false)
				let error_respons = handleError(
					error,
					body,
					urls.sing_in_confirm,
					'',
					this.constructor.name,
					'confirmLogin',
				)
			},
		)
	}

	fieldsValue() {
		return this.state.phoneNumber.length === 12 &&
			this.state.code &&
			this.state.name.length >= 2 &&
			this.state.age &&
			this.state.gender
			? true
			: false
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.phoneNumber !== this.state.phoneNumber ||
			prevState.code !== this.state.code ||
			prevState.name !== this.state.name ||
			prevState.age !== this.state.age ||
			prevState.gender !== this.state.gender
		) {
			this.setState({ acceptButton: this.fieldsValue() })
		}
	}

	render() {
		return (
			<LinearGradient
				colors={['#F55890', '#FF9950']}
				start={{ x: 1.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={styles.container}
			>
				<KeyboardAvoidingView behavior='padding' style={styles.grad}>
					<ScrollView contentContainerStyle={styles.scrollView}>
						<View style={{ width: '100%' }}>
							<Text style={styles.textLeft}>Введите ваш номер телефона</Text>
						</View>
						<SignForm
							data={this.props.countries}
							value={this.state.phoneNumber}
							setPhoneNumber={(value) => this.setState({ phoneNumber: value })}
							setCode={(value) => this.setState({ code: value })}
							onFocus={() => this.setState({ notCorrect: false })}
						>
							{this.state.notCorrect && (
								<Image
									style={{ right: 0, top: 3, zIndex: 100, position: 'absolute' }}
									source={require('./eyes.png')}
								/>
							)}
						</SignForm>
						<View style={{ width: '100%' }}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								Данный номер уже зарегистрирован
							</Text>
						</View>
						<View style={{ width: '100%' }}>
							<Text style={styles.textLeft}>Давайте познакомимся</Text>
						</View>
						<View style={{ width: '100%' }}>
							<TextInput
								value={this.state.name}
								onChangeText={(value) => this.setState({ name: value })}
								placeholder={'Имя Фамилия'}
								style={styles.textInput}
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
							/>
							{this.state.notCorrect && (
								<Image
									style={{ right: 0, top: 3, zIndex: 100, position: 'absolute' }}
									source={require('./eyes.png')}
								/>
							)}
						</View>

						<View style={{ width: '100%' }}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								введите корректное имя
							</Text>
						</View>
						<View style={{ width: '100%' }}>
							<TextInput
								style={styles.textInput}
								placeholder={'Возраст'}
								value={this.state.age}
								keyboardType={'numeric'}
								onChangeText={(value) => this.setState({ age: value })}
								type={'custom'}
								maxLength={2}
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
							/>
							{this.state.notCorrect && (
								<Image
									style={{ right: 0, top: 3, zIndex: 100, position: 'absolute' }}
									source={require('./eyes.png')}
								/>
							)}
						</View>

						<View style={{ width: '100%' }}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								Введите возраст
							</Text>
						</View>
						<View style={{ width: '100%', flexDirection: 'row', marginBottom: 48 }}>
							<TouchableOpacity
								style={[
									{
										borderWidth: 1,
										borderColor: '#fff',
										marginRight: 12,
										flexGrow: 1,
										borderRadius: 20,
										height: 40,
										alignItems: 'center',
										justifyContent: 'center',
									},
									this.state.gender === 1 ? styles.genderActive : null,
								]}
								onPress={() => this.setState({ gender: 1 })}
							>
								<Text style={this.state.gender === 1 ? styles.genderActiveText : styles.genderText}>
									{'GIRL'}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									{
										borderWidth: 1,
										borderColor: '#fff',
										marginLeft: 12,
										flexGrow: 1,
										borderRadius: 20,
										height: 40,
										alignItems: 'center',
										justifyContent: 'center',
									},
									this.state.gender === 2 ? styles.genderActive : null,
								]}
								onPress={() => this.setState({ gender: 2 })}
							>
								<Text style={this.state.gender === 2 ? styles.genderActiveText : styles.genderText}>
									{'BOY'}
								</Text>
							</TouchableOpacity>
						</View>
						<CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.login()
							}}
							active={this.state.acceptButton}
							title={I18n.t('SIGN_UP').toUpperCase()}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
	loader: state.loader,
	countries: state.countries,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setToken,
			setBalance,
			loaderState,
			setInstaToken,
			setFacebookToken,
			setColor,
			getPush,
			saveUser,
			setProfileVirgin,
			setGeoVirgin,
			locationState,
			setLocation,
			locationStateListener,
			locationCoordsListener,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Registration)
