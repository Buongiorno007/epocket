import React from 'react';
import { View, Text } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";
import FastImage from 'react-native-fast-image'
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
import { getGameInfo } from "../../../reducers/game-info";
import { resetGameExpiredTimer } from "../../../reducers/game-expired-timer"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import CustomAlert from "../../containers/custom-alert/custom-alert";
//services
import "../../../services/correcting-interval";

class GameStart extends React.Component {
    state = {
        errorVisible: false,
        errorText: ""
    };
    setModalVisible = visible => {
        this.setState({ errorVisible: visible });
    };
    componentDidMount() {
        this.props.getGameInfo(this.props.token)
    }
    componentWillReceiveProps = nextProps => {
        if (nextProps.game_error != null) {
            this.setState({ errorText: nextProps.game_error.error_text })
            this.setModalVisible(true);
        }
    }
    render() {
        return (
            <View style={styles.main_view}>
                {this.props.loader && <ActivityIndicator />}
                <CustomAlert
                    title={this.state.errorText}
                    first_btn_title={RU.REPEAT}
                    visible={this.state.errorVisible}
                    first_btn_handler={() => {
                        this.setModalVisible(!this.state.errorVisible);
                        this.props.getGameInfo(this.props.token);
                    }}
                    decline_btn_handler={() => {
                        this.setModalVisible(!this.state.errorVisible);
                    }}
                />
                {
                    this.props.game_info.no_more_games ?
                        null :
                        <View style={styles.game_title}>
                            <Text style={styles.game_title_text}>{this.props.game_info.available_game_len}/{this.props.game_info.total_game_len} {RU.GAME.GAMES_FOR_TODAY}</Text>
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
        token: state.token,
        loader: state.loader,
        game_error: state.game_error
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getGameInfo,
    setGameStatus,
    resetGameExpiredTimer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
