import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
import { RU } from "../../../locales/ru";
import { ICONS } from "./../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toDDHHMM } from "./../../../services/convert-time"

class PostCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View
                style={
                    [styles.card, Platform.OS === 'android' && {
                        borderTopWidth: 1,
                        borderTopColor: 'rgba(217, 221, 224, 0.5)',
                    }]
                }
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.social_icon}
                    source={{ uri: this.props.item.photo ? this.props.item.photo : ICONS.INSTAGRAM_COLOR }}
                />
                <View style={styles.social_text_container}>
                    <Text style={[styles.social_text, styles.social_text_title]}>
                        {this.props.item.name}
                    </Text>
                    <Text style={[styles.social_text, styles.social_text_desc]}>
                        {RU.DASHBOARD_LIST.WILL_GET + this.props.item.value && this.props.item.value != " NO DATA" ? this.props.item.value : 0 + " " + RU.EPC + RU.DASHBOARD_LIST.OVER}
                    </Text>
                    <View style={styles.timer_row}>
                        <View style={styles.timer_column}>
                            <Text style={[styles.social_text, styles.social_text_big]}>
                                {toDDHHMM(this.props.item.timer).days < 10 ? "0" + toDDHHMM(this.props.item.timer).days : toDDHHMM(this.props.item.timer).days}
                            </Text>
                            <Text style={[styles.social_text, styles.social_text_ddmmss]}>
                                {RU.DASHBOARD_LIST.DD}
                            </Text>
                        </View>
                        <View style={styles.timer_column}>
                            <Text style={[styles.social_text, styles.social_text_big]}>
                                :
                            </Text>
                            <Text style={[styles.social_text, styles.social_text_ddmmss]}>
                                :
                            </Text>
                        </View>
                        <View style={styles.timer_column}>
                            <Text style={[styles.social_text, styles.social_text_big]}>
                                {toDDHHMM(this.props.item.timer).hours < 10 ? "0" + toDDHHMM(this.props.item.timer).hours : toDDHHMM(this.props.item.timer).hours}
                            </Text>
                            <Text style={[styles.social_text, styles.social_text_ddmmss]}>
                                {RU.DASHBOARD_LIST.HH}
                            </Text>
                        </View>
                        <View style={styles.timer_column}>
                            <Text style={[styles.social_text, styles.social_text_big]}>
                                :
                            </Text>
                            <Text style={[styles.social_text, styles.social_text_ddmmss]}>
                                :
                            </Text>
                        </View>
                        <View style={styles.timer_column}>
                            <Text style={[styles.social_text, styles.social_text_big]}>
                                {toDDHHMM(this.props.item.timer).minutes < 10 ? "0" + toDDHHMM(this.props.item.timer).minutes : toDDHHMM(this.props.item.timer).minutes}
                            </Text>
                            <Text style={[styles.social_text, styles.social_text_ddmmss]}>
                                {RU.DASHBOARD_LIST.MM}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userColor: state.userColor,
    timer: state.timer,
    timer_status: state.timer_status,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCard);