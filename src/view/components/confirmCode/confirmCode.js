import React from 'react'
import { View, Image, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import BackgroundTimer from 'react-native-background-timer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//containers
import BackButton from '@containers/back/back'
import Button from '@containers/custom-button/custom-button'
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

type Props = typeof initialProps

type State = typeof initialState

const initialState = {
	validate: false,
	code: '',
	timer: 10,
	phoneNumber: '',
	name: '',
	gender: '',
	route: '',
	accept: false,
}

const initialProps = {
	colors: ['#F55890', '#FF9950'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class confirmCode extends React.Component<Props, State> {
	interval
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title,
		headerStyle: styles.background,
		headerTitleStyle: styles.title,
		headerLeft: <BackButton title={I18n.t('BACK')} route={navigation.state.params.back} />,
	})

	state = initialState
	static defaultProps = initialProps

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
		if (prevState.code !== this.state.code) {
			this.setState({ accept: this.state.code.length === 6 })
		}
		if (prevState.timer === 0 && this.state.timer === 10) {
			BackgroundTimer.stopBackgroundTimer()
			this.startInterval()
		}
	}

	interval = () => {
		BackgroundTimer.runBackgroundTimer(() => {
			this.setState({ timer: this.state.timer - 1 })
		})
	}

	startInterval = () => {
		console.log(this.state.timer, 'timer')
		BackgroundTimer.backgroundClockMethod(this.interv, 1000)
	}

	interv = () => {
		if (this.state.timer) {
			console.log('IM HERE AFTER RUN')
			this.setState({ timer: this.state.timer - 1 })
		} else {
			console.log('IM ON STOP')
			BackgroundTimer.stopBackgroundTimer()
		}
	}

	resend = () => {
		// if (!this.state.timer) {
		// 	this.props.loaderState(true)
		// 	httpPost(urls.re_send_code, JSON.stringify({ phone: this.state.phoneNumber })).then(
		// 		(result) => {
		// 			// this.restartInterval()
		// 			this.setState({ timer: 10 })
		// 			this.props.loaderState(false)
		// 		},
		// 		(error) => {
		// 			this.props.loaderState(false)
		// 			console.log(error, 'ERROR')
		// 		},
		// 	)
		// }
		this.setState({ timer: 10 })
	}

	whileNoCodeConfirmRegistration() {
		this.props.loaderState(true)
		const { code, phoneNumber, name, age, gender, user_id } = this.state
		const body = {
			phone: phoneNumber,
			code: code,
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
				this.setState({ validate: true })
				this.props.loaderState(false)
			},
		)
	}

	whileNoCodeConfirmLogin = () => {
		this.props.loaderState(true)
		let body = {
			phone: this.state.phoneNumber,
			code: this.state.code,
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
				this.setState({ validate: true })
				this.props.loaderState(false)
			},
		)
	}

	submit = () => {
		this.props.loaderState(true)
		this.state.route ? this.whileNoCodeConfirmRegistration() : this.whileNoCodeConfirmLogin()
	}

	handleFocusCode = () => this.setState({ validate: false })

	handleChangeCode = (code) => this.setState({ code })

	render = () => {
		const { navigation, userColor, colors, start, end } = this.props
		const { back, title } = navigation.state.params
		const { pink, white } = userColor
		const { timer, code, accept, validate } = this.state
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				<AndroidHeader route={back} title={title} />
				<KeyboardAvoidingView behavior='padding' style={styles.keyboard}>
					<ScrollView scrollEnabled={false} contentContainerStyle={styles.scroll}>
						<TouchableOpacity
							style={[styles.again_button, !timer && styles.again_button_active]}
							onPress={this.resend}
							disabled={timer !== 0}
						>
							<Text style={[styles.again_text, !timer && styles.again_text_active]}>
								{I18n.t('SIGN.SEND_AGAIN')}
							</Text>
							{timer !== 0 && (
								<View style={styles.wrapper}>
									<Text style={styles.timer}>{`${timer}`}</Text>
								</View>
							)}
						</TouchableOpacity>
						<View style={styles.content}>
							<Text style={styles.description}>{I18n.t('SIGN.SENDED_CODE')}</Text>
						</View>
						<View style={styles.content}>
							<TextInput
								value={code}
								onFocus={this.handleFocusCode}
								onChangeText={this.handleChangeCode}
								placeholder={'-  -  -  -  -  -'}
								placeholderTextColor={'#fff'}
								style={styles.field}
								keyboardType={'numeric'}
								maxLength={6}
							/>
							{validate && <Image style={styles.hidden} source={require('@assets/img/eyes.png')} />}
						</View>
						<View style={styles.content}>
							<Text style={[styles.right, { opacity: validate ? 1 : 0 }]}>
								{I18n.t('SIGN.CHECK_CODE')}
							</Text>
						</View>
						<Button
							color={accept ? pink : white}
							handler={this.submit}
							active={accept}
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
