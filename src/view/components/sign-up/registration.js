import React from 'react'
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
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
//constants
import { urls } from '@constants/urls'
import { ICONS } from '@constants/icons'
//locales
import I18n from '@locales/I18n'
//style
import styles from './style'

class Registration extends React.Component {
	state = {
		phoneNumber: '',
		code: '',
		name: '',
		age: '',
		notCorrect: false,
		gender: 0,
		user_id: '',
		sms_active: false,
		maskLength: 0,
	}

	componentDidMount() {
		httpGet(urls.echo).then((result) => {
			this.setState({ sms_active: result.body.sms_active || false })
		})
		this.props.loaderState(false)
	}

	componentDidUpdate(prevProps, prevState) {
		const { phoneNumber, code, name, age, gender } = this.state
		if (
			prevState.phoneNumber !== phoneNumber ||
			prevState.code !== code ||
			prevState.name !== name ||
			prevState.age !== age ||
			prevState.gender !== gender
		) {
			const check = phoneNumber.length === this.state.maskLength && code && name.length >= 2 && age && gender
			this.setState({ acceptButton: check })
		}
	}

	addTextFirstName = (value) => {
		let Reg61 = /^.*[^A-zА-яЁё ].*$/
		if (Reg61.test(value)) {
			console.log('Not only letters')
		} else {
			this.setState({
				name: value,
			})
		}
	}

	newRegister = () => {
		this.props.loaderState(true)
		let body = {
			phone: '+' + `${this.state.code}${this.state.phoneNumber}`.replace(/\D/g, ''),
		}
		httpPost(urls.sign_up, JSON.stringify(body)).then(
			(result) => {
				NavigationService.navigate('ConfirmCode', {
					back: 'Registration',
					title: I18n.t('SIGN_UP_TITLE'),
					phone: body.phone,
					name: this.state.name,
					gender: this.state.gender,
					age: this.state.age,
				})
			},
			(error) => {
				this.setState({ notCorrect: true })
				this.props.loaderState(false)
			},
		)
	}

	whileNoCodeConfirm() {
		this.props.loaderState(true)
		const { code, phoneNumber, name, age, gender, user_id } = this.state
		const body = {
			phone: '+' + `${code}${phoneNumber}`.replace(/\D/g, ''),
			code: '123456',
			name: name,
			user_id: user_id,
			birth_year: age,
			sex: `${gender - 1}`,
		}
		httpPost(urls.sign_up_confirm, JSON.stringify(body)).then(
			(result) => {
				const new_user = {
					name: name,
					phone: body.phone,
					sex: gender - 1,
					birthDay: age,
					currency: I18n.locale === 'en' ? result.body.currency : result.body.currency_plural,
					photo: result.body.photo,
				}
				this.props.saveUser(new_user)
				this.props.setToken(result.body.token)
				this.props.setBalance(0)
				this.props.setColor(new_user.sex)
				NavigationService.navigate('Main')
			},
			(error) => {
				this.props.loaderState(false)
				this.setState({ notCorrect: true })
				console.log(error, 'REGISTRATION ERROR')
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
				<AndroidHeader route='Start' title={I18n.t('SIGN_UP_TITLE')} />
				<KeyboardAvoidingView behavior='padding' style={styles.grad}>
					<ScrollView contentContainerStyle={styles.scrollView}>
						<View style={styles.fullWidth}>
							<Text style={styles.textLeft}>{I18n.t('SIGN.ENTER_PHONE_NUMBER')}</Text>
						</View>
						<SignForm
							data={this.props.country}
							value={this.state.phoneNumber}
							setPhoneNumber={(value) => this.setState({ phoneNumber: value })}
							setCode={(value) => this.setState({ code: value })}
							onFocus={() => this.setState({ notCorrect: false })}
							maskLength={(value) => this.setState({ maskLength: value })}
						>
							{this.state.notCorrect && (
								<Image style={styles.eye} source={require('@assets/img/eyes.png')} />
							)}
						</SignForm>
						<View style={styles.fullWidth}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								{I18n.t('SIGN.ALREADY_REGISTARED')}
							</Text>
						</View>
						<View style={styles.fullWidth}>
							<Text style={styles.textLeft}>{I18n.t('SIGN.LETS_ACQUAINTED')}</Text>
						</View>
						<View style={styles.fullWidth}>
							<TextInput
								value={this.state.name}
								placeholder={I18n.t('SIGN.FIRST_SECOND_NAME')}
								style={styles.textInput}
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
								onChangeText={(value) => this.addTextFirstName(value)}
							/>
						</View>
						<View style={styles.fullWidth}>
							<TextInput
								style={styles.textInput}
								placeholder={I18n.t('SIGN.AGE')}
								value={this.state.age}
								keyboardType={'numeric'}
								onChangeText={(value) => this.setState({ age: value })}
								maxLength={2}
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
							/>
						</View>
						<View style={styles.buttonsBlock}>
							<TouchableOpacity
								style={[styles.leftButton, this.state.gender === 1 ? styles.genderActive : null]}
								onPress={() => this.setState({ gender: 1 })}
							>
								<Text style={this.state.gender === 1 ? styles.genderActiveText : styles.genderText}>
									{I18n.t('SIGN.GIRL')}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.rightButton, this.state.gender === 2 ? styles.genderActive : null]}
								onPress={() => this.setState({ gender: 2 })}
							>
								<Text style={this.state.gender === 2 ? styles.genderActiveText : styles.genderText}>
									{I18n.t('SIGN.BOY')}
								</Text>
							</TouchableOpacity>
						</View>
						<CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.state.sms_active ? this.newRegister() : this.whileNoCodeConfirm()
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
	country: state.country.list,
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
)(Registration)
