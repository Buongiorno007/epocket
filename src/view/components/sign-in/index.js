import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, Keyboard, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { request } from '@reducers/sign-in'
import { confirm } from '@reducers/verify'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@containers/androidHeader/androidHeader'
import TextInput from '@containers/signForm/signForm'
import Button from '@containers/custom-button/custom-button'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	pink: string,
	white: string,
	country: any[],
	sms: boolean,
	sign_in: any,
} & typeof defaultProps

type State = typeof initialState

const initialState = {
	phone: '',
	code: '+380',
	validate: false,
	accept: false,
	mask: 0,
}

const defaultProps = {
	colors: ['#F55890', '#FF9950'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class SignIn extends React.Component<Props, State> {
	static defaultProps = defaultProps

	state = initialState

	componentDidUpdate = (prevProps, prevState) => {
		const { phone, code } = this.state
		if (prevState.phone !== phone || prevState.code !== code) {
			const accept = phone.length === 12 && code
			this.setState({ accept })
		}
		if (prevProps.sign_in.code !== this.props.sign_in.code && this.props.sign_in.code) {
			if (this.props.sign_in.code === -1) {
				this.setState({ validate: true })
			}
		}
		if (prevProps.verify.code !== this.props.verify.code && this.props.verify.code) {
			if (this.props.verify.code === -1) {
				this.setState({ validate: true })
			}
		}
	}

	handleChangePhone = (phone) => this.setState({ phone: phone.trim() })

	handleChangeCode = (code) => this.setState({ code })

	handleChangeMask = (mask) => this.setState({ mask })

	handleFocusPhone = () => this.setState({ validate: false })

	handleSignIn = () => {
		Keyboard.dismiss()
		const { code, phone } = this.state
		const { sms } = this.props
		if (sms) {
			this.props.request(code, phone)
		} else {
			this.props.confirm(code, phone)
		}
	}

	render = () => {
		const { colors, start, end, country, pink, white } = this.props
		const { phone, validate, accept } = this.state
		const color = accept ? pink : white
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				<Header route='Start' title={I18n.t('SIGN_IN_TITLE')} />
				<KeyboardAvoidingView style={styles.keyboard} behavior='padding'>
					<ScrollView
						contentContainerStyle={[styles.scroll, styles.align]}
						keyboardShouldPersistTaps='handled'
						scrollEnabled={false}
					>
						<View style={styles.wrapper}>
							<Text style={[styles.text, styles.left]}>{I18n.t('SIGN.ENTER_PHONE_NUMBER')}</Text>
						</View>
						<TextInput
							data={country}
							value={phone}
							setPhoneNumber={this.handleChangePhone}
							setCode={this.handleChangeCode}
							onFocus={this.handleFocusPhone}
							maskLength={this.handleChangeMask}
						>
							{validate && <Image style={styles.image} source={require('@assets/img/eyes.png')} />}
						</TextInput>
						<View style={styles.wrapper}>
							<Text style={[styles.text, styles.right, { opacity: validate ? 1 : 0 }]}>
								{I18n.t('SIGN.CHECK_PHONE_NUMBER')}
							</Text>
						</View>
						<Button
							color={color}
							active={accept}
							disabled={!accept}
							handler={this.handleSignIn}
							title={I18n.t('SIGN_IN').toUpperCase()}
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
	country: state.country.list,
	sms: state.country.sms,
	sign_in: state.sign_in,
	verify: state.verify,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			request,
			confirm,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignIn)
