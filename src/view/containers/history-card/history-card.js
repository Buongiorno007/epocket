import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import { LinearTextGradient } from 'react-native-text-gradient'
//containers
import CustomAlert from '../custom-alert/custom-alert'
//constants
import styles from './styles'
import { colors } from './../../../constants/colors'
//redux
import { getBonuses } from '../../../reducers/history-bonuses'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleError } from '../../../services/http-error-handler'
//services
import moment from 'moment'
import I18n from '@locales/I18n'

class HistoryCard extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		errorVisible: false,
		errorText: '',
		timeZome: parseInt(moment().format('Z')),
		currency: '',
	}
	componentDidMount() {
		if (this.props.info.error && this.props.info.error !== 401) {
			let error_respons = handleError(
				{ code: this.props.info.error },
				{},
				'',
				this.props.token,
				this.constructor.name,
				'componentDidMount',
			)
			this.setState({
				errorText: error_respons.error_text,
				errorVisible: true,
			})
		}
		this.setState({ currency: this.props.profileState.currency })
	}
	setModalVisible = (visible) => {
		this.setState({ errorVisible: visible })
	}
	format = (input) => {
		let pattern = /(\d{4})\-(\d{2})\-(\d{2})/
		if (!input || !input.match(pattern)) {
			return null
		}
		return input.replace(pattern, '$3.$2.$1')
	}
	render() {
		return (
			<View>
				{this.props.info.error ? (
					<CustomAlert
						title={this.state.errorText}
						first_btn_title={I18n.t('REPEAT')}
						visible={this.state.errorVisible}
						first_btn_handler={() => {
							this.props.getBonuses(this.props.token, 10, 10)
						}}
						decline_btn_handler={() => {
							this.setModalVisible(!this.state.errorVisible)
						}}
					/>
				) : (
					<View>
						{this.props.type === 'received' ? (
							<View style={styles.received_card}>
								<View style={styles.cost}>
									<Text style={styles.price_text}>
										{Number(this.props.info.price)}{' '}
										{I18n.t('EPC', { currency: this.state.currency })}
									</Text>
								</View>
								<View style={styles.name}>
									<LinearTextGradient
										numberOfLines={1}
										locations={[0, 1]}
										colors={[
											this.props.userColor.second_gradient_color,
											this.props.userColor.first_gradient_color,
										]}
										start={{ x: 0.0, y: 1.0 }}
										end={{ x: 1.0, y: 1.0 }}
										style={styles.name_text}
									>
										{this.props.info.trade_point_name.toUpperCase()}
									</LinearTextGradient>
								</View>
								<View style={styles.date}>
									<Text style={styles.date_text}>
										{
											moment(this.props.info.date)
												.add(this.state.timeZome, 'hours')
												.format()
												.split('T')[1]
												.split('+')[0]
										}
									</Text>
									<Text style={styles.date_text}>
										{this.format(this.props.info.date.split('T')[0].split(' ')[0])}
									</Text>
								</View>
							</View>
						) : (
							<View style={styles.spent_card}>
								<View style={styles.name_and_price}>
									<LinearTextGradient
										numberOfLines={2}
										locations={[0, 1]}
										colors={[
											this.props.userColor.first_gradient_color,
											this.props.userColor.second_gradient_color,
										]}
										start={{ x: 0.0, y: 1.0 }}
										end={{ x: 1.0, y: 1.0 }}
										style={styles.item_name_text}
									>
										{this.props.info.product_name}
									</LinearTextGradient>
									<Text style={styles.amount}>
										{Number(this.props.info.price)} x {this.props.info.amount} ={' '}
										{Number(this.props.info.price * this.props.info.amount)}{' '}
										{I18n.t('EPC', { currency: this.state.currency })}
									</Text>
								</View>
								<View style={styles.date}>
									<Text style={styles.date_text}>
										{
											moment(this.props.info.date)
												.add(this.state.timeZome, 'hours')
												.format()
												.split('T')[1]
												.split('+')[0]
										}
									</Text>
									<Text style={styles.date_text}>
										{this.format(this.props.info.date.split('T')[0].split(' ')[0])}
									</Text>
								</View>
							</View>
						)}
					</View>
				)}
			</View>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		token: state.token,
		userColor: state.userColor,
		receivedBonusesJSX: state.receivedBonusesJSX,
		spentBonusesJSX: state.spentBonusesJSX,
		profileState: state.profileState,
	}
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ getBonuses }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HistoryCard)
