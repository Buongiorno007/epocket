import React from "react";
import { View, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";

//containers
import CardList from "../../containers/card-list/card-list";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import DashTop from "../../containers/dash-top/dash-top";
import TimerModal from "../../containers/timer-modal/timer-modal";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { urls } from "../../../constants/urls";
import { colors } from "../../../constants/colors";
//redux
import { setBalance } from "../../../reducers/user-balance";
import { showDoneNotification } from "../../../reducers/main-task-done-notification";
import { showFailedNotification } from "../../../reducers/main-task-failed-notification";

import { timerStatus } from "../../../reducers/timer-status";
import { setMissions } from "../../../reducers/missions";
import { updateTimer } from "../../../reducers/timer";
import { reloadTimer } from "../../../reducers/timer-interval";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//services
import { httpPost } from "../../../services/http";
import "../../../services/correcting-interval";
import { orderBy } from 'lodash';
import moment from "moment";
import { handleError } from "../../../services/http-error-handler";

class Dashboard extends React.Component {
  state = {
    startMissionErrorVisible: false,
    missionsErrorVisible: false,
    finishMissionErrorVisible: false,
    load_timer: true,
    load_missions: true,
    mainMission: true,
    mainMissionId: 0,
    mainMissionPrice: 0,
    body: {
      outletId: this.props.selectedMall.id
    },
    errorText: "",
    errorCode: "",
    finishMissionCalled: false
  };

  componentDidMount = () => {
    this.getMissions();
    this.callTimer();
  };
  setStartMissionErrorVisible = visible => {
    this.setState({ startMissionErrorVisible: visible });
  };
  setFinishMissionErrorVisible = visible => {
    this.setState({ finishMissionErrorVisible: visible });
  };
  setMissionsErrorVisible = visible => {
    this.setState({ missionsErrorVisible: visible });
  };
  callTimer() {
    this.setStartMissionErrorVisible(false);
    let promise = httpPost(
      urls.start_mission,
      JSON.stringify(this.state.body),
      this.props.token
    );
    promise.then(
      result => {
        this.setStartMissionErrorVisible(false);
        this.setState({ load_timer: false });
        this.setState(
          {
            mainMissionId: result.body.id,
            mainMissionPrice: result.body.price
          },
          () => {
            if (result.body.failed) {
              this.props.showFailedNotification(true);
              this.props.timerStatus(false);
            } else {
              if (result.body.interval <= 0) {
                this.props.timerStatus(false);
                this.finishMainMission();
              } else if (result.body.interval > 0) {
                //blocks second call on mount
                this.props.timerStatus(true);
                this.setState({ finishMissionCalled: false })
                clearCorrectingInterval(this.props.timer_interval);
                this.timer(result.body.interval * 1000);
              }
            }
          }
        );
      },
      error => {
        this.setState({ load_timer: false });
        let error_respons = handleError(error, this.constructor.name, "callTimer");
        this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code });
        this.setStartMissionErrorVisible(error_respons.error_modal);
      }
    );
  }

  getActiveMissions = (missions) => {
    missions.forEach((item) => {
      let currentTime = moment().format("HH:mm:ss");
      let startTime = moment(item.date_start).subtract(3, "hours").format("HH:mm:ss");
      let endTime = moment(item.date_end).subtract(3, "hours").format("HH:mm:ss")
      item.active = currentTime > startTime && currentTime < endTime;
    });
    return orderBy(orderBy(missions, ['price'], ['desc']), ['active'], ['desc']);
  }

  getMissions = () => {
    this.setMissionsErrorVisible(false);
    this.setState({ load_missions: true });
    let promise = httpPost(
      urls.missions,
      JSON.stringify(this.state.body),
      this.props.token
    );
    promise.then(
      result => {
        this.setMissionsErrorVisible(false);
        this.setState({ load_missions: false });
        if (result.status == 200) {
          this.props.setMissions(this.getActiveMissions(result.body.missions));
        }
      },
      error => {
        let error_respons = handleError(error, this.constructor.name, "getMissions");
        this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code });
        this.setMissionsErrorVisible(error_respons.error_modal);
        this.setState({ load_missions: false });

      }
    );
  }

  timer(interval) {
    let countDownDate = new Date().getTime() + interval;
    clearCorrectingInterval(this.props.timer_interval);
    // Update the count down every 1 second
    let x = setCorrectingInterval(() => {
      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now an the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (hours >= 0 && minutes >= 0 && seconds >= 0) {
        let curr_time = {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        };
        this.props.updateTimer(curr_time);
      }
      // If the count down is finished, write some text
      if (distance <= 0) {
        clearCorrectingInterval(this.props.timer_interval);
        this.finishMainMission();
        this.setState({ finishMissionCalled: true })
      }
    }, 1000);
    this.props.reloadTimer(x);
  }

  finishMainMission() {
    if (this.state.finishMissionCalled) {
      console.log("finishMainMission called second time")
    } else {
      this.setFinishMissionErrorVisible(false);
      this.setState({ load_missions: true });
      let body = {
        outletId: this.props.selectedMall.id,
        missionId: this.state.mainMissionId
      };
      let promise = httpPost(
        urls.finish_mission,
        JSON.stringify(body),
        this.props.token
      );
      promise.then(
        result => {
          this.setFinishMissionErrorVisible(false);
          this.props.timerStatus(false);
          this.props.showDoneNotification(true);
          this.props.setBalance(result.body.balance);
          this.setState({ load_missions: false });
        },
        error => {
          let error_respons = handleError(error, this.constructor.name, "finishMainMission");
          this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code });
          this.setFinishMissionErrorVisible(error_respons.error_modal);
          this.setState({ load_missions: false });
        }
      );
    }
  }

  dashboardStyles() {
    switch (this.props.dashboardState) {
      case 1: {
        return this.props.timer_status
          ? [styles.drag_container, styles.drag_container_small]
          : [styles.drag_container, styles.drag_container_small_no_main_task];
        break;
      }
      case 2: {
        return this.props.timer_status
          ? [styles.drag_container, styles.drag_container_big]
          : [styles.drag_container, styles.drag_container_big_no_main_task];
        break;
      }
    }
  }

  render() {
    return (
      <View style={styles.main_view}>
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.startMissionErrorVisible}
          first_btn_handler={() => {
            (this.state.errorCode != 416 && this.state.errorCode != 418) ? this.callTimer() : this.setStartMissionErrorVisible(
              !this.state.startMissionErrorVisible
            );
          }}
          decline_btn_handler={() => {
            this.setStartMissionErrorVisible(
              !this.state.startMissionErrorVisible
            );
          }}
        />
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.missionsErrorVisible}
          first_btn_handler={() => {
            this.getMissions();
          }}
          decline_btn_handler={() => {
            this.setMissionsErrorVisible(!this.state.missionsErrorVisible);
          }}
        />
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.finishMissionErrorVisible}
          first_btn_handler={() => {
            this.finishMainMission();
          }}
          decline_btn_handler={() => {
            this.setFinishMissionErrorVisible(
              !this.state.finishMissionErrorVisible
            );
          }}
        />
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />

        <View style={styles.container}>
          {
            !this.props.activeCard ?
              <LinearGradient
                colors={[this.props.userColor.second_gradient_color, this.props.userColor.first_gradient_color]}
                start={{ x: 1.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                style={styles.grad}
              /> : <View style={styles.white} />
          }

          <DashTop
            mainMissionPrice={this.state.mainMissionPrice}
          />
          <View style={this.dashboardStyles()}>
            <CardList
              onScrollBeginDrag={() => {
                this.getMissions()
              }}
            />
          </View>
        </View>
        {this.state.load_missions && <ActivityIndicator />}
        <TimerModal callTimer={() => { this.callTimer() }} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isLocation: state.isLocation,
  isConnected: state.isConnected,
  location: state.location,
  userColor: state.userColor,
  selectedMall: state.selectedMall,
  token: state.token,
  balance: state.balance,
  timer_status: state.timer_status,
  timer: state.timer,
  dashboardState: state.dashboardState,
  missions: state.missions,
  timer_interval: state.timer_interval,
  activeCard: state.activeCard,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDoneNotification,
      showFailedNotification,
      timerStatus,
      setBalance,
      updateTimer,
      setMissions,
      reloadTimer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
