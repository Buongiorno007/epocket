import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, Keyboard, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'native-base'
import { AUTH } from '@reducers/__proto__'
import BackgroundTimer from 'react-native-background-timer'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@containers/androidHeader/androidHeader'
import Touchable from '@containers/custom-button/custom-button'
import I18n from '@locales/I18n'
import styles from './styles'

// import React from 'react'
// import { View, Image, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
// import BackgroundTimer from 'react-native-background-timer'
// //containers
// import Button from '@containers/custom-button/custom-button'
// //redux
// import { setToken } from '@reducers/token'
// import { loaderState } from '@reducers/loader'
// import { setBalance } from '@reducers/user-balance'
// import { setColor } from '@reducers/user-color'

// import { saveUser } from '@reducers/profile-state'
// //services
// import NavigationService from '@services/route'
// import { httpPost } from '@services/http'
// import { toAge } from '@services/converteDate'
// //constants
// import { urls } from '@constants/urls'
// import { ICONS } from '@constants/icons'
// //locales
// import I18n from '@locales/I18n'
// //styles
// import styles from './styles'

type Props = {
	sign_in: any,
	sign_up: any,
} & typeof defaultProps
type State = typeof initialState

const initialState = {
	validate: false,
	code: '',
	timer: 10,
	phone: '',
	name: '',
	gender: '',
	age: '',
	user_id: '',
	back: '',
	title: '',
	route: '',
	accept: false,
}

const defaultProps = {
	colors: ['#F55890', '#FF9950'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class ConfirmCode extends React.Component<Props, State> {
	static defaultProps = defaultProps

	state = initialState

	componentDidMount() {
		if (JSON.stringify(this.props.sign_in) !== JSON.stringify(new AUTH())) {
			this.init(this.props.sign_in)
		} else {
			this.init(new AUTH())
		}
		if (JSON.stringify(this.props.sign_up) !== JSON.stringify(new AUTH())) {
			this.init(this.props.sign_up)
		} else {
			this.init(new AUTH())
		}
		this.startInterval()
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

	init(data) {
		const { phone, name, gender, age, user_id, back, title } = data
		this.setState({
			phone: phone || '',
			name: name || '',
			gender: gender || '',
			age: age || '',
			user_id: user_id || '',
			back: back || '',
			route: back === 'SignUp',
			title: title || '',
		})
	}

	startInterval = () => {
		BackgroundTimer.runBackgroundTimer(this.interv, 1000)
	}

	interv = () => {
		let { timer } = this.state
		if (timer) {
			this.setState({ timer: timer - 1 })
		} else {
			BackgroundTimer.stopBackgroundTimer()
		}
	}

	resend = () => {
		if (!this.state.timer) {
			this.props.loaderState(true)
			httpPost(urls.re_send_code, JSON.stringify({ phone: this.state.phone })).then(
				(result) => {
					this.setState({ timer: 10 })
					this.props.loaderState(false)
				},
				(error) => {
					this.props.loaderState(false)
					console.log(error, 'ERROR')
				},
			)
		}
	}

	// whileNoCodeConfirmRegistration() {
	// 	this.props.loaderState(true)
	// 	const { code, phone, name, age, gender, user_id } = this.state
	// 	const body = {
	// 		phone: phone,
	// 		code: code,
	// 		name: name,
	// 		user_id: user_id,
	// 		birth_year: age,
	// 		sex: `${gender - 1}`,
	// 		photo: 'data:image/png;base64,' + ICONS.TEST.SHOE_PHOTO,
	// 	}
	// 	httpPost(urls.sign_up_confirm, JSON.stringify(body)).then(
	// 		(result) => {
	// 			const new_user = {
	// 				name: name,
	// 				phone: body.phone,
	// 				sex: gender - 1,
	// 				birthDay: age,
	// 				currency: I18n.locale === 'en' ? result.body.currency : result.body.currency_plural,
	// 				photo: ICONS.TEST.SHOE_PHOTO,
	// 			}
	// 			this.props.saveUser(new_user)
	// 			this.props.setColor(new_user.sex)
	// 			this.props.setToken(result.body.token)
	// 			this.props.setBalance(0)
	// 			NavigationService.navigate('CatCode')
	// 		},
	// 		(error) => {
	// 			this.setState({ validate: true })
	// 			this.props.loaderState(false)
	// 		},
	// 	)
	// }

	// whileNoCodeConfirmLogin = () => {
	// 	this.props.loaderState(true)
	// 	let body = {
	// 		phone: this.state.phone,
	// 		code: this.state.code,
	// 	}
	// 	httpPost(urls.sing_in_confirm, JSON.stringify(body)).then(
	// 		(result) => {
	// 			const user_info = {
	// 				name: result.body.user,
	// 				phone: body.phone,
	// 				photo: result.body.photo,
	// 				sex: result.body.sex ? 1 : 0,
	// 				birthDay: toAge(result.body.birthDay),
	// 				currency: I18n.locale === 'en' ? result.body.currency : result.body.currency_plural,
	// 			}
	// 			this.props.saveUser(user_info)
	// 			this.props.setColor(user_info.sex)
	// 			this.props.setToken(result.body.token)
	// 			this.props.setBalance(result.body.balance)
	// 			NavigationService.navigate('CatCode')
	// 		},
	// 		(error) => {
	// 			this.setState({ validate: true })
	// 			this.props.loaderState(false)
	// 		},
	// 	)
	// }

	handleConfirm = () => {
		// this.state.route ? this.whileNoCodeConfirmRegistration() : this.whileNoCodeConfirmLogin()
	}

	handleFocusCode = () => this.setState({ validate: false })

	handleChangeCode = (code) => this.setState({ code })

	render = () => {
		const { colors, start, end, pink, white } = this.props
		const { timer, accept, code, validate, back, title } = this.state
		const color = accept ? pink : white
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				<Header route={back} title={title} />
				<KeyboardAvoidingView style={styles.keyboard} behavior={'padding'}>
					<ScrollView contentContainerStyle={styles.scroll} scrollEnabled={false}>
						<Button
							rounded
							transparent
							disabled={timer !== 0}
							style={[styles.again_button, !timer && styles.again_button_active]}
							onPress={this.resend}
						>
							<Text style={[styles.again_text, !timer && styles.again_text_active]}>
								{I18n.t('SIGN.SEND_AGAIN')}
							</Text>
							{timer !== 0 && (
								<View style={styles.wrapper}>
									<Text style={styles.timer}>{`${timer}`}</Text>
								</View>
							)}
						</Button>
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
						<Touchable
							color={color}
							active={accept}
							disabled={!accept}
							onPress={this.handleConfirm}
							title={I18n.t('ACCEPT').toUpperCase()}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	pink: state.userColor.pink,
	white: state.userColor.white,
	sign_in: state.sign_in,
	sign_up: state.sign_up,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			sendCode,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConfirmCode)
