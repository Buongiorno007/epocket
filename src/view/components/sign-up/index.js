import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, Keyboard, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'native-base'
import { signUp } from '@reducers/sign-up'
import { signUpConfirm } from '@reducers/sign-up-confirm'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@containers/androidHeader/androidHeader'
import Dropdown from '@containers/signForm/signForm'
import Touchable from '@containers/custom-button/custom-button'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	pink: string,
	white: string,
	country: any[],
	sms: boolean,
	sign_up: any,
	sign_up_confirm: any,
} & typeof defaultProps

type State = typeof initialState

const initialState = {
	phone: '',
	code: '',
	name: '',
	age: '',
	gender: 0,
	user_id: '',
	validate: false,
	accept: false,
	mask: 9,
}

const defaultProps = {
	colors: ['#F55890', '#FF9950'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class SignUp extends React.Component<Props, State> {
	static defaultProps = defaultProps

	state = initialState

	componentDidUpdate = (prevProps, prevState) => {
		const { phone, code, name, age, gender, mask } = this.state
		if (
			prevState.phone !== phone ||
			prevState.code !== code ||
			prevState.name !== name ||
			prevState.age !== age ||
			prevState.gender !== gender
		) {
			const accept = phone.replace(/\D/g, '').length === mask && code && name.length >= 2 && age && gender
			this.setState({ accept })
		}
		if (prevProps.sign_up.code !== this.props.sign_up.code && this.props.sign_up.code) {
			if (this.props.sign_up.code === -1) {
				this.setState({ validate: true })
			}
		}
		if (prevProps.sign_up_confirm.code !== this.props.sign_up_confirm.code && this.props.sign_up_confirm.code) {
			if (this.props.sign_up_confirm.code === -1) {
				this.setState({ validate: true })
			}
		}
	}

	handleChangePhone = (phone) => this.setState({ phone: phone.trim() })

	handleChangeCode = (code) => this.setState({ code })

	handleChangeMask = (mask) => this.setState({ mask })

	handleChangeName = (name) => {
		const regexp = /^.*[^A-zА-яЁё ].*$/
		if (!regexp.test(name)) {
			this.setState({ name })
		}
	}

	handleChangeAge = (age) => this.setState({ age })

	handleChangeGirl = () => this.setState({ gender: 1 })

	handleChangeBoy = () => this.setState({ gender: 2 })

	handleFocus = () => this.setState({ validate: false })

	handleSignUp = () => {
		Keyboard.dismiss()
		const { code, phone, name, gender, age, user_id } = this.state
		const { sms } = this.props
		const number = '+' + `${code}${phone}`.replace(/\D/g, '')
		if (sms) {
			this.props.signUp(number, name, gender, age, user_id)
		} else {
			this.props.signUpConfirm(number, name, gender, age, user_id)
		}
	}

	render = () => {
		const { colors, start, end, country, pink, white } = this.props
		const { phone, validate, accept, name, age, gender } = this.state
		const color = accept ? pink : white
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				<Header route={'Start'} title={I18n.t('SIGN_UP_TITLE')} />
				<KeyboardAvoidingView style={styles.keyboard} behavior={'padding'}>
					<ScrollView contentContainerStyle={[styles.scroll, styles.align]} scrollEnabled={false}>
						<View style={styles.wrapper}>
							<Text style={[styles.text, styles.left]}>{I18n.t('SIGN.ENTER_PHONE_NUMBER')}</Text>
						</View>
						<Dropdown
							data={country}
							value={phone}
							setPhoneNumber={this.handleChangePhone}
							setCode={this.handleChangeCode}
							onFocus={this.handleFocus}
							maskLength={this.handleChangeMask}
						>
							{validate && <Image style={styles.image} source={require('@assets/img/eyes.png')} />}
						</Dropdown>
						<View style={styles.wrapper}>
							<Text style={[styles.text, styles.right, { opacity: validate ? 1 : 0 }]}>
								{I18n.t('SIGN.ALREADY_REGISTARED')}
							</Text>
						</View>
						<View style={styles.wrapper}>
							<Text style={[styles.text, styles.left]}>{I18n.t('SIGN.LETS_ACQUAINTED')}</Text>
						</View>
						<View style={styles.wrapper}>
							<TextInput
								value={name}
								onChangeText={this.handleChangeName}
								onFocus={this.handleFocus}
								placeholder={I18n.t('SIGN.FIRST_SECOND_NAME')}
								placeholderTextColor={'#fff'}
								style={styles.text_input}
							/>
						</View>
						<View style={styles.wrapper}>
							<TextInput
								value={age}
								onChangeText={this.handleChangeAge}
								onFocus={this.handleFocus}
								placeholder={I18n.t('SIGN.AGE')}
								placeholderTextColor={'#fff'}
								keyboardType={'numeric'}
								maxLength={2}
								style={styles.text_input}
							/>
						</View>
						<View style={[styles.wrapper, styles.row]}>
							<Button
								rounded
								transparent
								disabled={gender === 1}
								style={[styles.button, gender === 1 && styles.active_button]}
								onPress={this.handleChangeGirl}
							>
								<Text style={[styles.title, gender === 1 && styles.active_title]}>
									{I18n.t('SIGN.GIRL')}
								</Text>
							</Button>
							<Button
								rounded
								transparent
								disabled={gender === 2}
								style={[styles.button, gender === 2 && styles.active_button]}
								onPress={this.handleChangeBoy}
							>
								<Text style={[styles.title, gender === 2 && styles.active_title]}>
									{I18n.t('SIGN.BOY')}
								</Text>
							</Button>
						</View>
						<Touchable
							color={color}
							active={accept}
							disabled={!accept}
							handler={this.handleSignUp}
							title={I18n.t('SIGN_UP').toUpperCase()}
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
	sign_up: state.sign_up,
	sign_up_confirm: state.sign_up_confirm,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			signUp,
			signUpConfirm,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignUp)
