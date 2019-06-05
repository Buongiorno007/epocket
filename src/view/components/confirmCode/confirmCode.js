import React from 'react'
import { View, Image, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import BackgroundTimer from 'react-native-background-timer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//containers
import BackButton from '@containers/back/back'
import CustomButton from '@containers/custom-button/custom-button'
import AndroidHeader from '@containers/androidHeader/androidHeader'
//redux
import { setToken } from '@reducers/token'
import { loaderState } from '@reducers/loader'
import { setBalance } from '@reducers/user-balance'
import { setColor } from '@reducers/user-color'

import { getPush } from '@reducers/push'
import { saveUser } from '@reducers/profile-state'
//services
import NavigationService from '@services/route'
import { httpPost } from '@services/http'
import { toAge } from '@services/converteDate'
//constants
import { urls } from '@constants/urls'
import { ICONS } from '@constants/icons'
//locales
import I18n from '@locales/I18n'
//styles
import styles from './styles'

class confirmCode extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: <BackButton title={I18n.t('BACK')} route={navigation.state.params.back} />,
		title: navigation.state.params.title,
		headerStyle: styles.headerBackground,
		headerTitleStyle: styles.headerTitle,
	})

	state = {
		notCorrect: false,
		confirmCode: '',
		seconds: 10,
		phoneNumber: '',
		name: '',
		gender: '',
		date: '',
		route: '',
	}

	componentDidMount() {
		const { params } = this.props.navigation.state
		this.setState({
			phoneNumber: params.phone || '',
			name: params.name || '',
			gender: params.gender || '',
			age: params.age || '',
			route: params.back === 'Registration' ? true : false,
		})
		this.startInterval()
		this.props.loaderState(false)
	}

	componentWillUnmount() {
		BackgroundTimer.stopBackgroundTimer()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.confirmCode !== this.state.confirmCode) {
			this.setState({ acceptButton: this.state.confirmCode.length === 6 })
		}
		if (prevState.seconds === 0 && this.state.seconds === 10) {
			BackgroundTimer.stopBackgroundTimer()
			this.startInterval()
		}
	}

	startInterval = () => {
		BackgroundTimer.runBackgroundTimer(this.interv, 1000)
	}

	interv = () => {
		if (this.state.seconds) {
			this.setState({ seconds: this.state.seconds - 1 })
		} else {
			BackgroundTimer.stopBackgroundTimer()
		}
	}

	sendCodeAgain() {
		if (!this.state.seconds) {
			this.props.loaderState(true)
			httpPost(urls.re_send_code, JSON.stringify({ phone: this.state.phoneNumber })).then(
				(result) => {
					this.setState({ seconds: 10 })
					this.props.loaderState(false)
				},
				(error) => {
					this.props.loaderState(false)
					console.log(error, 'ERROR')
				},
			)
		}
	}

	whileNoCodeConfirmRegistration() {
		this.props.loaderState(true)
		const { confirmCode, phoneNumber, name, age, gender, user_id } = this.state
		const body = {
			phone: phoneNumber,
			code: confirmCode,
			name: name,
			user_id: user_id,
			birth_year: age,
			sex: `${gender - 1}`,
			photo: 'data:image/png;base64,' + ICONS.TEST.SHOE_PHOTO,
		}
		httpPost(urls.sign_up_confirm, JSON.stringify(body)).then(
			(result) => {
				const new_user = {
					name: name,
					phone: body.phone,
					sex: gender - 1,
					birthDay: age,
					currency: I18n.locale === 'en' ? result.body.currency : result.body.currency_plural,
					photo: ICONS.TEST.SHOE_PHOTO,
				}
				this.props.saveUser(new_user)
				this.props.getPush(result.body.token)
				this.props.setColor(new_user.sex)
				this.props.setToken(result.body.token)
				this.props.setBalance(0)
				NavigationService.navigate('CatCode')
			},
			(error) => {
				this.setState({ notCorrect: true })
				this.props.loaderState(false)
			},
		)
	}

	whileNoCodeConfirmLogin = () => {
		this.props.loaderState(true)
		let body = {
			phone: this.state.phoneNumber,
			code: this.state.confirmCode,
		}
		httpPost(urls.sing_in_confirm, JSON.stringify(body)).then(
			(result) => {
				const user_info = {
					name: result.body.user,
					phone: body.phone,
					photo: result.body.photo,
					sex: result.body.sex ? 1 : 0,
					birthDay: toAge(result.body.birthDay),
					currency: I18n.locale === 'en' ? result.body.currency : result.body.currency_plural,
				}
				this.props.saveUser(user_info)
				this.props.getPush(result.body.token)
				this.props.setColor(user_info.sex)
				this.props.setToken(result.body.token)
				this.props.setBalance(result.body.balance)
				NavigationService.navigate('CatCode')
			},
			(error) => {
				this.setState({ notCorrect: true })
				this.props.loaderState(false)
			},
		)
	}

	sendResult() {
		this.props.loaderState(true)
		this.state.route ? this.whileNoCodeConfirmRegistration() : this.whileNoCodeConfirmLogin()
	}

	render() {
		return (
			<LinearGradient
				colors={['#F55890', '#FF9950']}
				start={{ x: 1.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={styles.container}
			>
				<AndroidHeader
					route={this.props.navigation.state.params.back}
					title={this.props.navigation.state.params.title}
				/>

				<KeyboardAvoidingView behavior='padding' style={styles.grad}>
					<ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollView}>
						<TouchableOpacity
							style={[styles.resendCode, !this.state.seconds ? styles.resendCodeActive : null]}
							onPress={() => this.sendCodeAgain()}
						>
							<Text style={[styles.resendText, !this.state.seconds ? styles.resendTextActive : null]}>
								{I18n.t('SIGN.SEND_AGAIN')}
							</Text>
							{this.state.seconds !== 0 && (
								<View style={styles.timerView}>
									<Text style={styles.timer}>{`${this.state.seconds}`}</Text>
								</View>
							)}
						</TouchableOpacity>
						<View style={styles.fullWidth}>
							<Text style={styles.title}>{I18n.t('SIGN.SENDED_CODE')}</Text>
						</View>
						<View style={styles.fullWidth}>
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
								<Image style={styles.eye} source={require('@assets/img/eyes.png')} />
							)}
						</View>
						<View style={styles.fullWidth}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								{I18n.t('SIGN.CHECK_CODE')}
							</Text>
						</View>
						<CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.sendResult()
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
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setToken,
			setBalance,
			loaderState,
			// setInstaToken,
			// setFacebookToken,
			setColor,
			getPush,
			saveUser,
			// setProfileVirgin,
			// setGeoVirgin,
			// locationState,
			// setLocation,
			// locationStateListener,
			// locationCoordsListener,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(confirmCode)
