import React from 'react';
import { View, Text, AsyncStorage, Image, TouchableOpacity, ScrollView } from 'react-native';
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
			pr: false,
			time: "00:00"
		};
	}

	changePrassed(i) {
		let cat_copy = this.state.categories;
		cat_copy[i].pressed = !cat_copy[i].pressed;
		this.setState({
			categories: cat_copy
		});
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
						handler={() => {}}
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
