import React from 'react'
import { View, Image, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//containers
import BackButton from '@containers/back/back'
import CustomButton from '@containers/custom-button/custom-button'
import SignForm from '@containers/signForm/signForm'
import AndroidHeader from '@containers/androidHeader/androidHeader'
//reducers
import { loaderState } from '@reducers/loader'
import { saveUser } from '@reducers/profile-state'
import { setColor } from '@reducers/user-color'
import { setToken } from '@reducers/token'
import { setBalance } from '@reducers/user-balance'
//services
import NavigationService from '@services/route'
import { httpPost, httpGet } from '@services/http'
import { toAge } from '@services/converteDate'
//constants
import { urls } from '@constants/urls'
//locales
import I18n from '@locales/I18n'
//style
import styles from './style'

class Login extends React.Component {
	state = {
		phoneNumber: '',
		code: '',
		notCorrect: false,
		sms_active: false,
	}

	componentDidMount() {
		httpGet(urls.echo).then((result) => {
			this.setState({ sms_active: result.body.sms_active || false })
		})
		this.props.loaderState(false)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.phoneNumber !== this.state.phoneNumber || prevState.code !== this.state.code) {
			this.state.phoneNumber.length === 12 && this.state.code
				? this.setState({ acceptButton: true })
				: this.setState({ acceptButton: false })
		}
	}

	newLogin = () => {
		this.props.loaderState(true)
		let body = {
			phone: '+' + `${this.state.code}${this.state.phoneNumber}`.replace(/\D/g, ''),
		}
		httpPost(urls.sing_in, JSON.stringify(body)).then(
			(result) => {
				NavigationService.navigate('ConfirmCode', {
					back: 'Login',
					title: I18n.t('SIGN_IN_TITLE'),
					phone: body.phone,
				})
			},
			(error) => {
				this.setState({ notCorrect: true })
				this.props.loaderState(false)
			},
		)
	}

	whileNoCodeConfirm = () => {
		this.props.loaderState(true)
		let body = {
			phone: '+' + `${this.state.code}${this.state.phoneNumber}`.replace(/\D/g, ''),
			code: '123456',
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
				//NEED ADD PUSH
				this.props.saveUser(user_info)
				this.props.setColor(user_info.sex)
				this.props.setToken(result.body.token)
				this.props.setBalance(Number(result.body.balance))
				//NEED ADD INSTAGRAM
				NavigationService.navigate('Main')
			},
			(error) => {
				this.props.loaderState(false)
				console.log(error, 'LOGIN ERROR')
			},
		)
	}

	render() {
		return (
			<LinearGradient
				colors={['#F55890', '#FF9950']}
				start={{ x: 1.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={styles.container}
			>
				<AndroidHeader route='Start' title={I18n.t('SIGN_IN_TITLE')} />
				<KeyboardAvoidingView behavior='padding' style={styles.grad}>
					<ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollView}>
						<View style={styles.fullWidth}>
							<Text style={styles.textLeft}>{I18n.t('SIGN.ENTER_PHONE_NUMBER')}</Text>
						</View>
						<SignForm
							data={this.props.country}
							value={this.state.phoneNumber}
							setPhoneNumber={(value) => this.setState({ phoneNumber: value.trim() })}
							setCode={(value) => this.setState({ code: value })}
							onFocus={() => this.setState({ notCorrect: false })}
						>
							{this.state.notCorrect && (
								<Image style={styles.eye} source={require('@assets/img/eyes.png')} />
							)}
						</SignForm>
						<View style={styles.fullWidth}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								{I18n.t('SIGN.CHECK_PHONE_NUMBER')}
							</Text>
						</View>
						<CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.state.sms_active ? this.newLogin() : this.whileNoCodeConfirm()
							}}
							active={this.state.acceptButton}
							title={I18n.t('SIGN_IN').toUpperCase()}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
	country: state.country,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			saveUser,
			setColor,
			setToken,
			setBalance,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login)
