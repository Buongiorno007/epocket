import React from "react";
import { View, Text,Image } from "react-native";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";
import { urls } from "../../../constants/urls";
import { ICONS } from "../../../constants/icons";
//redux
import { timerStatus } from "../../../reducers/timer-status";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//services
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";

class ReturnToMall extends React.Component {
  state = {
    seconds: 59,
    minutes: 4,
    hours: 0,
    time_out: false,
    errorVisible: false,
    errorText: ""
  };
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  closeTimerTask = () => {
    this.setModalVisible(false);
    let body = {
      outletId: this.props.selectedMall.id
    };
    let promise = httpPost(
      urls.close_mission,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setModalVisible(false);
      },
      error => {
        let error_respons = handleError(error, this.constructor.name, "closeTimerTask");
        this.setState({ errorText: error_respons.error_text });
        this.setModalVisible(error_respons.error_modal);
      }
    );
  };

  startTimer = () => {
    let five_min = 300000;
    // let five_min = 5000;
    let countDownDate = new Date().getTime() + five_min;

    let x = setInterval(() => {
      let now = new Date().getTime();

      let timer = countDownDate - now;

      let hours = Math.floor(
        (timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timer % (1000 * 60)) / 1000);
      if (hours >= 0 && hours >= 0 && seconds >= 0) {
        this.setState({ seconds: seconds, minutes: minutes, hours: hours });
      }

      if (timer <= 0) {
        clearInterval(x);
        this.setState({ time_out: true });
        this.closeTimerTask();
      }
    }, 1000);
  };

  componentDidMount = () => {
    this.startTimer();
  };

  closeModal = () => {
    this.props.timerStatus(false);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
            this.closeTimerTask();
          }}
          decline_btn_handler={() => {
            this.setModalVisible(!this.state.errorVisible);
          }}
        />
        {!this.state.time_out ? (
          <View style={[styles.close_view]}>
            <View style={styles.image_content}>
            <Button
              transparent
              block
              rounded
              style={styles.close_container}
              onPress={() => {
                this.closeModal();
              }}
            >
              <Image
                style={styles.close}
                source={{ uri: ICONS.COMMON.CLOSE }}
              />
            </Button>
          </View>
            <Text style={[styles.top_title, styles.text_common]}>
              {RU.RETURN_TO_MALL.TITLE_TOP}
            </Text>
            <Text style={[styles.timer, styles.text_common]}>
              0{this.state.hours}:0{this.state.minutes}:{this.state.seconds < 10
                ? "0"
                : null}
              {this.state.seconds}
            </Text>
            <Text style={[styles.bottom_title, styles.text_common]}>
              {RU.RETURN_TO_MALL.TITLE_BOTTOM}
            </Text>
          </View>
        ) : (
          <View style={[styles.close_view]}>
            <Text>{RU.RETURN_TO_MALL.TIME_IS_UP}</Text>

            <CustomButton
              active
              gradient
              short
              color={colors.white}
              handler={() => {
                this.closeModal();
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedMall: state.selectedMall,
  token: state.token
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      timerStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnToMall);
