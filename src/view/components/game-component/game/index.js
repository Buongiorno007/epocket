import React from 'react'
import { View, Text, Dimensions, ImageBackground, Platform } from 'react-native'
import { Button } from 'native-base'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BackgroundTimer from 'react-native-background-timer'
//redux
import { setGameStatus } from '@reducers/game-status'
import { setAppState } from '@reducers/app-state'
import { loaderState } from '@reducers/loader'
import { passGameResult } from '@reducers/game-info'
import { playClock, stopClock, playQuestComplete, playQuestFail } from '@reducers/sounds'
import { editGame, clearGame } from '@reducers/game-controller'
//constants
import { ICONS } from '@constants/icons'
import styles from './styles'
//containers
import CustomButton from '@containers/custom-button/custom-button'
import CustomProgressBar from '@containers/custom-progress-bar/custom-progress-bar'
//services
import { toHHMMSS } from '@services/convert-time'
import I18n from '@locales/I18n'
import { setSounds } from '@reducers/sounds'

const ttttTime = 30
const { width } = Dimensions.get('window')

class Gamee extends React.Component {
	interv
	state = {
		progress: 1,
		buttonActive: true,
		progressGradient: {
			colors: [this.props.userColor.second_gradient_color, this.props.userColor.first_gradient_color],
			start: { x: 0.0, y: 1.0 },
			end: { x: 1.0, y: 0.0 },
		},
		currency: '',
		tempTime: 60,
		but: [false, false, false, false, false, false, false, false, false],
	}

	componentDidMount = () => {
		this.setState({
			currency: this.props.profileState.currency || '',
			tempTime: ttttTime || 0,
		})
		this.startInterval()
		this.props.loaderState(false)
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
			this.submitGame()
		}
		if (this.state.tempTime === 5) {
			this.props.playClock(this.props.sounds[0])
		}
	}

	goToResult = (status) => {
		let status_for_api = status === 'success' ? true : false
		let instadata = {
			success_image: this.props.game_info.success_image,
			base64: this.props.game_info.insta_data.base64,
			hash_tag: this.props.game_info.insta_data.hash_tag,
			video: this.props.game_info.video,
		}
		this.props.passGameResult(
			this.props.game_info.insta_data.id,
			status_for_api,
			this.props.token,
			status,
			instadata,
		)
	}

	submitGame() {
		this.setState({ buttonActive: false })
		BackgroundTimer.stopBackgroundTimer()
		console.log(this.state.but, 'STATE BUT')
		// this.props.stopClock(this.props.sounds[0])

		// let pressedArray = []
		// let pressedIndexArray = []
		// this.props.game_images.forEach((item) => {
		// 	if (item.pressed) {
		// 		pressedArray.push(item)
		// 	}
		// })
		// pressedArray.forEach((pressedItem) => {
		// 	pressedIndexArray.push(pressedItem.id)
		// })
		// if (
		// 	pressedArray.length >= 1 &&
		// 	JSON.stringify(pressedIndexArray) === JSON.stringify(this.props.game_info.true_answer)
		// ) {
		// 	//compare JSONs to compare arrays
		// 	this.props.playQuestComplete(this.props.sounds[1])
		// 	this.goToResult('success')
		// } else {
		// 	this.props.playQuestFail(this.props.sounds[2])
		// 	if (timer_expired) {
		// 		this.goToResult('expired')
		// 	} else {
		// 		this.goToResult('failed')
		// 	}
		// }
	}

	changeItem = (index) => {
		this.setState({})
		this.state.but[index] = !this.state.but[index]
	}

	render() {
		return (
			<View style={styles.main_view}>
				<View style={styles.game_title}>
					<Text style={styles.game_cost_text}>
						{/* {this.props.game_info.cost} {I18n.t('EPC', { currency: this.state.currency })} */}
						{'12 UAH'}
					</Text>
					{/* <Text style={styles.game_title_text}>{this.props.game_info.title}</Text> */}
					<Text style={styles.game_title_text}>{'Brand'}</Text>
				</View>
				<View style={styles.game_time}>
					<Text style={styles.game_time_text}>{toHHMMSS(this.state.tempTime)}</Text>
				</View>
				<CustomProgressBar
					style={styles.custom_progress}
					gradient={this.state.progressGradient}
					animationType={'timing'}
					borderWidth={0}
					borderRadius={12}
					height={5}
					// animationConfig={{ duration: this.props.tempTime * 1000 }}
					animationConfig={{ duration: ttttTime * 1000 }}
					progress={this.state.progress}
					width={width - 32}
					useNativeDriver={true}
					unfilledColor={this.props.userColor.black_o90}
				/>
				<View style={styles.game_description}>
					{/* <Text style={styles.game_description_text}>{this.props.game_info.description}</Text> */}
					<Text style={styles.game_description_text}>{'description'}</Text>
				</View>
				<ImageBackground source={require('@assets/img/sequel.png')} style={styles.container}>
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
		game_info: state.game_info,
		tempTime: state.tempTime,
		token: state.token,
		loader: state.loader,
		fixedTime: state.fixedTime,
		userColor: state.userColor,
		appState: state.appState,
		game_images: state.game_controller.game_images,
		sounds: state.sounds,
		profileState: state.profileState,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setGameStatus,
			setAppState,
			passGameResult,
			editGame,
			loaderState,
			clearGame,
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
