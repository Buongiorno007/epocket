import React from 'react';
import { View, Text, StatusBar } from "react-native";
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
import { setTabState } from "../../../reducers/tabs";
//constants
import styles from './styles';
import { colors } from '../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from "../../../constants/icons";
//services
import NavigationService from "./../../../services/route";

class GameResult extends React.Component {
    state = {};
    goBack = () => {
        NavigationService.navigate("Main")
        this.props.setTabState(2)
        setTimeout(() => {
            this.props.setGameStatus("start")
        }, 1000)
    }
    goWait = () => {
        NavigationService.navigate("Main")
        setTimeout(() => {
            this.props.setGameStatus("expired")
        }, 0)
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
            zifi = ICONS.ZIFI.SHOCKED
        }
        else if (status === "failed") {
            zifi = ICONS.ZIFI.GRIMACES
        }
        else if (status === "expired") {
            zifi = ICONS.ZIFI.BORED
        }
        else {
            zifi = ICONS.ZIFI.SHOCKED
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
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={"transparent"}
                    translucent={true}
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
                        source={{ uri: this.chooseZifi(this.props.game_status) }}
                    />
                    <Text style={this.chooseResultText(this.props.game_status).style}>{this.chooseResultText(this.props.game_status).text}</Text>
                    <Button
                        rounded
                        transparent
                        block
                        style={this.props.game_status === "success" ? styles.button_short : styles.button}
                        androidRippleColor={colors.card_shadow}
                        onPress={() => {
                            this.goBack()
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
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setGameStatus,
    setTabState
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameResult);
