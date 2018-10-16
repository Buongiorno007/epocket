import React from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
import { setGameExpiredTimer } from "../../../reducers/game-expired-timer"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from "../../../constants/icons";
//containers
import GameTimer from "../../containers/game-timer/game-timer"
import CustomButton from '../../containers/custom-button/custom-button';
import CustomProgressBar from '../../containers/custom-progress-bar/custom-progress-bar';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
//services
import "../../../services/correcting-interval";
import { toHHMMSS } from "./../../../services/convert-time"
import NavigationService from "./../../../services/route";

class GameStart extends React.Component {
    state = {
        interval: null
    };
    startTimer = () => {
        this.setState({
            interval:
                setCorrectingInterval(() => {
                    if (this.props.game_expired_timer < 1) {
                        clearCorrectingInterval(this.state.interval);
                        this.props.setGameStatus("start");
                    }
                    this.props.setGameExpiredTimer(this.props.game_expired_timer - 1)
                }, 1000)
        })
    }
    componentDidMount = () => {
        this.startTimer()
    }
    componentWillUnmount = () => {
        clearCorrectingInterval(this.state.interval);
    }
    render() {
        return (
            <View style={styles.main_view}>
                <View style={styles.container}>
                    <Text style={styles.zifi_text}>{RU.GAME.ZIFI.WAIT}</Text>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.zifi}
                        source={{ uri: ICONS.ZIFI.SURPRISED }}
                    />
                </View>
                <GameTimer minutes={toHHMMSS(this.props.game_expired_timer).split(":")[0]} seconds={toHHMMSS(this.props.game_expired_timer).split(":")[1]} />
                <View style={styles.image_to_post_container}>
                    <FastImage
                        style={styles.image_to_post}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: ICONS.ZIFI.SURPRISED }}
                    />
                    <LinearGradient
                        colors={[colors.transparent, colors.drag_panel_color]}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 0.0, y: 0.8 }}
                        style={styles.gradient}
                    />
                </View>
                <View style={styles.btn_container}>
                    <CustomButton
                        active
                        gradient
                        title={RU.GAME.RESULT.PUBLISH_AND_CONTINUE.toUpperCase()}
                        color={colors.white}
                        handler={() => {
                            this.props.setGameStatus("start")
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
        game_expired_timer: state.game_expired_timer,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setGameStatus,
    setGameExpiredTimer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
