import React from "react";
import { View, Text } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class GameTimer extends React.Component {
    render() {
        return (
            <View style={styles.small_time_counter_container}>
                <View style={[styles.small_time_counter,
                { backgroundColor: this.props.white_text ? this.props.userColor.white_o25 : this.props.userColor.first_gradient_color_01 }]}>
                    <Text style={[styles.time_counter_text, { color: this.props.white_text ? this.props.userColor.white : this.props.userColor.pink_blue }]}>
                        {this.props.minutes}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.time_divider, { color: this.props.white_text ? this.props.userColor.white : this.props.userColor.pink_blue }]}>:</Text>
                </View>
                <View style={[styles.small_time_counter,
                { backgroundColor: this.props.white_text ? this.props.userColor.white_o25 : this.props.userColor.first_gradient_color_01 }]}>
                    <Text style={[styles.time_counter_text, { color: this.props.white_text ? this.props.userColor.white : this.props.userColor.pink_blue }]}>
                        {this.props.seconds}
                    </Text>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {},
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameTimer);
