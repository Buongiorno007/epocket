import React from "react";
import {
  View,
  StatusBar,
  Modal,
  Text,
  AppState,
  TouchableHighlight
} from "react-native";
import { Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { colors } from "./../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showDoneNotification } from "../../../reducers/main-task-done-notification";
import { showFailedNotification } from "../../../reducers/main-task-failed-notification";

class TimerModal extends React.Component {
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.doneNotification}
          onRequestClose={() => {
            //alert("Modal has been closed.");
          }}
        >
          <View style={styles.main_task_done}>
            <View style={styles.main_task_done_content}>
              <View style={styles.texts}>
                <Text style={styles.text}>{RU.CONGRAT}</Text>
                <Text style={styles.text}>{RU.GOT_EPC}</Text>
              </View>

              <Button
                transparent
                style={styles.confirm_button}
                onPress={() => {
                  this.props.showDoneNotification(false);
                  try { this.props.activeTab === 2 && this.props.callTimer() } catch (e) { }
                }}
              >
                <LinearGradient
                  colors={[colors.light_orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.confirm_button}
                />
                <Text style={styles.confirm_button_text}>{RU.OK}</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.failedNotification}
          onRequestClose={() => {
            //alert("Modal has been closed.");
          }}
        >
          <View style={styles.main_task_done}>
            <View style={styles.main_task_done_content}>
              <View style={styles.texts}>
                <Text style={styles.text}>{RU.MAIN_TASK_FAILED}</Text>
                <Text style={styles.text}>{RU.MAIN_TASK_FAILURE_REASON}</Text>
              </View>

              <Button
                transparent
                style={styles.confirm_button}
                onPress={() => {
                  this.props.showFailedNotification(false);
                  try { this.props.activeTab === 2 && this.props.callTimer() } catch (e) { }
                }}
              >
                <LinearGradient
                  colors={[colors.light_orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.confirm_button}
                />
                <Text style={styles.confirm_button_text}>{RU.OK}</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    doneNotification: state.doneNotification,
    failedNotification: state.failedNotification,
    activeTab: state.activeTab,
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
