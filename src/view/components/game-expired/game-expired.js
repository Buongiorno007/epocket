import React from 'react';
import { View, Text, Clipboard, Platform, AsyncStorage, AppState } from 'react-native';
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
import Share from 'react-native-share';
import { Button, Toast } from "native-base";
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
import { setInstaToken } from "../../../reducers/insta-token";
import { loaderState } from "../../../reducers/loader";
import { setAppState } from "../../../reducers/app-state"
import { setGameExpiredTimer, resetGameExpiredTimer, shutDownExpiredTimer } from "../../../reducers/game-expired-timer"
import { errorState } from "../../../reducers/game-error"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from "../../../constants/icons";
import { urls } from "../../../constants/urls";
//containers
import GameTimer from "../../containers/game-timer/game-timer"
import CustomButton from '../../containers/custom-button/custom-button';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
import CustomAlert from "../../containers/custom-alert/custom-alert";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//services
import "../../../services/correcting-interval";
import { toHHMMSS } from "./../../../services/convert-time"
import NavigationService from "./../../../services/route";
import InstagramLogin from '../../../services/Instagram';
import { formatItem } from '../../../services/format-hastags'
import { httpPost } from "../../../services/http";

class GameStart extends React.Component {
    state = {
        interval: null,
        image: ICONS.FILLER,
        modalVisible: false,
        userCount: 0,
        base64: ICONS.FILLER
    };
    setModalVisible = visible => {
        this.setState({
            modalVisible: visible
        });
    };
    startTimer = () => {
        this.setState({
            interval:
                setCorrectingInterval(() => {
                    if (this.props.game_expired_timer <= 1) {
                        clearCorrectingInterval(this.state.interval);
                        this.props.setGameStatus("start");
                    }
                    this.props.setGameExpiredTimer(this.props.game_expired_timer - 1)
                }, 1000)
        })
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.props.appState.match(/background|inactive/) && (nextAppState === 'active')) {
            clearCorrectingInterval(this.state.interval);
            this.props.resetGameExpiredTimer(this.props.token)
            this.startTimer()
        }
        this.props.setAppState(nextAppState)
    }
    componentDidMount = () => {
        AppState.addEventListener('change', this._handleAppStateChange);
        clearCorrectingInterval(this.state.interval);
        this.props.resetGameExpiredTimer(this.props.token)
        this.startTimer()
        AsyncStorage.multiGet(["game_image_for_wait", "game_image_for_wait_base64"]).then(response => {
            this.setState({
                image: response[0][1] != null ? response[0][1] : this.props.game_info.success_image,
                base64: response[1][1] != null ? response[1][1] : this.props.game_info.insta_data.base64
            })
        })
        console.log(this.state)
    }
    componentWillUnmount = () => {
        clearCorrectingInterval(this.state.interval);
    }
    goInst = () => {
        if (!this.props.insta_token) {
            this.refs.instagramLogin.show()
        } else {
            this.shareToInsta();
        }
    };
    connectInsta = (instagram_token) => {
        this.props.loaderState(true);
        let body = JSON.stringify({
            instagram_token: instagram_token
        });
        let promise = httpPost(
            urls.insta_login,
            body,
            this.props.token
        );
        promise.then(
            result => {
                if (result.status === 200) {
                    this.props.setInstaToken(String(instagram_token))
                    this.props.loaderState(false);
                    this.shareToInsta();
                } else {
                    this.setModalVisible(true);
                    this.props.loaderState(false);
                    this.setState({ userCount: result.body.subsc_needed })
                }
            },
            error => {
                this.props.loaderState(false);
            }
        );
    }
    confirmPost = () => {
        this.props.shutDownExpiredTimer(this.props.token);
    }
    shareToInsta = () => {
        Clipboard.setString(formatItem(this.props.game_info.insta_data.hash_tag));
        Toast.show({
            text: RU.MISSION.HASHTAGS_MESSAGE,
            buttonText: "",
            duration: 3000
        })
        let shareImageBase64 = {
            title: formatItem(this.props.game_info.insta_data.hash_tag),
            url: this.state.base64,
        };
        setTimeout(() => {
            Platform.OS === 'ios' ? Share.open(shareImageBase64).then(
                result => {
                    this.confirmPost()
                },
                error => {
                }
            ) : Share.open(shareImageBase64), this.confirmPost();
        }, 2000);
    }
    render() {
        return (
            <View style={styles.main_view}>
                {this.props.loader && <ActivityIndicator />}
                <CustomAlert
                    title={RU.PROFILE_PAGE.NOT_ENOUGHT_SUB}
                    subtitle={this.state.userCount + RU.PROFILE_PAGE.SUBS}
                    first_btn_title={RU.OK}
                    visible={this.state.modalVisible}
                    first_btn_handler={() =>
                        this.setModalVisible(!this.state.modalVisible)
                    }
                    decline_btn_handler={() =>
                        this.setModalVisible(!this.state.modalVisible)
                    }
                />
                <CustomAlert
                    title={this.props.game_error.error_text}
                    first_btn_title={RU.REPEAT}
                    visible={this.props.game_error.error_modal}
                    first_btn_handler={() => {
                        this.props.resetGameExpiredTimer(this.props.token)
                        this.props.errorState({
                            error_text: this.props.game_error.error_text,
                            error_modal: !this.props.game_error.error_modal
                        })
                        this.startTimer()
                    }}
                    decline_btn_handler={() => {
                        this.props.errorState({
                            error_text: this.props.game_error.error_text,
                            error_modal: !this.props.game_error.error_modal
                        })
                    }}
                />
                <InstagramLogin
                    ref='instagramLogin'
                    clientId='c390ce3e630b4429bbe1fa33315cb888'
                    redirectUrl='https://epocket.dev.splinestudio.com'
                    scopes={['basic', 'public_content', 'likes', 'follower_list', 'comments', 'relationships']}
                    onLoginSuccess={(token) => this.connectInsta(token)}
                    onLoginFailure={(data) => console.log(data)}
                />
                <View style={styles.container}>
                    <Text style={styles.zifi_text}>{RU.GAME.ZIFI.WAIT}</Text>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.zifi}
                        source={require('../../../assets/img/zifi/surprised.gif')}
                    />
                </View>
                <GameTimer minutes={toHHMMSS(this.props.game_expired_timer).split(":")[0]} seconds={toHHMMSS(this.props.game_expired_timer).split(":")[1]} />
                <View style={styles.image_to_post_container}>
                    <FastImage
                        style={styles.image_to_post}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{
                            uri: this.state.image,
                            priority: FastImage.priority.high
                        }}

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
                        active={this.props.game_error.error_text === "" ? true : false}
                        gradient
                        title={RU.GAME.RESULT.PUBLISH_AND_CONTINUE.toUpperCase()}
                        color={colors.white}
                        handler={() => {
                            this.goInst();
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
        token: state.token,
        appState: state.appState,
        loader: state.loader,
        insta_token: state.insta_token,
        game_error: state.game_error
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setGameStatus,
    setGameExpiredTimer,
    resetGameExpiredTimer,
    setAppState,
    shutDownExpiredTimer,
    loaderState,
    errorState,
    setInstaToken
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
