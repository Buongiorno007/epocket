import React from 'react';
import { Platform, AppState } from 'react-native';
import geolib from 'geolib';
import BackgroundFetch from 'react-native-background-fetch';
import BackgroundTimer from 'react-native-background-timer';
import { httpPost } from './http';
//services
import getCurrentGeolocation from './get-location';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showDashboard } from '../reducers/show-dashboard';
import { setDistance } from '../reducers/distance';
import { setAppState } from '../reducers/app-state';
import { setGameStatus } from '../reducers/game-status';
import { setMainTaskId } from '../reducers/main-task-id';
import { setSheduleRequestStart } from '../reducers/set-shedule-request-start';
import { showDoneNotification } from '../reducers/main-task-done-notification';
import { showTimer } from '../reducers/show-dashboard-timer';
import { setPushStatus } from '../reducers/push-send-status';
//constants
import { urls } from '../constants/urls';
import firebase from 'react-native-firebase';
import I18n from '@locales/I18n';

class GeolocationService extends React.Component {
  state = {
    sheduleRequest: null
  };

  startMissionRequest = () => {
    let body = {
      outlet_id: this.props.selectedMall.id
    };
    httpPost(urls.start_mission, JSON.stringify(body), this.props.token).then(
      result => {
        if (result.body.interval <= 0) {
          this.finishMainTask();
        }
        if (result.body.failed) {
          this.rejectMainTask();
        }
        this.props.setMainTaskId(result.body.id);
      },
      error => {}
    );
  };

  sendTimerRequest = () => {
    let interval = 900000;
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15 // <-- minutes (15 is minimum allowed)
      },
      () => {
        this.startMissionRequest();
      },
      error => {}
    );
    BackgroundTimer.runBackgroundTimer(() => {
      this.startMissionRequest();
    }, interval);
    //rest of code will be performing for iOS on background too
  };

  finishMainTask() {
    let body = {
      outlet_id: this.props.selectedMall.id,
      mission_id: this.props.mainTaskId
    };
    httpPost(urls.finish_mission, JSON.stringify(body), this.props.token).then(
      result => {
        if (body.status == 200) {
          this.props.timerStatus(false);
          this.props.showDoneNotification(true);
          this.props.setBalance(result.balance);
        }
      },
      error => {}
    );
  }

  sendDistancePush = message => {
    const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('EpocketCash')
      .setBody(message);

    notification.android
      .setChannelId('chanelId')
      .android.setColor(this.props.userColor.pink)
      .android.setSmallIcon('@drawable/ic_notif');

    firebase.notifications().displayNotification(notification);
  };

  // getCurrentGeolocation = () => {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(
  //       position => {
  //         resolve({
  //           lng: position.coords.longitude,
  //           lat: position.coords.latitude
  //         })
  //       },
  //       error => {
  //         reject(null);
  //       }
  //     );
  //   });
  // };
  _handleAppStateChange = nextAppState => {
    if (
      this.props.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getCurrentGeolocation().then(
        location => {
          this.calculateDistance(
            {
              latitude: this.props.closestMall.lat,
              longitude: this.props.closestMall.lng
            },
            {
              latitude: location.lat,
              longitude: location.lng
            }
          );
        },
        error => {}
      );
    }
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  closeMission = () => {
    this.props.showFailedNotification(true);
    BackgroundTimer.stopBackgroundTimer();
  };

  calculateDistance = (currentLocation, nextLocation, nextProps) => {
    if (
      currentLocation.latitude !== 0 &&
      currentLocation.longitude !== 0 &&
      nextLocation.latitude !== 0 &&
      nextLocation.longitude !== 0
    ) {
      let distance =
        geolib.getDistance(
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          },
          {
            latitude: nextLocation.latitude,
            longitude: nextLocation.longitude
          }
        ) - this.props.closestMall.rad;
      if (nextProps.isLocation && this.props.isLocation) {
        if (distance > 100) {
          this.props.setPushStatus(true);
        }
        if (distance <= 100 && !nextProps.pushSendStaus) {
          this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_3'));
          this.props.setPushStatus(true);
        }
        if (
          distance <= 0 &&
          !this.props.timer_status &&
          nextProps.timer_status
        ) {
          this.props.showDashboard(true);
          this.props.showTimer(false);
          this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_4'));
        }
        if (distance > 0 && this.props.timer_status) {
          this.props.showDashboard(false);
          this.props.showTimer(true);
          this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_5'));
        }
      }
    }
  };

  componentWillReceiveProps = nextProps => {
    if (
      (this.props.selectedMall.lat &&
        this.props.selectedMall.lng &&
        nextProps.location.lat.toFixed(4) !=
          this.props.location.lat.toFixed(4) &&
        nextProps.location.lng.toFixed(4) !=
          this.props.location.lng.toFixed(4)) ||
      (this.props.selectedMall.lat &&
        this.props.selectedMall.lng &&
        !this.state.sendDistancePush &&
        nextProps.location.lat.toFixed(4) ===
          this.props.location.lat.toFixed(4) &&
        nextProps.location.lng.toFixed(4) ===
          this.props.location.lng.toFixed(4))
    ) {
      this.calculateDistance(
        {
          latitude: this.props.closestMall.lat,
          longitude: this.props.closestMall.lng
        },
        {
          latitude: nextProps.location.lat,
          longitude: nextProps.location.lng
        },
        nextProps
      );
    }
    if (nextProps.timer_status && !nextProps.sheduleRequestStart) {
      this.props.setSheduleRequestStart(true);
      this.sendTimerRequest();
    }
    if (!nextProps.timer_status && nextProps.sheduleRequestStart) {
      this.props.setSheduleRequestStart(false);
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
      BackgroundTimer.stopBackgroundTimer();
    }
    if (!nextProps.isLocation && !this.props.isLocation) {
      this.props.showDashboard(false);
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    isLocation: state.isLocation,
    userColor: state.userColor,
    location: state.location,
    selectedMall: state.selectedMall,
    timer_status: state.timer_status,
    distance: state.distance,
    token: state.token,
    dashboard: state.dashboard,
    sheduleRequestStart: state.sheduleRequestStart,
    appState: state.appState,
    mainTaskId: state.mainTaskId,
    game_status: state.game_status,
    pushSendStaus: state.pushSendStaus,
    closestMall: state.closestMall
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDashboard,
      setDistance,
      showDoneNotification,
      setSheduleRequestStart,
      setAppState,
      setMainTaskId,
      setGameStatus,
      showTimer,
      setPushStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeolocationService);
