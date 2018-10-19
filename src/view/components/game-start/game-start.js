import React from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";
import FastImage from 'react-native-fast-image'
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from "../../../constants/icons";
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import CustomProgressBar from '../../containers/custom-progress-bar/custom-progress-bar';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
//services
import "../../../services/correcting-interval";
import NavigationService from "./../../../services/route";

class GameStart extends React.Component {
    state = {};
    componentDidMount = () => { }
    render() {
        return (
            <View style={styles.main_view}>
                {
                    this.props.game_info.no_more_games ?
                        null :
                        <View style={styles.game_title}>
                            <Text style={styles.game_title_text}>10/10 {RU.GAME.GAMES_FOR_TODAY}</Text>
                        </View>
                }

                <View style={styles.container}>
                    <Text style={styles.zifi_text}>{this.props.game_info.no_more_games ? RU.GAME.ZIFI.BORING : RU.GAME.ZIFI.PLAYFUL}</Text>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.zifi}
                        source={this.props.game_info.no_more_games ? require('../../../assets/img/zifi/bored.gif') : require('../../../assets/img/zifi/playful.gif')}
                       // source={{ uri: this.props.game_info.no_more_games ? ICONS.ZIFI.BORED : ICONS.ZIFI.PLAYFUL }}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.game_cost_text}>{this.props.game_info.no_more_games ? RU.GAME.SORRY_TODAY.toLocaleUpperCase() : RU.GAME.COST_TEXT.toLocaleUpperCase()} </Text>
                        <LinearTextGradient
                            style={styles.game_cost_text}
                            locations={[0, 1]}
                            colors={[colors.light_red, colors.dark_pink]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            {this.props.game_info.no_more_games ? RU.GAME.NO_GAMES.toLocaleUpperCase() : this.props.game_info.cost.toLocaleUpperCase() + " " + RU.EPC.toLocaleUpperCase()}
                        </LinearTextGradient>
                    </View>
                </View>
                <View style={styles.game_description}>
                    <Text style={styles.game_description_text}>{this.props.game_info.no_more_games ? RU.GAME.GET_EPC : this.props.game_info.description}</Text>
                </View>
                {this.props.game_info.no_more_games ?
                    null :
                    <View style={styles.btn_container}>
                        < CustomButton
                            active
                            short
                            gradient
                            title={RU.GAME.START.toUpperCase()}
                            color={colors.white}
                            handler={() => {
                                this.props.setGameStatus("game")
                            }}
                        />
                    </View>
                }
                <FooterNavigation />
            </View>
        );
    }
}
//
const mapStateToProps = (state) => {
    return {
        game_info: state.game_info,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setGameStatus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
