import React from 'react'
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//containers
import BackButton from '@containers/back/back'
import CustomButton from '@containers/custom-button/custom-button'
import SignForm from '@containers/signForm/signForm'
//reducers
import { loaderState } from '@reducers/loader'
//services
import NavigationService from '@services/route'
import { httpPost } from '@services/http'
//constants
import { urls } from '@constants/urls'
//locales
import I18n from '@locales/I18n'
//style
import styles from './style'

class Registration extends React.Component {
	static navigationOptions = () => ({
		headerLeft: <BackButton title={I18n.t('BACK')} route='Start' />,
		title: I18n.t('SIGN_UP_TITLE'),
		headerStyle: styles.headerBackground,
		headerTitleStyle: styles.headerTitle,
	})

	state = {
		phoneNumber: '',
		code: '',
		name: '',
		age: '',
		notCorrect: false,
		gender: 0,
	}

	componentDidMount() {
		this.props.loaderState(false)
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

	fieldsValue() {
		return this.state.phoneNumber.length === 12 &&
			this.state.code &&
			this.state.name.length >= 2 &&
			this.state.age &&
			this.state.gender
			? true
			: false
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
					gender: `${this.state.gender - 1}`,
					age: this.state.age,
				})
			},
			(error) => {
				this.setState({ notCorrect: true })
				this.props.loaderState(false)
			},
		)
	}

	addTextFirstName = (value) => {
		this.setState({
			name: value,
		})
	}

	restrict = (event) => {
		const regex = new RegExp('/^[^!-\\/:-@\\[-`{-~]+$/;')

		const key = String.fromCharCode(!event.charCode ? event.which : event.charCode)

		if (!regex.test(key)) {
			event.preventDefault()
			return false
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
						<View style={styles.fullWidth}>
							<Text style={styles.textLeft}>{I18n.t('SIGN.ENTER_PHONE_NUMBER')}</Text>
						</View>
						<SignForm
							data={this.props.countries}
							value={this.state.phoneNumber}
							setPhoneNumber={(value) => this.setState({ phoneNumber: value })}
							setCode={(value) => this.setState({ code: value })}
							onFocus={() => this.setState({ notCorrect: false })}
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
								// onChangeText={(value) => this.setState({ name: value })}
								placeholder={I18n.t('SIGN.FIRST_SECOND_NAME')}
								style={styles.textInput}
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
								onKeyPress={(e) => this.restrict(e)}
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
								type={'custom'}
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
								this.newRegister()
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
	countries: state.countries,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Registration)
