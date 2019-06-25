import React from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, Alert, Keyboard } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { request } from '@reducers/bonuses'
import { payment } from '@reducers/refill'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@containers/androidHeader/androidHeader'
import I18n from '@locales/I18n'
import route from '@services/route'
import styles from './styles'

type Props = {
	first: string,
	second: string,
} & typeof defaultProps

type State = typeof initialState

const initialState = {
	amount: '',
}

const defaultProps = {
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class Refill extends React.Component<Props, State> {
	static defaultProps = defaultProps

	state = initialState

	componentDidMount() {
		route.goBackPress('Main')
		this.props.request()
	}

	handleChangeAmount = (amount) => {
		if (!amount.includes('.') && !amount.includes(',')) {
			this.setState({ amount })
		} else {
			Alert.alert(I18n.t('REFILL.NUMBER'), '', [{ text: I18n.t('OK'), onPress: () => {} }], { cancelable: false })
		}
	}

	handleValidation = () => {
		const { amount } = this.state
		const { min, max, tax, currency } = this.props.bonuses
		const value = Number(amount)
		const response = { status: false, message: '' }
		if (value >= min) {
			if (value <= tax + currency) {
				if (value <= max) {
					response.status = true
				} else {
					response.message = I18n.t('REFILL.MAX', { max, currency })
				}
			} else {
				response.message = I18n.t('REFILL.NOT_ENOUGH', { currency })
			}
		} else {
			response.message = I18n.t('REFILL.MIN', { min, currency })
		}
		return response
	}

	handleRefill = () => {
		Keyboard.dismiss()
		const { amount } = this.state
		const { status, message } = this.handleValidation()
		if (status) {
			this.props.payment(amount)
		} else {
			Alert.alert(I18n.t('TITLE'), message, [{ text: I18n.t('OK'), onPress: () => {} }], { cancelable: false })
		}
	}

	render() {
		const { amount } = this.state
		const { first, second, start, end } = this.props
		const colors = [first, second]
		const { code, min, max, currency, tax } = this.props.bonuses
		const length = String(max).length
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				{code && (
					<React.Fragment>
						<Header route={'Main'} title={I18n.t('REFILL.HEADER')} />
						<KeyboardAvoidingView behavior='padding' style={styles.keyboard}>
							<ScrollView
								contentContainerStyle={styles.scroll}
								showsVerticalScrollIndicator={false}
								keyboardShouldPersistTaps={'never'}
								overScrollMode={'always'}
							>
								<View style={styles.wrapper}>
									<Text style={styles.title}>{I18n.t('REFILL.PAYMENT')}</Text>
								</View>
								<View style={styles.wrapper}>
									<Text style={styles.sub_title}>{I18n.t('REFILL.PAYMENT_SUMM')}</Text>
								</View>
								<TextInput
									style={styles.field}
									keyboardType='numeric'
									onChangeText={this.handleChangeAmount}
									value={amount}
									maxLength={length}
								/>
								<View style={styles.wrapper}>
									<Text style={styles.description}>
										{I18n.t('REFILL.PERMISSION', { min, max, currency })}
									</Text>
									<Text style={styles.description}>
										{I18n.t('REFILL.COMMISSION', { tax, currency })}
									</Text>
								</View>
								<Button rounded block style={styles.button} onPress={this.handleRefill}>
									<Text style={[styles.text, { color: second }]}>{I18n.t('ACCEPT')}</Text>
								</Button>
							</ScrollView>
						</KeyboardAvoidingView>
					</React.Fragment>
				)}
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	bonuses: state.bonuses,
	first: state.userColor.first_gradient_color,
	second: state.userColor.second_gradient_color,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			request,
			payment,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Refill)
