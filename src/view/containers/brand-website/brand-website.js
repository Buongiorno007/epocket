import React from "react";
import {
    View,
    WebView,
    Platform,
    Text
} from "react-native";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import PickedLanguage from "../../../locales/language-picker";
import { colors } from "../../../constants/colors_men";
import { ICONS } from "../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//containers
import GameTimer from "../../containers/game-timer/game-timer"
//services
import { toHHMMSS } from "./../../../services/convert-time"
// import console = require("console");


class BrandWebsite extends React.Component {
    state = {
        infoPage: true
    }
    componentDidMount = () => {
        console.log(this.props.game_info ,"this.props.game_info")
      };
    render() {
        return (
            <View style={this.props.visible ? styles.main_view : styles.hidden} >
                {!this.state.infoPage ?
                    <View style={this.props.visible ? styles.main_view : styles.hidden}>
                        <WebView
                            javaScriptEnabled={true}
                            source={{ uri: this.props.brand_link ? this.props.brand_link : this.props.game_info.website_link }}
                            style={styles.webview}
                        />
                        <View style={styles.timer_header}>
                            <LinearGradient
                                colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
                                start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 0.7, y: 1.0 }}
                                style={styles.timer_header}
                            />
                            <Button
                                rounded
                                block
                                transparent
                                style={styles.button_close}
                                onPress={() => { }}
                            >
                                <FastImage
                                    style={styles.icon}
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={{
                                        uri: ICONS.COMMON.CASH_EPC_WHITE
                                    }}
                                />
                            </Button>
                            {this.props.game_info.wait_timer_in_sec >= 1 ?
                                <GameTimer minutes={toHHMMSS(this.props.game_info.wait_timer_in_sec).split(":")[0]} seconds={toHHMMSS(this.props.game_info.wait_timer_in_sec).split(":")[1]} white_text />
                                :
                                <Button
                                    rounded
                                    transparent
                                    block
                                    style={styles.continue}
                                    onPress={() => { this.props.continue() }}
                                >
                                    <Text style={[styles.continue_text, { color: this.props.userColor.pink_blue }]}>{PickedLanguage.GAME.RESULT.CONTINUE_PLAY.toUpperCase()}</Text>
                                </Button>
                            }
                            <Button
                                rounded
                                transparent
                                block
                                style={styles.button_close}
                                onPress={() => {
                                    if (this.props.game_info.wait_timer_in_sec >= 1) {
                                        this.props.closeBrandWebSite()
                                        this.setState({ infoPage: true })
                                    }
                                }}
                            >
                                {this.props.game_info.wait_timer_in_sec >= 1 ?
                                    <FastImage style={styles.icon_close}
                                        resizeMode={FastImage.resizeMode.contain}
                                        source={{ uri: ICONS.COMMON.CLOSE_WHITE }} >
                                    </FastImage>
                                    :
                                    <FastImage style={styles.zifi}
                                        resizeMode={FastImage.resizeMode.contain}
                                        source={require('../../../assets/img/zifi/playful.gif')} >
                                    </FastImage>
                                }
                            </Button>
                        </View>
                    </View>
                    :
                    <View style={styles.info_page}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.image_background}
                            source={require('../../../assets/img/ANIMATED_EARN_MORE.gif')}
                        />
                        <LinearGradient
                            colors={this.props.userColor.earn_more}
                            start={{ x: 0.0, y: 1.4 }}
                            end={{ x: 1.0, y: 0.0 }}
                            style={styles.grad}
                        />
                        <View style={[styles.block]}>

                            <Button
                                rounded
                                block
                                transparent
                                onPress={() => {
                                    this.props.closeBrandWebSite()
                                    this.setState({ infoPage: true })
                                }}
                                style={styles.navigation_item}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.icon_back}
                                    source={{ uri: ICONS.COMMON.NAVIGATE_BACK }}
                                />
                                <Text style={[styles.text, styles.title]}>{PickedLanguage.BACK}</Text>
                            </Button>
                        </View>
                        <Text style={styles.infoPage_title}>{this.props.brand_title.toUpperCase()}</Text>
                        <Text style={styles.infoPage_title}>{PickedLanguage.GAME.RESULT.STAY_ON_WEBSITE_FOR} {this.props.game_info.wait_timer} {PickedLanguage.GAME.RESULT.MIN}</Text>
                        <Text style={styles.infoPage_desc}>{PickedLanguage.GAME.RESULT.LOOK_WHAT_TO_BUY}</Text>
                        <Button
                            rounded
                            transparent
                            block
                            style={styles.continue_to_website}
                            onPress={() => {
                                this.setState({ infoPage: false })
                                this.props.startTimer()
                            }}
                        >
                            <Text style={[styles.continue_text, { color: this.props.userColor.pink_blue }]}>{PickedLanguage.GAME.RESULT.CONTINUE.toUpperCase()}</Text>
                        </Button>
                    </View>
                }
            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        userColor: state.userColor,
        game_info: state.game_info,
        website_timer: state.website_timer
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrandWebsite);
