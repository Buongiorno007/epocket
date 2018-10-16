import React from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions } from 'react-native';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTempTime } from "../../../reducers/tempTime"
import { setFixedTime } from "../../../reducers/fixedTime"
import { setGameStatus } from "../../../reducers/game-status"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import CustomProgressBar from '../../containers/custom-progress-bar/custom-progress-bar';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
//services
import "../../../services/correcting-interval";
import { toHHMMSS } from "./../../../services/convert-time"
import NavigationService from "./../../../services/route";

class Game extends React.Component {
	state = {
		categories: [
			{ name: 1, pressed: false },
			{ name: 2, pressed: false },
			{ name: 3, pressed: false },
			{ name: 4, pressed: false },
			{ name: 5, pressed: false },
			{ name: 6, pressed: false },
			{ name: 7, pressed: false },
			{ name: 8, pressed: false },
			{ name: 9, pressed: false }
		],
		interval: null
	};
	changePrassed(i) {
		let cat_copy = this.state.categories;
		cat_copy[i].pressed = !cat_copy[i].pressed;
		this.setState({
			categories: cat_copy
		});
	}
	startTimer = () => {
		this.setState({
			interval:
				setCorrectingInterval(() => {
					if (this.props.tempTime < 2) {
						this.goToResult("expired")
					}
					this.props.setTempTime(this.props.tempTime - 1)
				}, Platform.OS === "ios" ? 910 : 1090)
		})
	}
	goToResult = (status) => {
		NavigationService.navigate("GameResult");
		clearCorrectingInterval(this.state.interval);
		this.props.setGameStatus(status);
	}
	componentDidMount = () => {
		if (this.props.tempTime > 2) {
			this.startTimer()
		}
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
				<CustomProgressBar />
				<View style={styles.container}>
					{this.state.categories.map((category, index) => {
						return (
							<TouchableOpacity
								key={index}
								style={[category.pressed == true ? index >= 6 ? styles.pressed_button_last_line : styles.pressed_button : index >= 6 ? styles.item_last_line : styles.item]}
								onPress={() => {
									this.changePrassed(index);
								}}
							/>
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
							this.goToResult("success") //success | failed 
						}}
					/>
				</View>
				<FooterNavigation />
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
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
	setTempTime,
	setFixedTime,
	setGameStatus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
