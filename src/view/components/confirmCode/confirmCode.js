import React from 'react'
import { View, Image, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
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
import styles from './styles'
import { urls } from '../../../constants/urls'
import { ICONS } from '../../../constants/icons'
///////////////
import I18n from '@locales/I18n'
import SignForm from '@containers/signForm/signForm'

class confirmCode extends React.Component {
	interval
	static navigationOptions = ({ navigation }) => ({
		headerLeft: <BackButton title={I18n.t('BACK')} route={navigation.state.params.back} />,
		title: navigation.state.params.title,
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
		notCorrect: false,
		confirmCode: '',
		seconds: 60,
		phoneNumber: '',
		name: '',
		gender: '',
		date: new Date(),
	}

	componentDidMount() {
		const { params } = this.props.navigation.state
		const timeStamp = new Date().getTime() - params.age * 31536000000 || new Date().getTime()
		this.setState({
			phoneNumber: params.phone || '',
			name: params.name || '',
			gender: params.gender || '',
			date: new Date(timeStamp),
		})
		this.startInterval()
		this.props.loaderState(false)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.confirmCode !== this.state.confirmCode) {
			this.state.confirmCode.length === 6
				? this.setState({ acceptButton: true })
				: this.setState({ acceptButton: false })
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	startInterval() {
		this.interval = setInterval(() => {
			if (this.state.seconds) {
				this.setState({ seconds: this.state.seconds - 1 })
			} else {
				clearInterval(this.interval)
			}
		}, 1000)
	}

	sendCodeAgain() {
		if (!this.state.seconds) {
			//HERE WILL BE CODE SEND AGAIN
			this.setState({ seconds: 60 })
			this.startInterval()
			console.log('CODE SEND')
		}
	}

	sendCode() {
		this.props.loaderState(true)
		let body = {
			phone: this.state.phoneNumber,
			confirmCode: this.state.confirmCode,
			birthday: this.state.date,
			name: this.state.name,
			gender: this.state.gender,
		}
		console.log(body, 'TOTAL BODY')
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
					<ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollView}>
						<TouchableOpacity
							style={[styles.resendCode, !this.state.seconds ? styles.resendCodeActive : null]}
							onPress={() => this.sendCodeAgain()}
						>
							<Text style={[styles.resendText, !this.state.seconds ? styles.resendTextActive : null]}>
								Отправить повторно
							</Text>
							{this.state.seconds && (
								<View style={styles.timerView}>
									<Text style={styles.timer}>{this.state.seconds}</Text>
								</View>
							)}
						</TouchableOpacity>
						<View style={styles.fullWidth}>
							<Text style={styles.title}>На ваш номер телефона отправлено 6-ти значный код</Text>
						</View>
						<View style={{ width: '100%' }}>
							<TextInput
								value={this.state.confirmCode}
								onChangeText={(value) => this.setState({ confirmCode: value })}
								placeholder={'-  -  -  -  -  -'}
								style={styles.textInput}
								keyboardType='numeric'
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
								maxLength={6}
							/>
							{this.state.notCorrect && (
								<Image
									style={{ right: 0, top: 3, zIndex: 100, position: 'absolute' }}
									source={require('@assets/img/eyes.png')}
								/>
							)}
						</View>
						<View style={styles.fullWidth}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								Проверьте код на ошибки
							</Text>
						</View>
						<CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.sendCode()
							}}
							active={this.state.acceptButton}
							title={I18n.t('ACCEPT').toUpperCase()}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
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
)(confirmCode)
