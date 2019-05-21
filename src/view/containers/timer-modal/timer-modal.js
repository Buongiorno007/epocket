import React from "react";
import { View, Text, Platform } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from "native-base";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors_men";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showDoneNotification } from "../../../reducers/main-task-done-notification";
import { showFailedNotification } from "../../../reducers/main-task-failed-notification";
import I18n from "@locales/I18n";

class TimerModal extends React.Component {
  state = {
    currency: ""
  };
  componentDidMount() {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency });
    });
  }

  render() {
    return (
      <View
        style={[
          styles.main_task,
          Platform.OS === "ios" &&
            !this.props.doneNotification &&
            !this.props.failedNotification && { display: "none" }
        ]}
      >
        {this.props.doneNotification && (
          <View style={[styles.main_task_done]}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={require("../../../assets/img/ANIMATED_EARN_MORE.gif")}
              style={styles.image}
            />
            <LinearGradient
              colors={this.props.userColor.earn_more}
              start={{ x: 0.0, y: 1.4 }}
              end={{ x: 1.0, y: 0.0 }}
              style={styles.grad}
            />
            <View style={styles.main_task_done_content}>
              <Text style={styles.text_big}>{I18n.t("CONGRAT")}</Text>
              <Text style={styles.text}>
                {I18n.t("GOT_EPC") +
                  this.props.doneMissionCost +
                  " " +
                  I18n.t("EPC", { currency: this.state.currency }) +
                  I18n.t("FOR_TRC")}
              </Text>
              <Text style={styles.text_small}>{I18n.t("COME_TOMMOROW")}</Text>

              <Button
                transparent
                style={styles.confirm_button}
                onPress={() => {
                  this.props.showDoneNotification(false);
                  try {
                    this.props.activeTab === 2 && this.props.callTimer();
                  } catch (e) {}
                }}
              >
                <Text
                  style={[
                    styles.confirm_button_text,
                    { color: this.props.userColor.second_gradient_color }
                  ]}
                >
                  {I18n.t("OK")}
                </Text>
              </Button>
            </View>
          </View>
        )}
        {this.props.failedNotification && (
          <View style={[styles.main_task_done, styles.backgroundColorWhite]}>
            <View
              style={[
                styles.main_task_done_content,
                styles.backgroundColorWhite
              ]}
            >
              <Text style={[styles.text_big, styles.textBlack]}>
                {I18n.t("MAIN_TASK_FAILED")}
              </Text>
              <Text style={[styles.text, styles.textBlack]}>
                {I18n.t("MAIN_TASK_FAILURE_REASON")}
              </Text>
              <Button
                transparent
                style={styles.confirm_button}
                onPress={() => {
                  this.props.showFailedNotification(false);
                }}
              >
                <LinearGradient
                  colors={[
                    this.props.userColor.first_gradient_color,
                    this.props.userColor.second_gradient_color
                  ]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.confirm_button}
                />
                <Text style={[styles.confirm_button_text, styles.textWhite]}>
                  {I18n.t("OK")}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    doneNotification: state.doneNotification,
    userColor: state.userColor,
    failedNotification: state.failedNotification,
    activeTab: state.activeTab,
    doneMissionCost: state.doneMissionCost
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDoneNotification,
      showFailedNotification
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerModal);
