import React from "react";
import { AsyncStorage, Platform } from "react-native";
import geolib from "geolib";
import BackgroundFetch from "react-native-background-fetch";
import { sendToTelegramm } from "./telegramm-notification";
import BackgroundTimer from "react-native-background-timer";
import { httpPost } from "./http";
import { RU } from "../locales/ru";
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
    sheduleRequest: null,
    user : null
  };
  startMissionRequest = () => {
    let body = {
      outletId: this.props.selectedMall.id
    };
    let promise = httpPost(
      urls.start_mission,
      JSON.stringify(body),
      this.props.token,
    );
    promise.then(
      result => {
        if (result.body.interval <= 0) {
          this.finishMainTask();
        }
        if (result.body.failed) {
          this.rejectMainTask();
        }
        this.setState({ mainTaskId: result.body.id });
      },
      error => { }
    );
    
  };

  sendTimerRequest = () => {
    BackgroundFetch.configure({
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
    }, () => {
      this.startMissionRequest();
      Platform.OS === 'ios' && sendToTelegramm('ios BackgroundFetch' + this.state.user)
    }, (error) => {
    });
  };

  finishMainTask() {
    let body = {
      outletId: this.props.selectedMall.id,
      missionId: this.state.mainTaskId
    };
    let promise = httpPost(
      urls.finish_mission,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        if (body.status == 200) {
          AsyncStorage.setItem("balance", result.balance);
          this.props.timerStatus(false);
          this.props.showDoneNotification(true);
          this.props.setBalance(result.balance);
        }
      },
      error => {
      }
    );
  }

  sendDistancePush = (message) => {
    // let body = {
    //   body: message,
    //   title:"EpocketCash",
    //   time_to_live: 3660
    // }
    // let promise = httpPost( urls.send_push_single, JSON.stringify(body), this.props.token);
    // promise.then(
    //   result => {
    //     // console.log('res',result)
    //   },
    //   error => { console.log(error)}
    // );

    fetch(urls.send_push_single, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : `JWT ${this.props.token}`
        },
        body : {
            "body": message,
            "title":"EpocketCash",
            "time_to_live": 3660
        }
    });


  }


  componentDidMount() {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({ user: object.name });
    });
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
      // sendToTelegramm('distance ' + distance, this.props.token)
      this.sendDistancePush(distance);
      if (distance <= 0 && nextProps.isLocation && this.props.isLocation) {
        this.props.showDashboard(true);
        this.sendDistancePush(RU.PUSH_MESSAGE.PUSH_4);
      } else {
        this.props.showDashboard(false);
        this.sendDistancePush(RU.PUSH_MESSAGE.PUSH_5);
      }

      if (distance === 120) {
        this.sendDistancePush(RU.PUSH_MESSAGE.PUSH_3);
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
      console.log("timer canceled");
    }
    if (!nextProps.isLocation && !this.props.isLocation) { this.props.showDashboard(false); }
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
    timer_status: state.timer_status,
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
