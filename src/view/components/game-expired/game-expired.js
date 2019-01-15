import React from 'react';
import { View, Text, Clipboard, Platform, AsyncStorage, AppState, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
import Share from 'react-native-share';
import { Button, Toast } from "native-base";
import CookieManager from 'react-native-cookies';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
import { setInstaToken } from "../../../reducers/insta-token";
import { loaderState } from "../../../reducers/loader";
import { setAppState } from "../../../reducers/app-state"
import { getGameInfo } from "../../../reducers/game-info";
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
        modalVisible: false,
        errorVisible: false,
        userCount: 0,
    };
    setModalVisible = visible => {
        this.setState({
            modalVisible: visible
        });
    };
    setErrorVisible = visible => {
        this.setState({
            errorVisible: visible
        });
    };
    startTimer = () => {
        this.setState({
            interval:
                setCorrectingInterval(() => {
                    if (this.props.game_expired_timer <= 1) {
                        clearCorrectingInterval(this.state.interval);
                        this.props.getGameInfo(this.props.token, this.props.location.lat, this.props.location.lng)
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
    }
    componentWillUnmount = () => {
        clearCorrectingInterval(this.state.interval);
        AppState.removeEventListener('change', this._handleAppStateChange);
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
                }
                else if (result.status == 201) {
                    CookieManager.clearAll()
                        .then((res) => {
                            this.setModalVisible(true);
                            this.props.loaderState(false);
                            this.setState({ userCount: result.body.subsc_needed })
                        });
                }
                else {
                    CookieManager.clearAll()
                        .then((res) => {
                            this.setErrorVisible(true)
                        });
                }
            },
            error => {
                CookieManager.clearAll()
                    .then((res) => {
                        this.props.loaderState(false);
                    });
            }
        );
    }
    confirmPost = () => {
        this.props.shutDownExpiredTimer(this.props.token, this.props.game_expired_img.id, this.props.location.lat, this.props.location.lng);
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
            url: this.props.game_expired_img.base64,
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
                    title={RU.PROFILE_PAGE.ALREADY_ACCOUNT}
                    first_btn_title={RU.OK}
                    visible={this.state.errorVisible}
                    first_btn_handler={() =>
                        this.setErrorVisible(!this.state.errorVisible)
                    }
                    decline_btn_handler={() =>
                        this.setErrorVisible(!this.state.errorVisible)
                    }
                />
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
                    clientId='7df789fc907d4ffbbad30b7e25ba3933'
                    redirectUrl='https://epocket.dev.splinestudio.com'
                    scopes={['basic', 'public_content', 'likes', 'follower_list', 'comments', 'relationships']}
                    onLoginSuccess={(token) => this.connectInsta(token)}
                    onLoginFailure={(data) => console.log(data)}
                />
                <View style={styles.container}>
                    <Text style={styles.zifi_text}>{RU.GAME.ZIFI.WAIT}</Text>
                    <Image
                        //resizeMode={FastImage.resizeMode.contain}
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
                            uri: this.props.game_expired_img.img,
                            priority: FastImage.priority.high
                        }}

                    />
                    <LinearGradient
                        colors={[this.props.userColor.transparent, this.props.userColor.drag_panel_color]}
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
                        color={this.props.userColor.white}
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
        userColor: state.userColor,
        token: state.token,
        appState: state.appState,
        loader: state.loader,
        location: state.location,
        insta_token: state.insta_token,
        game_error: state.game_error,
        game_expired_img: state.game_expired_img
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
    setInstaToken,
    getGameInfo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
