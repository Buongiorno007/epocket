import React from "react";
import { AsyncStorage, Platform, AppState } from "react-native";
import geolib from "geolib";
import BackgroundFetch from "react-native-background-fetch";
import BackgroundTimer from 'react-native-background-timer';
import { sendToTelegramm } from "./telegramm-notification";
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
import firebase from 'react-native-firebase';
import { colors } from "../constants/colors";

class GeolocationService extends React.Component {

  state = {
    sheduleRequestStart: false,
    sheduleRequest: null,
    appState: AppState.currentState
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
    let interval = 900000
    BackgroundFetch.configure({
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
    }, () => {
      this.startMissionRequest();
    }, (error) => {
    });
    BackgroundTimer.runBackgroundTimer(() => {
      this.startMissionRequest();
    },
      interval);
    //rest of code will be performing for iOS on background too


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
    const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('EpocketCash')
      .setBody(message);

    notification
      .android.setChannelId('chanelId')
      .android.setColor(colors.pink)
      .android.setSmallIcon('@drawable/ic_notif');

    firebase.notifications().displayNotification(notification)
  }

  getCurrentGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lng: position.coords.longitude,
            lat: position.coords.latitude
          })
        },
        error => {
          reject(null);
        }
      );
    });
  };

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.getCurrentGeolocation().then((location)=>{
        this.calculateDistance({
          latitude: this.props.selectedMall.lat,
          longitude: this.props.selectedMall.lng
        },{
          latitude: location.lat,
          longitude: location.lng
        });
      },
      (error)=>{ })
    }
    this.setState({ appState: nextAppState });
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  closeMission = () => {
    this.props.showFailedNotification(true);
    BackgroundTimer.stopBackgroundTimer();
  };

  calculateDistance = (currentLocation, nextLocation) => {
    let distance = geolib.getDistance(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      {
        latitude: nextLocation.latitude,
        longitude: nextLocation.longitude
      }
    ) - this.props.selectedMall.rad;

    if (distance <= 0 && nextProps.isLocation && this.props.isLocation) {
      this.props.showDashboard(true);
      !this.props.dashboard && this.sendDistancePush(RU.PUSH_MESSAGE.PUSH_4);
    } else {
      this.props.showDashboard(false);
      this.props.dashboard && this.sendDistancePush(RU.PUSH_MESSAGE.PUSH_5);
    }
    if (distance === 120) {
      this.sendDistancePush(RU.PUSH_MESSAGE.PUSH_3);
    }
  }

  componentWillReceiveProps = nextProps => {
    if (
      this.props.selectedMall.lat &&
      this.props.selectedMall.lng &&
      nextProps.location.lat != this.props.location.lat &&
      nextProps.location.lng != this.props.location.lng
    ) {
      this.calculateDistance({
        latitude: this.props.selectedMall.lat,
        longitude: this.props.selectedMall.lng
      },{
        latitude: nextProps.location.lat,
        longitude: nextProps.location.lng
      });
    }
    if (nextProps.timer_status && !this.state.sheduleRequestStart) {
      this.setState({ sheduleRequestStart: true });
      this.sendTimerRequest();
      console.log("timer started");
    }
    if (!nextProps.timer_status && this.state.sheduleRequestStart) {
      this.setState({ sheduleRequestStart: false });
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
      BackgroundTimer.stopBackgroundTimer();
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
    token: state.token,
    dashboard: state.dashboard,
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
