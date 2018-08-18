import React from "react";
import { AsyncStorage } from "react-native";
import geolib from "geolib";
import BackgroundFetch from "react-native-background-fetch";
import { sendToTelegramm } from "./telegramm-notification";
import BackgroundTimer from "react-native-background-timer";
//services
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showDashboard } from "../reducers/show-dashboard";
import { setDistance } from "../reducers/distance";
import { showDoneNotification } from "../reducers/main-task-done-notification";
//constants
import { urls } from "../constants/urls";

class GeolocationService extends React.Component {
  state = {
    sheduleRequestStart: false,
    interval: 900000,
    // interval: 10000,
    sheduleRequest: null
  };
  startMissionRequest = () => {
    let body = {
      outletId: this.props.selectedMall.id
    };
    let promise = newHttpPost(
      urls.start_mission,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        console.log("Fulfilled sendTimerRequest ", result);
        if (result.interval <= 0) {
          this.finishMainTask();
        }
        if (result.failed) {
          this.rejectMainTask();
        }
        this.setState({ mainTaskId: result.id });
      },
      error => {
        console.log("Rejected: ", error);
      }
    );
  };

  sendTimerRequest = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      this.startMissionRequest();
      sendToTelegramm("sendTimerRequest BackgroundTimer");
    }, this.state.interval);
    // BackgroundFetch.configure({
    //     minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
    //     stopOnTerminate: false,   // <-- Android-only,
    //     startOnBoot: true         // <-- Android-only
    // }, () => {
    //     console.log("[js] Received background-fetch event");
    //     this.startMissionRequest();
    //     sendToTelegramm('sendTimerRequest BackgroundFetch')
    // }, (error) => {
    //     console.log("[js] RNBackgroundFetch failed to start", error);
    // });
  };

  finishMainTask() {
    let body = {
      outletId: this.props.selectedMall.id,
      missionId: this.state.mainTaskId
    };
    let promise = newHttpPost(
      urls.finish_mission,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        console.log("Fulfilled fnishMainTask: ", result);
        if (body.status == 200) {
          AsyncStorage.setItem("balance", result.balance);
          this.props.timerStatus(false);
          this.props.showDoneNotification(true);
          this.props.setBalance(result.balance);
        }
      },
      error => {
        console.log("Rejected: ", error);
      }
    );
  }

  closeMission = () => {
    this.props.showFailedNotification(true);
  };

  componentWillReceiveProps = nextProps => {
    if (
      this.props.selectedMall.lat &&
      this.props.selectedMall.lng &&
      nextProps.location.lat != this.props.location.lat &&
      nextProps.location.lng != this.props.location.lng
    ) {
      let distance =
        geolib.getDistance(
          {
            latitude: this.props.selectedMall.lat,
            longitude: this.props.selectedMall.lng
          },
          {
            latitude: nextProps.location.lat,
            longitude: nextProps.location.lng
          }
        ) - this.props.selectedMall.rad;

      this.props.setDistance(distance);

      if (distance <= 0 && nextProps.isLocation && this.props.isLocation) {
        this.props.showDashboard(true);
      } else {
        this.props.showDashboard(false);
      }
    }
    if (nextProps.timer_status && !this.state.sheduleRequestStart) {
      this.setState({ sheduleRequestStart: true });
      this.sendTimerRequest();
      console.log("timer started");
    }
    if (!nextProps.timer_status && this.state.sheduleRequestStart) {
      this.setState({ sheduleRequestStart: false });
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
      // clearInterval(this.state.sheduleRequest);
      console.log("timer canceled");
    }
    if (!nextProps.isLocation && !this.props.isLocation) {this.props.showDashboard(false);}
  }; 

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    isLocation: state.isLocation,
    location: state.location,
    selectedMall: state.selectedMall,
    timer: state.timer_status,
    distance: state.distance,
    token: state.token
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDashboard,
      setDistance,
      showDoneNotification
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeolocationService);
