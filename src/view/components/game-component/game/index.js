import React from 'react'
import { View, Text, Dimensions, ImageBackground, Platform } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BackgroundTimer from 'react-native-background-timer'
//redux
import { loaderState } from '@reducers/loader'
import { playClock, stopClock, playQuestComplete, playQuestFail } from '@reducers/sounds'
//constants
import styles from './styles'
//containers
import CustomButton from '@containers/custom-button/custom-button'
import CustomProgressBar from '@containers/custom-progress-bar/custom-progress-bar'
//services
import { toHHMMSS } from '@services/convert-time'
import I18n from '@locales/I18n'
import { setSounds } from '@reducers/sounds'
import route from '@services/route'

const { width } = Dimensions.get('window')

class Gamee extends React.Component {
	state = {
		progress: 1,
		buttonActive: true,
		progressGradient: {
			colors: [this.props.userColor.second_gradient_color, this.props.userColor.first_gradient_color],
			start: { x: 0.0, y: 1.0 },
			end: { x: 1.0, y: 0.0 },
		},
		tempTime: 60,
		but: [false, false, false, false, false, false, false, false, false],
	}

	componentDidMount = async () => {
		this.setState({
			tempTime: this.props.gameProcess.time - 1,
		})
		await this.startInterval()
		await this.props.loaderState(false)
	}

	componentWillUnmount() {
		BackgroundTimer.stopBackgroundTimer()
	}

	startInterval() {
		this.setState({ progress: 0 })
		BackgroundTimer.runBackgroundTimer(() => {
			this.timerTask()
		}, 900)
	}

	timerTask() {
		if (this.state.tempTime) {
			this.setState({ tempTime: this.state.tempTime - 1 })
		} else {
			if (this.state.buttonActive) {
				this.submitGame()
			}
		}
		if (this.state.tempTime === 5) {
			this.props.playClock(this.props.sounds[0])
		}
	}

	submitGame() {
		this.setState({ buttonActive: false })
		BackgroundTimer.stopBackgroundTimer()
		console.log(this.state.but, 'STATE BUT')
		this.props.loaderState(true)
		route.navigate('Main')
	}

	changeItem = (index) => {
		this.setState({})
		this.state.but[index] = !this.state.but[index]
	}

	render() {
		// console.log(this.props.gameProcess, 'GAMEPROCESS')
		return (
			<View style={styles.main_view}>
				<View style={styles.game_title}>
					<Text style={styles.game_cost_text}>
						{this.props.gameProcess.amount} {I18n.t('EPC', { currency: this.props.profileState.currency })}
					</Text>
					<Text style={styles.game_title_text}>{this.props.gameProcess.title}</Text>
					<Text style={styles.game_time_text}>{toHHMMSS(this.state.tempTime)}</Text>
				</View>
				<CustomProgressBar
					style={styles.custom_progress}
					gradient={this.state.progressGradient}
					animationType={'timing'}
					borderWidth={0}
					borderRadius={12}
					height={5}
					animationConfig={{ duration: this.props.gameProcess.time * 1000 }}
					progress={this.state.progress}
					width={width - 32}
					useNativeDriver={true}
					unfilledColor={this.props.userColor.black_o90}
				/>
				<Text style={styles.game_description_text}>{this.props.gameProcess.descr}</Text>
				<ImageBackground source={{ uri: this.props.gameProcess.image }} style={styles.container}>
					{this.state.but.map((item, index) => {
						return (
							<Button
								key={index}
								transparent
								bordered={false}
								style={[
									item
										? index >= 6
											? styles.pressed_button_last_line
											: styles.pressed_button
										: index >= 6
										? styles.item_last_line
										: styles.item,
								]}
								onPress={() => this.changeItem(index)}
							/>
						)
					})}
				</ImageBackground>
				<View style={styles.btn_container}>
					<CustomButton
						active={this.state.buttonActive}
						short
						gradient
						title={I18n.t('GAME.CONFIRM').toUpperCase()}
						color={this.props.userColor.white}
						handler={() => {
							this.submitGame()
						}}
					/>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userColor: state.userColor,
		sounds: state.sounds,
		profileState: state.profileState,
		gameProcess: state.gameProcess,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			playClock,
			stopClock,
			playQuestComplete,
			playQuestFail,
			setSounds,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Gamee)
