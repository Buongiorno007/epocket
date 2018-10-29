import React from 'react';
import { View, Text, StatusBar } from "react-native";
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
import Share from 'react-native-share';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
import { setTabState } from "../../../reducers/tabs";
import { resetGameExpiredTimer } from "../../../reducers/game-expired-timer"
import { getGameInfo } from "../../../reducers/game-info"
//constants
import styles from './styles';
import { colors } from '../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from "../../../constants/icons";
//services
import NavigationService from "./../../../services/route";
import InstagramLogin from '../../../services/Instagram';
import { formatItem } from '../../../services/format-hastags'
import { httpPost } from "../../../services/http";
//containers
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";

class GameResult extends React.Component {
    state = {};

    goInst = () => {
        if (!this.props.insta_token) {
            this.refs.instagramLogin.show()
        } else {
            this.shareToInsta();
        }
    };
    goWait = () => {
        this.props.getGameInfo(this.props.token);
        NavigationService.navigate("Main")
        this.props.resetGameExpiredTimer();
        setTimeout(() => {
            this.props.setGameStatus("expired")
        }, 0)
    }
    goHome = () => {
        NavigationService.navigate("Main")
        this.props.setTabState(2)
        setTimeout(() => {
            this.props.setGameStatus("start")
        }, 1000)
    }
    connectInsta = (instagram_token) => {
        this.props.loaderState(true);
        this.props.setInstaToken(String(instagram_token))
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
                this.shareToInsta();
                this.props.loaderState(false);
            },
            error => {
                this.props.loaderState(false);
            }
        );
    }
    confirmPost = () => {
        this.props.loaderState(true);
        let body = JSON.stringify({
            id: this.props.navigation.state.params.insta_data.id
        });
        let promise = httpPost(
            urls.insta_getmedia,
            body,
            this.props.token
        );
        promise.then(
            result => {
                console.log('result', result)
                this.props.setBalance(result.body.media.status.balance)
                this.skip();
            },
            error => {
                this.skip();
            }
        );
    }
    confirmPost = () => {
        this.props.getGameInfo(this.props.token);
        NavigationService.navigate("Main")
        this.props.setTabState(4)
        setTimeout(() => {
            this.props.setGameStatus("game")
        }, 1000)
    }
    shareToInsta = () => {
        Clipboard.setString(formatItem(this.props.navigation.state.params.insta_data.hash_tag));
        Toast.show({
            text: RU.MISSION.HASHTAGS_MESSAGE,
            buttonText: "",
            duration: 3000
        })
        let shareImageBase64 = {
            title: formatItem(this.props.navigation.state.params.insta_data.hash_tag),
            url: 'data:image/jpg;base64,' + this.props.navigation.state.params.insta_data.base64,
        };
        setTimeout(() => {
            Platform.OS === 'ios' ? Share.open(shareImageBase64).then(
                result => {
                    this.confirmPost()
                },
                error => {
                }
            ) : Share.open(shareImageBase64);
        }, 2000);
    }
    componentDidMount = () => { }

    chooseZifiText = (status) => {
        let text;
        if (status === "success") {
            text = RU.GAME.ZIFI.SHOCKED
        }
        else if (status === "failed") {
            text = RU.GAME.ZIFI.FAILED
        }
        else if (status === "expired") {
            text = RU.GAME.ZIFI.TOO_LONG
        }
        else {
            text = ""
        }
        return text
    }
    chooseZifi = (status) => {
        let zifi;
        if (status === "success") {
            // zifi = ICONS.ZIFI.SHOCKED
            zifi = require('../../../assets/img/zifi/shocked.gif')
        }
        else if (status === "failed") {
            //zifi = ICONS.ZIFI.GRIMACES
            zifi = require('../../../assets/img/zifi/grimaces.gif')
        }
        else if (status === "expired") {
            //zifi = ICONS.ZIFI.BORED
            zifi = require('../../../assets/img/zifi/bored.gif')
        }
        else {
            //zifi = ICONS.ZIFI.SHOCKED
            zifi = require('../../../assets/img/zifi/shocked.gif')
        }
        return zifi
    }
    chooseResultText = (status) => {
        let text;
        let style;
        if (status === "success") {
            text = RU.GAME.RESULT.CONGRATS + "\n" + RU.GAME.RESULT.YOU_WON + " " + this.props.game_info.cost + " " + RU.EPC
            style = styles.congratulation
        }
        else if (status === "failed" || status === "expired") {
            text = RU.GAME.RESULT.SEND_TO_INST
            style = styles.fail
        }
        else {
            text = ""
            style = styles.congratulation
        }
        return { text, style }
    }
    chooseButtonText = (status) => {
        let text;
        if (status === "success") {
            text = RU.GAME.RESULT.CONTINUE.toLocaleUpperCase()
        }
        else if (status === "failed" || status === "expired") {
            text = RU.GAME.RESULT.PUBLISH_AND_CONTINUE.toLocaleUpperCase()
        }
        else {
            text = ""
        }
        return text
    }
    chooseBackground = (status) => {
        let img, style;
        if (status === "success") {
            img = require('../../../assets/img/EARN_MORE_BACK.png')
            style = styles.image
        }
        else {
            img = { uri: this.props.game_info.success_image }
            style = styles.image_failed
        }
        return { img, style }
    }
    render() {
        return (
            <View style={styles.container} >
                {this.props.loader && <ActivityIndicator />}
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={"transparent"}
                    translucent={true}
                />
                <InstagramLogin
                    ref='instagramLogin'
                    clientId='c390ce3e630b4429bbe1fa33315cb888'
                    redirectUrl='https://epocket.dev.splinestudio.com'
                    scopes={['basic', 'public_content', 'likes', 'follower_list', 'comments', 'relationships']}
                    onLoginSuccess={(token) => this.connectInsta(token)}
                    onLoginFailure={(data) => console.log(data)}
                />
                <LinearGradient
                    colors={[
                        "#F7BB42",
                        colors.orange,
                        colors.pink,
                        "rgba(214, 41, 197, 0.88)",
                        "rgba(119, 12, 225, 0.69)"
                    ]}
                    start={{ x: 0.0, y: 1.4 }}
                    end={{ x: 1.0, y: 0.0 }}
                    style={styles.grad}
                />
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={this.chooseBackground(this.props.game_status).style}
                    source={this.chooseBackground(this.props.game_status).img}
                />
                <View style={this.props.game_status === "success" ? styles.success : styles.failed}>
                    <Text style={styles.zifi_text}>{this.chooseZifiText(this.props.game_status)}</Text>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.zifi}
                        source={this.chooseZifi(this.props.game_status)}
                    />
                    <Text style={this.chooseResultText(this.props.game_status).style}>{this.chooseResultText(this.props.game_status).text}</Text>
                    <Button
                        rounded
                        transparent
                        block
                        style={this.props.game_status === "success" ? styles.button_short : styles.button}
                        androidRippleColor={colors.card_shadow}
                        onPress={() => {
                            this.props.game_status === "success" ? this.goHome() : this.goInst()
                        }}
                    >
                        <Text style={styles.text}>{this.chooseButtonText(this.props.game_status)}</Text>
                    </Button>
                    {this.props.game_status === "success" ? null :
                        <Button
                            transparent
                            style={styles.wait_button}
                            onPress={() => {
                                this.goWait()
                            }}
                        >
                            <Text style={styles.fail}>{RU.GAME.RESULT.WAIT_30}</Text>
                        </Button>
                    }

                </View>
            </View >
        );
    }
}
//
const mapStateToProps = (state) => {
    return {
        game_info: state.game_info,
        game_status: state.game_status,
        token: state.token,
        insta_token: state.insta_token,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setGameStatus,
    setTabState,
    resetGameExpiredTimer,
    getGameInfo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameResult);
