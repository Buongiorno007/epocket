import React from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, Keyboard, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from 'native-base'
import FastImage from 'react-native-fast-image'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loaderState } from '../../../reducers/loader'
import { setBalance } from '@reducers/user-balance'
//constants
import styles from './styles'
import { ICONS } from '../../../constants/icons'
//services
import NavigationService from './../../../services/route'
import { httpPost } from '../../../services/http'
import { urls } from '../../../constants/urls'
import I18n from '@locales/I18n'
import AndroidHeader from '@containers/androidHeader/androidHeader'
import BackButton from '@containers/back/back'

class RefillMobile extends React.Component {
	static navigationOptions = () => ({
		headerLeft: <BackButton title={I18n.t('BACK')} route='Main' />,
		title: I18n.t('REFILL_SCREEN'),
		headerStyle: styles.headerBackground,
		headerTitleStyle: styles.headerTitle,
	})
	state = {
		amount: '',
		done: false,
		currency: '',
		phone: '',
		maxValue: 0,
		minValue: 0,
		tax: 0,
		currentValue: 0,
	}
	navigateBack = () => {
		NavigationService.navigate('Main')
	}
	componentDidMount = () => {
		this.props.loaderState(true)
		const { currency, phone, maxValue, minValue, tax, currentValue } = this.props.navigation.state.params
		this.setState({
			currency: currency || 'грн',
			phone: phone || '',
			maxValue: maxValue || 0,
			minValue: minValue || 0,
			tax: tax || 0,
			currentValue: currentValue || 0,
		})
		this.props.loaderState(false)
	}

	firstScreen() {
		return (
			<ScrollView
				scrollEnabled={false}
				keyboardShouldPersistTaps={'handled'}
				//   style={styles.scrollView}
				contentContainerStyle={styles.scrollView}
			>
				<View>
					<Text style={styles.header}>{'Пополнение вашего мобильного'}</Text>
				</View>
				<View>
					<Text style={styles.subHead}>{'Введите сумму пополнения'}</Text>
				</View>
				<TextInput
					style={styles.input}
					keyboardType='numeric'
					onChangeText={(amount) => this.handleChange(amount)}
					value={this.state.amount}
					maxLength={`${this.state.maxValue}`.length}
				/>
				<View>
					<Text style={styles.subHead2}>
						{`Сумма пополнения ${this.state.minValue} - ${this.state.maxValue} ${this.state.currency}`}
					</Text>

					<Text style={styles.subHead2}>{`*Комиссия ${this.state.tax} ${this.state.currency}`}</Text>
				</View>

				<Button
					rounded
					block
					style={styles.button}
					onPress={() => {
						this.checkValidation()
					}}
				>
					<Text style={[styles.buttonText, { color: this.props.userColor.second_gradient_color }]}>
						{I18n.t('ACCEPT')}
					</Text>
				</Button>
			</ScrollView>
		)
	}

	doneScreen() {
		return (
			<View style={styles.scrollView}>
				<Text style={styles.header}>{'Спасибо'}</Text>
				<Text style={styles.successText}>{`Ваш счет скоро будет пополнен \n ${this.state.phone}`}</Text>
				<Button
					rounded
					block
					style={styles.button}
					onPress={() => {
						this.navigateBack()
					}}
				>
					<Text style={[styles.buttonText, { color: this.props.userColor.second_gradient_color }]}>
						{I18n.t('OK')}
					</Text>
				</Button>
			</View>
		)
	}

	noMoneyScreen() {
		return (
			<View style={styles.scrollView}>
				<Text style={styles.noMoney}>{'Ваш лимит пополнения в этом месяце исчерпан'}</Text>
			</View>
		)
	}

	handleChange(amount) {
		if (!amount.includes('.') && !amount.includes(',')) {
			this.setState({ amount })
		} else {
			Alert.alert('Allow only numbers', '', [{ text: 'OK', onPress: () => {} }], { cancelable: false })
		}
	}

	checkSend(amount, maxValue, minValue, tax, currentValue) {
		const obj = { status: false, msg: '' }
		if (Number(amount) >= minValue) {
			if (Number(amount) <= tax + currentValue) {
				if (Number(amount) <= maxValue) {
					obj.status = true
				} else {
					obj.msg = `Max value ${maxValue}`
				}
			} else {
				obj.msg = `Not enpugh bonuses ${currentValue}`
			}
		} else {
			obj.msg = `Min refill amount ${minValue}`
		}
		return obj
	}

	checkValidation() {
		const { amount, maxValue, minValue, tax, currentValue } = this.state
		const tempObject = this.checkSend(amount, maxValue, minValue, tax, currentValue)

		if (tempObject.status) {
			this.props.loaderState(true)
			let body = {
				type: 'true',
				amount: amount,
			}
			httpPost(urls.refill_mobile, JSON.stringify(body), this.props.token).then(
				(result) => {
					this.setState({ done: !this.state.done })
					this.props.loaderState(false)
					this.props.setBalance(result.body.user_wallet_amount)
				},
				(error) => {
					Alert.alert(`code: ${error.code}`, '', [{ text: 'OK', onPress: () => {} }], {
						cancelable: false,
					})
					this.props.loaderState(false)
				},
			)
		} else {
			Alert.alert(tempObject.msg, '', [{ text: 'OK', onPress: () => {} }], {
				cancelable: false,
			})
		}
	}

	render() {
		return (
			<LinearGradient
				colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
				start={{ x: 1.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={styles.container}
			>
				<AndroidHeader route='Main' title={I18n.t('REFILL_SCREEN')} />
				<KeyboardAvoidingView behavior='padding' style={styles.grad}>
					{this.state.maxValue
						? !this.state.done
							? this.firstScreen()
							: this.doneScreen()
						: this.noMoneyScreen()}
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userColor: state.userColor,
		token: state.token,
		location: state.location,
		loader: state.loader,
		profileState: state.profileState,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			setBalance,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RefillMobile)
