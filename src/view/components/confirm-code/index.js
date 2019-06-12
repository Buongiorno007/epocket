import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, Keyboard, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signInConfirm } from '@reducers/sign-in-confirm'
import { signUpConfirm } from '@reducers/sign-up-confirm'
import { sendCode } from '@reducers/send-code'
import { Button } from 'native-base'
import { AUTH } from '@reducers/__proto__'
import BackgroundTimer from 'react-native-background-timer'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@containers/androidHeader/androidHeader'
import Touchable from '@containers/custom-button/custom-button'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	sign_in: any,
	sign_up: any,
} & typeof defaultProps
type State = typeof initialState

const initialState = {
	validate: false,
	code: '',
	timer: 60,
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
		const sign_in = JSON.stringify(this.props.sign_in) !== JSON.stringify(new AUTH())
		const sign_up = JSON.stringify(this.props.sign_up) !== JSON.stringify(new AUTH())
		if (sign_in || sign_up) {
			sign_in && this.init(this.props.sign_in)
			sign_up && this.init(this.props.sign_up)
		} else {
			this.init(new AUTH())
		}
		this.runBackgroundTimer()
	}

	componentWillUnmount() {
		BackgroundTimer.stopBackgroundTimer()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.code !== this.state.code) {
			this.setState({ accept: this.state.code.length === 6 })
		}
		if (prevState.timer === 0 && this.state.timer === 60) {
			BackgroundTimer.stopBackgroundTimer()
			this.runBackgroundTimer()
		}
		if (prevProps.send_code.code !== this.props.send_code.code && this.props.send_code.code) {
			if (this.props.send_code.code === 1) {
				this.setState({ timer: 60 })
			}
		}
		if (prevProps.sign_in_confirm.code !== this.props.sign_in_confirm.code && this.props.sign_in_confirm.code) {
			if (this.props.sign_in_confirm.code === -1) {
				this.setState({ validate: true })
			}
		}
		if (prevProps.sign_up_confirm.code !== this.props.sign_up_confirm.code && this.props.sign_up_confirm.code) {
			if (this.props.sign_up_confirm.code === -1) {
				this.setState({ validate: true })
			}
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

	runBackgroundTimer = () => {
		BackgroundTimer.runBackgroundTimer(this.checkBackgroundTimer, 1000)
	}

	checkBackgroundTimer = () => {
		let { timer } = this.state
		if (timer) {
			this.setState({ timer: timer - 1 })
		} else {
			BackgroundTimer.stopBackgroundTimer()
		}
	}

	handleFocusCode = () => this.setState({ validate: false })

	handleChangeCode = (code) => this.setState({ code })

	handleSendCode = () => {
		const { phone } = this.state
		this.props.sendCode(phone)
	}

	handleConfirm = () => {
		const { phone, name, gender, age, user_id, code, route } = this.state
		if (route) {
			this.props.signUpConfirm(phone, name, gender, age, user_id, code)
		} else {
			this.props.signInConfirm(phone, code)
		}
	}

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
							onPress={this.handleSendCode}
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
							handler={this.handleConfirm}
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
	sign_in_confirm: state.sign_in_confirm,
	sign_up: state.sign_up,
	sign_up_confirm: state.sign_up_confirm,
	send_code: state.send_code,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			sendCode,
			signInConfirm,
			signUpConfirm,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConfirmCode)
