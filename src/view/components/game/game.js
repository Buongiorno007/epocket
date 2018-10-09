import React from 'react';
import { View, Text, AsyncStorage, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'native-base';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTempTime } from "../../../reducers/tempTime"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from '../../../constants/icons';
const { width, height } = Dimensions.get('window');
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import CustomProgressBar from '../../containers/custom-progress-bar/custom-progress-bar';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
		};
	}
	changePrassed(i) {
		let cat_copy = this.state.categories;
		cat_copy[i].pressed = !cat_copy[i].pressed;
		this.setState({
			categories: cat_copy
		});
	}
	toHHMMSS = (secs) => {
		var sec_num = parseInt(secs, 10);
		var hours = Math.floor(sec_num / 3600) % 24;
		var minutes = Math.floor(sec_num / 60) % 60;
		var seconds = sec_num % 60;
		return [hours, minutes, seconds]
			.map((v) => (v < 10 ? '0' + v : v))
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	};
	startTimer() {
		setInterval(() => {
			if (this.props.tempTime > 0) {
				this.props.setTempTime(this.props.tempTime - 1)
			}
		}, 1000);
	}
	componentDidMount() {
		this.startTimer()
	}

	render() {
		return (
			<View style={styles.main_view}>
				<View style={styles.game_title}>
					<Text style={styles.game_cost_text}>{this.props.game_info.cost} {RU.EPC}</Text>
					<Text style={styles.game_title_text}>{this.props.game_info.title}</Text>
				</View>
				<View style={styles.game_time}>
					<Text style={styles.game_time_text}>{this.toHHMMSS(this.props.tempTime)}</Text>
				</View>
				<CustomProgressBar />
				<View style={styles.container}>
					{this.state.categories.map((category, index) => {
						return (
							<TouchableOpacity
								key={index}
								style={[category.pressed == true ? styles.pressed_button : styles.item]}
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
						handler={() => { }}
					/>
				</View>
				<FooterNavigation />
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		game_info: state.game_info,
		tempTime: state.tempTime
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
	setTempTime
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
