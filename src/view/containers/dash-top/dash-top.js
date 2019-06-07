import React from 'react'
import { View, Text, Animated } from 'react-native'
import FastImage from 'react-native-fast-image'
//constants
import styles from './styles'
import { ICONS } from '../../../constants/icons'
import { colors } from './../../../constants/colors'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDashboardState } from '../../../reducers/dashboard-state'
import LinearGradient from 'react-native-linear-gradient'
import { LinearTextGradient } from 'react-native-text-gradient'
import { Button } from 'native-base'
import I18n from '@locales/I18n'

//this.props.mainMissionPrice
class DashTop extends React.Component {
	state = {
		currency: '',
	}
	componentDidMount() {
		this.setState({ currency: this.props.profileState.currency })
	}

	render() {
		return !this.props.activeCard ? (
			<View style={styles_top.content}>
				<View style={styles.epc_counter_container}>
					<Animated.Text
						style={[
							styles.epc_counter,
							// { fontSize: this.state.epcСounterFontSize }
						]}
					>
						{this.props.mainMissionPrice}
					</Animated.Text>
					<View style={styles.epc_counter_info}>
						<Text style={styles.epc}>{I18n.t('EPC', { currency: this.state.currency })}</Text>
						<Text style={styles.epc_info}>{I18n.t('FOR_BEING_IN_MALL')}</Text>
						<Text style={styles.epc_info}>{I18n.t('TIME_STARTED')}</Text>
					</View>
				</View>
				<View style={styles.time_counter_container}>
					<View style={styles.time_counter}>
						<Text style={styles.time_counter_text}>
							{this.props.timer.hours < 10 && '0'}
							{this.props.timer.hours}
						</Text>
					</View>
					<View>
						<Text style={styles.time_divider}>:</Text>
					</View>
					<View style={styles.time_counter}>
						<Text style={styles.time_counter_text}>
							{this.props.timer.minutes < 10 && '0'}
							{this.props.timer.minutes}
						</Text>
					</View>
					<View>
						<Text style={styles.time_divider}>:</Text>
					</View>
					<View style={styles.time_counter}>
						<Text style={styles.time_counter_text}>
							{this.props.timer.seconds < 10 && '0'}
							{this.props.timer.seconds}
						</Text>
					</View>
				</View>
				<View style={this.props.timer_status ? styles.disabled : styles.main_task_expired_container} />
			</View>
		) : (
			<View style={styles.content}>
				<LinearGradient
					colors={[
						this.props.userColor.second_gradient_color_02,
						this.props.userColor.first_gradient_color_02,
					]}
					start={{ x: 0.0, y: 5.0 }}
					end={{ x: 1.0, y: 5.0 }}
					style={styles.location}
				>
					<View style={styles.location_left}>
						<FastImage
							resizeMode={FastImage.resizeMode.contain}
							style={styles.icon}
							source={{ uri: ICONS.COMMON.LOCATION_PINK }}
						/>
						<View>
							<LinearTextGradient
								locations={[0, 1]}
								colors={[this.props.userColor.orange, this.props.userColor.pink]}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 0.5, y: 0.2 }}
								style={styles.up_text}
							>
								{I18n.t('YOU_ARE_HERE')}
							</LinearTextGradient>
							<LinearTextGradient
								locations={[0, 1]}
								colors={[this.props.userColor.orange, this.props.userColor.pink]}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 0.5, y: 0.2 }}
								style={styles.down_text}
								numberOfLines={1}
							>
								{this.props.selectedMall.name}
							</LinearTextGradient>
						</View>
					</View>
					<View style={[styles.middle_border, { borderColor: this.props.userColor.pink_02 }]} />
					<View style={styles.location_right}>
						<FastImage
							resizeMode={FastImage.resizeMode.contain}
							style={styles.icon}
							source={{ uri: ICONS.COMMON.CASH_EPC_PINK }}
						/>
						<View>
							<LinearTextGradient
								locations={[0, 1]}
								colors={[this.props.userColor.orange, this.props.userColor.pink]}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 0.5, y: 0.2 }}
								style={styles.up_text}
							>
								{I18n.t('YOUR_BONUS')}
							</LinearTextGradient>
							<LinearTextGradient
								locations={[0, 1]}
								colors={[this.props.userColor.orange, this.props.userColor.pink]}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 0.5, y: 0.2 }}
								style={styles.down_text}
							>
								{this.props.balance} {I18n.t('EPC', { currency: this.state.currency })}
							</LinearTextGradient>
						</View>
					</View>
				</LinearGradient>

				<View style={this.props.dashboardState === 1 ? null : styles.disabled}>
					<View style={this.props.timer_status ? null : styles.disabled}>
						<View style={styles.epc_counter_container}>
							<LinearTextGradient
								locations={[0, 1]}
								colors={[this.props.userColor.orange, this.props.userColor.pink]}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 0.5, y: 0.2 }}
								style={styles.epc_counter}
							>
								{this.props.mainMissionPrice}
							</LinearTextGradient>
							<View style={styles.epc_counter_info}>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[this.props.userColor.orange, this.props.userColor.pink]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.epc}
								>
									{I18n.t('EPC', { currency: this.state.currency })}
								</LinearTextGradient>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[this.props.userColor.orange, this.props.userColor.pink]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.epc_info}
								>
									{I18n.t('FOR_BEING_IN_MALL')}
								</LinearTextGradient>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[this.props.userColor.orange, this.props.userColor.pink]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.epc_info}
								>
									{I18n.t('TIME_STARTED')}
								</LinearTextGradient>
							</View>
						</View>
						<View style={styles.time_counter_container}>
							<LinearGradient
								colors={[
									this.props.userColor.second_gradient_color_02,
									this.props.userColor.first_gradient_color_02,
								]}
								start={{ x: 0.0, y: 5.0 }}
								end={{ x: 1.0, y: 5.0 }}
								style={styles.time_counter}
							>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[
										this.props.userColor.second_gradient_color,
										this.props.userColor.first_gradient_color,
									]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.time_counter_text}
								>
									{this.props.timer.hours < 10 && '0'}
									{this.props.timer.hours}
								</LinearTextGradient>
							</LinearGradient>
							<View>
								<Text style={styles.time_divider_pink}>:</Text>
							</View>
							<LinearGradient
								colors={[
									this.props.userColor.second_gradient_color_02,
									this.props.userColor.first_gradient_color_02,
								]}
								start={{ x: 0.0, y: 5.0 }}
								end={{ x: 1.0, y: 5.0 }}
								style={styles.time_counter}
							>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[
										this.props.userColor.second_gradient_color,
										this.props.userColor.first_gradient_color,
									]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.time_counter_text}
								>
									{this.props.timer.minutes < 10 && '0'}
									{this.props.timer.minutes}
								</LinearTextGradient>
							</LinearGradient>
							<View>
								<Text style={styles.time_divider_pink}>:</Text>
							</View>
							<LinearGradient
								colors={[
									this.props.userColor.second_gradient_color_02,
									this.props.userColor.first_gradient_color_02,
								]}
								start={{ x: 0.0, y: 5.0 }}
								end={{ x: 1.0, y: 5.0 }}
								style={styles.time_counter}
							>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[
										this.props.userColor.second_gradient_color,
										this.props.userColor.first_gradient_color,
									]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.time_counter_text}
								>
									{this.props.timer.seconds < 10 && '0'}
									{this.props.timer.seconds}
								</LinearTextGradient>
							</LinearGradient>
						</View>
					</View>
					<View style={this.props.timer_status ? styles.disabled : styles.main_task_expired_container} />
				</View>
				<Button
					transparent
					style={this.props.dashboardState === 2 ? styles.small_head : styles.disabled}
					onPress={() => {
						this.props.setDashboardState(1)
					}}
				>
					<View style={this.props.timer_status ? styles.small_head : styles.disabled}>
						<View style={styles.small_epc_counter_container}>
							<LinearTextGradient
								locations={[0, 1]}
								colors={[this.props.userColor.orange, this.props.userColor.pink]}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 0.5, y: 0.2 }}
								style={styles.small_epc_counter}
							>
								{this.props.mainMissionPrice}
							</LinearTextGradient>
							<LinearTextGradient
								locations={[0, 1]}
								colors={[this.props.userColor.orange, this.props.userColor.pink]}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 0.5, y: 0.2 }}
								style={styles.time_counter_text}
							>
								{I18n.t('EPC', { currency: this.state.currency })}
							</LinearTextGradient>
						</View>
						<View style={styles.small_time_counter_container}>
							<LinearGradient
								colors={[
									this.props.userColor.second_gradient_color_02,
									this.props.userColor.first_gradient_color_02,
								]}
								start={{ x: 0.0, y: 5.0 }}
								end={{ x: 1.0, y: 5.0 }}
								style={styles.small_time_counter}
							>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[
										this.props.userColor.second_gradient_color,
										this.props.userColor.first_gradient_color,
									]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.time_counter_text}
								>
									{this.props.timer.hours < 10 && '0'}
									{this.props.timer.hours}
								</LinearTextGradient>
							</LinearGradient>
							<View>
								<Text style={styles.time_divider_pink}>:</Text>
							</View>
							<LinearGradient
								colors={[
									this.props.userColor.second_gradient_color_02,
									this.props.userColor.first_gradient_color_02,
								]}
								start={{ x: 0.0, y: 5.0 }}
								end={{ x: 1.0, y: 5.0 }}
								style={styles.small_time_counter}
							>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[
										this.props.userColor.second_gradient_color,
										this.props.userColor.first_gradient_color,
									]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.time_counter_text}
								>
									{this.props.timer.minutes < 10 && '0'}
									{this.props.timer.minutes}
								</LinearTextGradient>
							</LinearGradient>
							<View>
								<Text style={styles.time_divider_pink}>:</Text>
							</View>
							<LinearGradient
								colors={[
									this.props.userColor.second_gradient_color_02,
									this.props.userColor.first_gradient_color_02,
								]}
								start={{ x: 0.0, y: 5.0 }}
								end={{ x: 1.0, y: 5.0 }}
								style={styles.small_time_counter}
							>
								<LinearTextGradient
									locations={[0, 1]}
									colors={[
										this.props.userColor.second_gradient_color,
										this.props.userColor.first_gradient_color,
									]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 0.5, y: 0.2 }}
									style={styles.time_counter_text}
								>
									{this.props.timer.seconds < 10 && '0'}
									{this.props.timer.seconds}
								</LinearTextGradient>
							</LinearGradient>
						</View>
					</View>

					<View style={this.props.timer_status ? styles.disabled : styles.main_task_expired_container} />
				</Button>
			</View>
		)
	}
}
const mapStateToProps = (state) => ({
	selectedMall: state.selectedMall,
	balance: state.balance,
	userColor: state.userColor,
	activeCard: state.activeCard,
	timer: state.timer,
	timer_status: state.timer_status,
	dashboardState: state.dashboardState,
	profileState: state.profileState,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setDashboardState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DashTop)
