import React from 'react';
import { View, Text, AsyncStorage, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'native-base';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from '../../../constants/icons';
const { width, height } = Dimensions.get('window');
//containers
import CustomButton from '../../containers/custom-button/custom-button';
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
			Progress_Value: 0.0,
			time: 15,
			tempTime: 15,
			wid: width * 0.85,
			tempWid: width * 0.85

		};
	}

	changePrassed(i) {
		let cat_copy = this.state.categories;
		cat_copy[i].pressed = !cat_copy[i].pressed;
		this.setState({
			categories: cat_copy
		});
	}

	Start_Progress = () => {
		this.value = setInterval(() => {
			if (this.state.Progress_Value <= 1) {
				this.setState({ Progress_Value: this.state.Progress_Value + 1 / this.state.time / 10 });
			}
		}, 100);
	};
	Stop_Progress = () => {
		clearInterval(this.value);
	};

	Clear_Progress = () => {
		this.setState({ Progress_Value: 0.0 });
	};

	timing() {
		setInterval(() => {
			if (this.state.wid > 0) {
				this.setState({ wid: this.state.wid - this.state.tempWid / 15 });
			}
		}, 1000);
		setInterval(() => {
			if (this.state.wid > 0) {
				this.setState({ tempTime: this.state.tempTime - 1 });
			}
		}, 1000);
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

	componentDidMount() {
		this.timing();
	}

	render() {
		return (
			<View style={styles.main_view}>
				<View style={styles.game_title}>
					<Text style={styles.game_cost_text}>{this.props.game_info.cost} {RU.EPC}</Text>
					<Text style={styles.game_title_text}>{this.props.game_info.title}</Text>
				</View>
				<View style={styles.game_time}>
					<Text style={styles.game_time}>{this.state.time}</Text>
				</View>
				<Text style={{ fontSize: 20, color: '#000', marginTop: 60 }}>
					{' '}
					Progress Value: {this.toHHMMSS(this.state.tempTime)} sec
				</Text>
				<View style={styles.gradient}>
					{
						<LinearGradient
							colors={['rgba(138, 109, 247, 0.75)', 'rgba(245, 88, 144, 0.75)']}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={[styles.gradientt, { width: this.state.wid }]}
						/>
					}
				</View>

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
		game_info: state.game_info
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
