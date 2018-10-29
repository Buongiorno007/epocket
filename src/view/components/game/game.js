import React from 'react';
import { View, Text, Platform, Dimensions, AppState } from 'react-native';
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTempTime } from "../../../reducers/tempTime"
import { setFixedTime } from "../../../reducers/fixedTime"
import { setGameStatus } from "../../../reducers/game-status"
import { setAppState } from "../../../reducers/app-state"
import { editGame, clearGame } from "../../../reducers/game-controller"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from "../../../constants/icons";
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import CustomProgressBar from '../../containers/custom-progress-bar/custom-progress-bar';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//services
import "../../../services/correcting-interval";
import { toHHMMSS } from "./../../../services/convert-time"
import NavigationService from "./../../../services/route";
const { width } = Dimensions.get("window");

class Game extends React.Component {
	state = {
		interval: null,
		progress: 1,
		progressGradient: {
			colors: [colors.pink, colors.light_orange],
			start: { x: 0.0, y: 1.0 },
			end: { x: 1.0, y: 0.0 }
		}
	};
	changePressed(i) {
		this.props.editGame(i + 1);
	}
	goToResult = (status) => {
		let insta_data = {
			id: 0,
			hash_tag: "",
			base64: ""
		}
		NavigationService.navigate("GameResult", insta_data);
		clearCorrectingInterval(this.state.interval);
		this.props.setGameStatus(status);
	}
	startTimer = () => {
		this.setState({ progress: 0 })
		this.setState({
			interval:
				setCorrectingInterval(() => {
					if (this.props.tempTime < 1) {
						this.goToResult("expired")
					}
					this.props.setTempTime(this.props.tempTime - 1)
				}, Platform.OS === "ios" ? 1000 : 1000)
		})
	}
	submitGame = () => {
		let pressedArray = [];
		let pressedIndexArray = [];
		this.props.game_images.forEach((item) => {
			if (item.pressed) {
				pressedArray.push(item)
			}
		});
		pressedArray.forEach((pressedItem) => {
			pressedIndexArray.push(pressedItem.id)
		});
		if (pressedArray.length >= 1 && JSON.stringify(pressedIndexArray) === JSON.stringify(this.props.game_info.true_answer)) { //compare JSONs to compare arrays
			this.goToResult("success")
		}
		else {
			this.goToResult("failed")
		}
	}
	_handleAppStateChange = (nextAppState) => {
		if (this.props.appState.match(/active/) && (nextAppState === 'background')) {
			console.log("User's progress should be deleted because he closed the app")
		}
		this.props.setAppState(nextAppState)
	}
	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
		this.props.clearGame();
		if (this.props.tempTime >= 1) {
			this.startTimer()
		}
	}
	componentWillUnmount(){
		AppState.removeEventListener('change', this._handleAppStateChange);
	}
	render() {
		return (
			<View style={styles.main_view}>
				<View style={styles.game_title}>
					<Text style={styles.game_cost_text}>{this.props.game_info.cost} {RU.EPC}</Text>
					<Text style={styles.game_title_text}>{this.props.game_info.title}</Text>
				</View>
				<View style={styles.game_time}>
					<Text style={styles.game_time_text}>{toHHMMSS(this.props.tempTime)}</Text>
				</View>
				<CustomProgressBar
					style={styles.custom_progress}
					gradient={this.state.progressGradient}
					animationType={"timing"}
					borderWidth={0}
					borderRadius={12}
					height={5}
					animationConfig={{ duration: this.props.fixedTime * 1000 }}
					progress={this.state.progress}
					width={width * 0.85}
					useNativeDriver={true}
					unfilledColor={colors.black_o90} />
				<View style={styles.container}>
					{this.props.game_images.map((game_element, index) => {
						return (
							<Button
								transparent
								block
								key={index}
								style={[game_element.pressed ? index >= 6 ? styles.pressed_button_last_line : styles.pressed_button : index >= 6 ? styles.item_last_line : styles.item]}
								onPress={() => {
									this.changePressed(index);
								}}
							>
								<FastImage
									style={styles.image_in_square}
									resizeMode={FastImage.resizeMode.contain}
									source={{ uri: this.props.game_info.game_array[index].img }}
								//source={require('../../../assets/img/zifi/surprised.gif')}
								/>
							</Button>
						);
					})}
				</View>
				<View style={styles.game_description}>
					<Text style={styles.game_description_text}>{this.props.game_info.description}</Text>
				</View>
				<View style={styles.btn_container}>
					<CustomButton
						active
						short
						gradient
						title={RU.GAME.CONFIRM.toUpperCase()}
						color={colors.white}
						handler={() => {
							this.submitGame()
						}}
					/>
				</View>
				{/* <FooterNavigation /> */}
			</View>
		);
	}
}
//
const mapStateToProps = (state) => {
	return {
		game_info: state.game_info,
		tempTime: state.tempTime,
		fixedTime: state.fixedTime,
		appState: state.appState,
		game_images: state.game_controller.game_images
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
	setTempTime,
	setFixedTime,
	setGameStatus,
	setAppState,
	editGame,
	clearGame
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
