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
                <View style={styles.small_time_counter}>
                    <Text style={styles.time_counter_text}>
                        {this.props.minutes}
                    </Text>
                </View>
                <View>
                    <Text style={styles.time_divider}>:</Text>
                </View>
                <View style={styles.small_time_counter}>
                    <Text style={styles.time_counter_text}>
                        {this.props.seconds}
                    </Text>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
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
