import React from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import { Button } from 'native-base';
import CookieManager from 'react-native-cookies';
//containers
import CardList from '../../containers/card-list/card-list';
import CardListPosts from '../../containers/card-posts-list/card-posts-list';
import CustomAlert from '../../containers/custom-alert/custom-alert';
import HistoryNavButton from './../../containers/history-nav-button/history-nav-button';
import Loader from '@containers/application/loader'
import DashTop from '../../containers/dash-top/dash-top';
import Balance from '../../containers/cashout-balance/cashout-balance';
import TimerModal from '../../containers/timer-modal/timer-modal';
//constants
import styles from './styles';
import styles_top from './styles_top';
import { ICONS } from '../../../constants/icons';
import { urls } from '../../../constants/urls';
import { colors } from '../../../constants/colors';
//redux
import { setBalance } from '../../../reducers/user-balance';
import { showDoneNotification } from '../../../reducers/main-task-done-notification';
import { showFailedNotification } from '../../../reducers/main-task-failed-notification';
import { setDashboardState } from '../../../reducers/dashboard-state';
import { timerStatus } from '../../../reducers/timer-status';
import { setMissions } from '../../../reducers/missions';
import { updateTimer } from '../../../reducers/timer';
import { reloadTimer } from '../../../reducers/timer-interval';
import { setCount } from '../../../reducers/social-count';
import { setActiveCard } from '../../../reducers/set-active-card';
import { selectMission } from '../../../reducers/selected-mission';
import { setInstaToken } from '../../../reducers/insta-token';
import { setFacebookToken } from '../../../reducers/facebook-token';
import { loaderState } from '../../../reducers/loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//services
import { httpPost } from '../../../services/http';
import '../../../services/correcting-interval';
import { orderBy } from 'lodash';
import moment from 'moment';
import InstagramLogin from '../../../services/Instagram';
import FacebookLogin from '../../../services/Facebook';
import { handleError } from '../../../services/http-error-handler';
import I18n from '@locales/I18n';

const { width, height } = Dimensions.get('window');
const CustomLayoutLinearFont = {
  duration: 150,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.fontSize
  },
  update: {
    type: LayoutAnimation.Types.curveEaseInEaseOut
  }
};
const CustomLayoutLinear = {
  duration: 150,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.flexDirection
  },
  update: {
    type: LayoutAnimation.Types.curveEaseInEaseOut
  }
};
class Dashboard extends React.Component {
  state = {
    modalVisible: false,
    pickedCashout: false,
    errorVisible: false,
    userCount: 0,
    sex: 0,
    pickedTask: true,
    notInMall: false,
    startMissionErrorVisible: false,
    missionsErrorVisible: false,
    finishMissionErrorVisible: false,
    load_timer: true,
    load_missions: true,
    mainMission: true,
    mainMissionId: 0,
    mainMissionPrice: 0,
    body: {
      outlet_id: this.props.selectedMall.id,
      notInMall:
        this.props.distance <= 0 && this.props.isLocation ? false : true
    },
    errorText: '',
    errorCode: '',
    finishMissionCalled: false,
    topHeight: new Animated.Value(height * 0.35),
    epcСounterFontSize: new Animated.Value(76),
    timerWidth: new Animated.Value(width * 0.85),
    timerCounterWidth: new Animated.Value(width * 0.25),
    textScale: new Animated.Value(1),
    epcScale: new Animated.Value(Platform.OS == 'ios' ? 0 : 0.00001),
    epcCounterContainerWidth: new Animated.Value(width * 0.85),
    topPadding: new Animated.Value(-20),
    listHeight: new Animated.Value(height * 0.65),
    topImageOpacity: new Animated.Value(1),
    allScaleY: new Animated.Value(1),
    flexDirection: 'column',
    notInMallTimer: {
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    forceCloseHeader: false,
    currency: ''
  };
  constructor(props) {
    super(props);
    if (Platform.OS != 'ios') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        const draggedDown = gestureState.dy > 30;
        const draggedUp = gestureState.dy < -30;
        if (gestureState.moveY < 233 && !this.state.forceCloseHeader) {
          if (this.state.body.notInMall || this.state.finishMissionCalled) {
            if (draggedDown) {
              if (this.props.activeCard) {
              } else {
                this.runAnimation(
                  {
                    toValue: 76,
                    duration: 100
                  },
                  {
                    toValue: height * 0.35,
                    duration: 100
                  },
                  {
                    toValue: 1,
                    duration: 100
                  },
                  {
                    toValue: Platform.OS == 'ios' ? 0 : 0.00001,
                    duration: 100
                  },
                  {
                    toValue: width * 0.85,
                    duration: 50
                  },
                  {
                    toValue: width * 0.25,
                    duration: 50
                  },
                  {
                    toValue: width * 0.85,
                    duration: 50
                  },
                  'column',
                  {
                    toValue: -20,
                    duration: 100
                  },
                  {
                    toValue: height * 0.65,
                    duration: 1100
                  },
                  {
                    toValue: 1,
                    duration: 200
                  },
                  {
                    toValue: 1,
                    duration: 200
                  }
                );
              }
            }
            if (draggedUp) {
              if (this.props.activeCard) {
              } else {
                Animated.parallel([
                  Animated.timing(this.state.topHeight, {
                    toValue: height * 0.15, //0.2
                    duration: 100,
                    easing: Easing.linear
                  }),
                  Animated.timing(this.state.topImageOpacity, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear
                  }),
                  Animated.timing(this.state.listHeight, {
                    toValue: height * 0.85,
                    duration: 10,
                    easing: Easing.linear
                  }),
                  Animated.timing(this.state.allScaleY, {
                    toValue: Platform.OS == 'ios' ? 0 : 0.00001,
                    duration: 200,
                    easing: Easing.linear
                  })
                ]).start();
              }
            }
          } else {
            if (draggedDown) {
              if (this.props.activeCard) {
              } else {
                this.runAnimation(
                  {
                    toValue: 76,
                    duration: 100
                  },
                  {
                    toValue: height * 0.35,
                    duration: 100
                  },
                  {
                    toValue: 1,
                    duration: 100
                  },
                  {
                    toValue: Platform.OS == 'ios' ? 0 : 0.0001,
                    duration: 100
                  },
                  {
                    toValue: width * 0.85,
                    duration: 50
                  },
                  {
                    toValue: width * 0.25,
                    duration: 50
                  },
                  {
                    toValue: width * 0.85,
                    duration: 50
                  },
                  'column',
                  {
                    toValue: -20,
                    duration: 100
                  },
                  {
                    toValue: height * 0.65,
                    duration: 1100
                  },
                  {
                    toValue: 1,
                    duration: 100
                  },
                  {
                    toValue: 1,
                    duration: 100
                  }
                );
              }
            }
            if (draggedUp) {
              //closed
              if (this.props.activeCard) {
              } else {
                this.runAnimation(
                  {
                    toValue: 30,
                    duration: 100
                  },
                  {
                    toValue: height * 0.2, //0.2
                    duration: 100
                  },
                  {
                    toValue: Platform.OS == 'ios' ? 0 : 0.001,
                    duration: 100
                  },
                  {
                    toValue: 1,
                    duration: 100
                  },
                  {
                    toValue: width * 0.6,
                    duration: 50
                  },
                  {
                    toValue: width * 0.2,
                    duration: 50
                  },
                  {
                    toValue: width * 0.3,
                    duration: 50
                  },
                  'row',
                  {
                    toValue: -60,
                    duration: 100
                  },
                  {
                    toValue: height * 0.8,
                    duration: 10
                  },
                  {
                    toValue: 1,
                    duration: 100
                  },
                  {
                    toValue: 1,
                    duration: 100
                  }
                );
              }
            }
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {}
    });
  }
  componentDidMount = () => {
    if (this.props.navigation.state.params.cardToOpen) {
      this.props.setDashboardState(2);
      this.props.setActiveCard(true);
      this.props.selectMission(
        this._submissionOrder(this.props.navigation.state.params.cardToOpen)
      );
    }
    AsyncStorage.getItem('user_info').then(value => {
      let object = JSON.parse(value);
      this.setState({
        sex: object.sex,
        currency: object.currency
      });
    });
    let count = 0;
    this.props.navigation.state.params.dashboard_data.forEach(element => {
      if (
        element.type === 'instagram_connect' ||
        element.type === 'facebook_connect'
      ) {
        count++;
      }
    });
    this.props.setCount(count);
    this.props.setMissions(this.props.navigation.state.params.dashboard_data);
    this.setState({ load_missions: false, load_timer: false });
    this.props.navigation.state.params.general_info.outlet
      ? this.setState({ pickedCashout: true })
      : this.callTimer();
  };
  runAnimation = (
    epcСounterFontSizeProps,
    topHeightProps,
    textScaleProps,
    epcScaleProps,
    timerWidthProps,
    timerCounterWidthProps,
    epcCounterContainerWidthProps,
    flexDirectionProp,
    topPaddingProps,
    listHeightProps,
    topImageOpacityProps,
    allScaleYProps
  ) => {
    Animated.parallel([
      LayoutAnimation.configureNext(
        Platform.OS == 'ios'
          ? CustomLayoutLinearFont
          : LayoutAnimation.Presets.linear
      ),
      this.setState({ epcСounterFontSize: epcСounterFontSizeProps.toValue }),
      Animated.timing(this.state.topHeight, {
        toValue: topHeightProps.toValue,
        duration: topHeightProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.textScale, {
        toValue: textScaleProps.toValue,
        duration: textScaleProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.epcScale, {
        toValue: epcScaleProps.toValue,
        duration: epcScaleProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.timerWidth, {
        toValue: timerWidthProps.toValue,
        duration: timerWidthProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.timerCounterWidth, {
        toValue: timerCounterWidthProps.toValue,
        duration: timerCounterWidthProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.epcCounterContainerWidth, {
        toValue: epcCounterContainerWidthProps.toValue,
        duration: epcCounterContainerWidthProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.topPadding, {
        toValue: topPaddingProps.toValue,
        duration: topPaddingProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.listHeight, {
        toValue: listHeightProps.toValue,
        duration: listHeightProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.topImageOpacity, {
        toValue: topImageOpacityProps.toValue,
        duration: topImageOpacityProps.duration,
        easing: Easing.linear
      }),
      Animated.timing(this.state.allScaleY, {
        toValue: allScaleYProps.toValue,
        duration: allScaleYProps.duration,
        easing: Easing.linear
      }),
      LayoutAnimation.configureNext(
        Platform.OS == 'ios'
          ? CustomLayoutLinear
          : LayoutAnimation.Presets.linear
      ),
      this.setState({ flexDirection: flexDirectionProp })
    ]).start();
  };
  _submissionOrder = mission => {
    let insta_sub_mission = {
      desc: I18n.t('MISSION.SUBMISSION_3'),
      id: 1,
      name: 'insta submission',
      type: 2,
      flatlistData: []
    };
    mission.subMissions.length &&
      (mission.subMissions = orderBy(mission.subMissions, ['type'], ['desc']));
    mission.subMissions.push(insta_sub_mission);
    return mission;
  };

  setErrorVisible = visible => {
    this.setState({
      errorVisible: visible
    });
  };
  setModalVisible = visible => {
    this.setState({
      modalVisible: visible
    });
  };
  LoginFacebook = () => {
    this.props.loaderState(true);
    let body = JSON.stringify({});
    httpPost(urls.facebook_login, body, this.props.token).then(
      result => {
        this.props.loaderState(false);
        this.refs.facebookLogin.show(result.body.url);
      },
      error => {
        CookieManager.clearAll().then(res => {
          this.props.loaderState(false);
        });
      }
    );
  };
  connectFacebook = token => {
    this.props.setFacebookToken(String(token));
  };
  connectInsta = instagram_token => {
    this.props.loaderState(true);
    let body = JSON.stringify({
      instagram_token
    });
    httpPost(urls.insta_login, body, this.props.token).then(
      result => {
        if (result.status === 200) {
          this.props.setInstaToken(String(instagram_token));
          this.props.loaderState(false);
        } else if (result.status == 201) {
          CookieManager.clearAll().then(res => {
            this.setModalVisible(true);
            this.setState({ userCount: result.body.subsc_needed });
            this.props.loaderState(false);
          });
        } else {
          CookieManager.clearAll().then(res => {
            this.setErrorVisible(true);
            this.props.loaderState(false);
          });
        }
      },
      error => {
        CookieManager.clearAll().then(res => {
          this.props.loaderState(false);
        });
      }
    );
  };
  pickTasks = () => {
    let pick = this.state.pickedTask;
    this.setState({ pickedTask: !pick });
  };
  pickPosts = () => {
    let pick = this.state.pickedTask;
    this.setState({ pickedTask: !pick });
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
    let curr_time = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.props.updateTimer(curr_time);
    this.setStartMissionErrorVisible(false);
    httpPost(
      urls.start_mission,
      JSON.stringify(this.state.body),
      this.props.token
    ).then(
      result => {
        this.setStartMissionErrorVisible(false);
        this.setState({ load_timer: false });
        this.setState(
          {
            mainMissionId: result.body.id,
            mainMissionPrice: result.body.formated.amount
          },
          () => {
            if (result.body.failed) {
              this.props.showFailedNotification(true);
              this.props.timerStatus(false);
            } else {
              this.setState({ notInMall: false });
              if (result.body.interval <= 0) {
                this.props.timerStatus(false);
                this.finishMainMission();
              } else if (result.body.interval > 0) {
                //blocks second call on mount
                if (this.props.distance <= 0 && this.props.isLocation) {
                  this.props.timerStatus(true);
                  this.setState({ finishMissionCalled: false });
                  clearCorrectingInterval(this.props.timer_interval);
                  this.timer(result.body.interval * 1000);
                } else {
                  this.props.timerStatus(false);
                  this.setState({ notInMall: true });
                  let time = result.body.interval * 1000;
                  let hours = Math.floor(
                    (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  );
                  let minutes = Math.floor(
                    (time % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  let seconds = Math.floor((time % (1000 * 60)) / 1000);
                  if (hours >= 0 && minutes >= 0 && seconds >= 0) {
                    let notInMallTimer = {
                      hours: hours,
                      minutes: minutes,
                      seconds: seconds
                    };
                    this.setState({ notInMallTimer });
                  }
                }
              }
            }
          }
        );
      },
      error => {
        this.setState({ load_timer: false });
        let error_respons = handleError(
          error,
          this.state.body,
          urls.start_mission,
          this.props.token,
          this.constructor.name,
          'callTimer'
        );
        this.setState({
          errorText: error_respons.error_text,
          errorCode: error_respons.error_code
        });
        let notInMallTimer = {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        this.setState({ notInMallTimer });
        this.props.updateTimer(notInMallTimer);
        if (error.code == 415) {
          this.setState({ forceCloseHeader: true });
          Animated.parallel([
            Animated.timing(this.state.topHeight, {
              toValue: height * 0.15, //0.2
              duration: 1,
              easing: Easing.linear
            }),
            Animated.timing(this.state.topImageOpacity, {
              toValue: 0,
              duration: 1,
              easing: Easing.linear
            }),
            Animated.timing(this.state.listHeight, {
              toValue: height * 0.85,
              duration: 1,
              easing: Easing.linear
            }),
            Animated.timing(this.state.allScaleY, {
              toValue: Platform.OS == 'ios' ? 0 : 0.00001,
              duration: 1,
              easing: Easing.linear
            })
          ]).start();
        }
        if (error.code != 416 && error.code != 418 && error.code != 415) {
          this.setStartMissionErrorVisible(error_respons.error_modal);
        } else {
          this.setState({ finishMissionCalled: true });
        }
      }
    );
  }
  getActiveMissions = missions => {
    missions.forEach(item => {
      let currentTime = moment().format('HH:mm:ss');
      let startTime = moment(item.date_start).format('HH:mm:ss');
      let endTime = moment(item.date_end).format('HH:mm:ss');
      item.active =
        item.type != 'instagram_connect' && item.type != 'facebook_connect'
          ? currentTime > startTime && currentTime < endTime
          : true;
    });
    return orderBy(
      orderBy(missions, ['price'], ['desc']),
      ['active'],
      ['desc']
    );
  };
  getMissions = () => {
    this.setMissionsErrorVisible(false);
    this.setState({ load_missions: true });
    httpPost(
      urls.missions,
      JSON.stringify(this.state.body),
      this.props.token
    ).then(
      result => {
        this.setMissionsErrorVisible(false);
        this.setState({ load_missions: false });
        if (result.status == 200) {
          this.props.setMissions(this.getActiveMissions(result.body.missions));
        }
      },
      error => {
        let error_respons = handleError(
          error,
          this.state.body,
          urls.missions,
          this.props.token,
          this.constructor.name,
          'getMissions'
        );
        this.setState({
          errorText: error_respons.error_text,
          errorCode: error_respons.error_code
        });
        this.setMissionsErrorVisible(error_respons.error_modal);
        this.setState({ load_missions: false });
      }
    );
  };
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
        this.setState({ finishMissionCalled: true });
      }
    }, 1000);
    this.props.reloadTimer(x);
  }
  finishMainMission() {
    if (this.state.finishMissionCalled) {
    } else {
      this.setFinishMissionErrorVisible(false);
      this.setState({ load_missions: true });
      let body = {
        outlet_id: this.props.selectedMall.id,
        mission_id: this.state.mainMissionId
      };
      httpPost(
        urls.finish_mission,
        JSON.stringify(body),
        this.props.token
      ).then(
        result => {
          this.setFinishMissionErrorVisible(false);
          this.props.timerStatus(false);
          this.props.showDoneNotification(true);
          this.props.setBalance(result.body.balance);
          this.setState({ load_missions: false });
        },
        error => {
          let error_respons = handleError(
            error,
            body,
            urls.finish_mission,
            this.props.token,
            this.constructor.name,
            'finishMainMission'
          );
          this.setState({
            errorText: error_respons.error_text,
            errorCode: error_respons.error_code
          });
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
          ? [styles.drag_container]
          : [styles.drag_container];
        break;
      }
      case 2: {
        return this.state.pickedCashout && this.props.activeCard
          ? [styles.drag_container, { height: height * 0.9 }]
          : [styles.drag_container];
        break;
      }
    }
  }

  render() {
    return (
      <View style={styles.main_view}>
        <CustomAlert
          title={I18n.t('PROFILE_PAGE.ALREADY_ACCOUNT')}
          first_btn_title={I18n.t('OK')}
          visible={this.state.errorVisible}
          first_btn_handler={() =>
            this.setErrorVisible(!this.state.errorVisible)
          }
          decline_btn_handler={() =>
            this.setErrorVisible(!this.state.errorVisible)
          }
        />
        <CustomAlert
          title={I18n.t('PROFILE_PAGE.NOT_ENOUGHT_SUB')}
          subtitle={this.state.userCount + I18n.t('PROFILE_PAGE.SUBS')}
          first_btn_title={I18n.t('OK')}
          visible={this.state.modalVisible}
          first_btn_handler={() =>
            this.setModalVisible(!this.state.modalVisible)
          }
          decline_btn_handler={() =>
            this.setModalVisible(!this.state.modalVisible)
          }
        />
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={I18n.t('REPEAT')}
          visible={this.state.startMissionErrorVisible}
          first_btn_handler={() => {
            this.state.errorCode != 416 && this.state.errorCode != 418
              ? this.callTimer()
              : this.setStartMissionErrorVisible(
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
          first_btn_title={I18n.t('REPEAT')}
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
          first_btn_title={I18n.t('REPEAT')}
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
        <FacebookLogin
          ref="facebookLogin"
          scopes={['basic']}
          onLoginSuccess={json => this.connectFacebook(json.token)}
          onLoginFailure={data => {
            CookieManager.clearAll().then(res => {
              this.props.loaderState(false);
            });
            if (data.msg === 'Not enough friends') {
              if (data.subsc_needed) {
                this.setState({ userCount: data.subsc_needed });
                this.setModalVisible(true);
              }
            } else {
              this.setErrorVisible(true);
            }
          }}
        />
        <InstagramLogin
          ref="instagramLogin"
          clientId="7df789fc907d4ffbbad30b7e25ba3933"
          scopes={['basic']}
          onLoginSuccess={token => this.connectInsta(token)}
          onLoginFailure={data => {
            CookieManager.clearAll().then(res => {
              this.props.loaderState(false);
            });
          }}
        />

        {!this.props.activeCard ? (
          <View style={styles.grad}>
            <LinearGradient
              colors={[
                this.props.userColor.first_gradient_color,
                this.props.userColor.second_gradient_color
              ]}
              start={{ x: 0.0, y: 5.0 }}
              end={{ x: 1.0, y: 5.0 }}
              style={styles.grad}
            />
            <Animated.Image
              style={[
                styles.background_image,
                {
                  opacity: this.state.topImageOpacity
                }
              ]}
              source={{
                uri: this.props.navigation.state.params.general_info.photo
              }}
            />
            <Animated.View
              style={[
                styles.background_image_mask,
                {
                  opacity: this.state.topImageOpacity
                }
              ]}
            />
          </View>
        ) : (
          <View style={styles.white} />
        )}

        <Animated.View
          style={[
            styles.dash_top,
            {
              height: !this.props.activeCard
                ? this.state.topHeight
                : height * 0.2
            }
          ]}
          {...this._panResponder.panHandlers}
        >
          {!this.props.activeCard && (
            <Balance
              navigation={{
                title: 'Карта',
                direction: 'Main'
              }}
            />
          )}
          {!this.props.activeCard ? (
            this.state.pickedCashout ? (
              <Animated.View
                style={[
                  styles_top.content_end,
                  {
                    flexDirection: this.state.flexDirection,
                    top: this.state.topPadding,
                    transform: [
                      {
                        scaleY: this.state.allScaleY
                      }
                    ]
                  }
                ]}
              >
                <View style={styles_top.cashout_text_container}>
                  <Text numberOfLines={1} style={styles_top.general_text}>
                    {this.props.navigation.state.params.general_info.adress}
                  </Text>
                  <Text numberOfLines={1} style={styles_top.general_text_big}>
                    {this.props.navigation.state.params.general_info.name}
                  </Text>
                </View>
              </Animated.View>
            ) : this.state.finishMissionCalled ? (
              <Animated.View
                style={[
                  styles_top.content_center,
                  {
                    flexDirection: this.state.flexDirection,
                    top: this.state.topPadding,
                    transform: [
                      {
                        scaleY: this.state.allScaleY
                      }
                    ]
                  },
                  { height: this.state.topHeight }
                ]}
              >
                <View
                  style={[
                    styles_top.finishMission_text_container,
                    this.state.forceCloseHeader && { display: 'none' }
                  ]}
                >
                  <Text style={styles_top.finishMission_text}>
                    {I18n.t('GOT_EPC', { currency: this.state.currency })}
                  </Text>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[
                      this.props.userColor.first_gradient_color,
                      this.props.userColor.second_gradient_color
                    ]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles_top.finishMission_text}
                  >
                    {this.state.mainMissionPrice +
                      ' ' +
                      I18n.t('EPC', { currency: this.state.currency })}
                  </LinearTextGradient>
                  <Text style={styles_top.finishMission_text}>
                    {I18n.t('FOR_TRC')}
                  </Text>
                </View>
                <Text
                  style={[
                    styles_top.text_small,
                    this.state.forceCloseHeader && { display: 'none' }
                  ]}
                >
                  {I18n.t('COME_TOMMOROW')}
                </Text>
              </Animated.View>
            ) : (
              <Animated.View
                style={[
                  styles_top.content,
                  {
                    flexDirection: this.state.flexDirection,
                    top: this.state.topPadding,
                    transform: [
                      {
                        scaleY: this.state.allScaleY
                      }
                    ]
                  }
                ]}
              >
                <Animated.View
                  style={[
                    styles_top.epc_counter_container,
                    {
                      width: this.state.epcCounterContainerWidth
                    }
                  ]}
                >
                  <View style={styles_top.epc_counter_container_currency}>
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 1.5, y: 0.0 }}
                      style={[
                        styles_top.epc_counter,
                        {
                          fontSize: 18
                        }
                      ]}
                    >
                      {/* <Text> */}
                      {Number(this.state.mainMissionPrice).toFixed()}
                      {/* </Text> */}
                    </LinearTextGradient>
                    <Animated.Text
                      style={[
                        styles_top.epc_counter_currency,
                        {
                          transform: [
                            {
                              scaleY: this.state.epcScale
                            }
                          ],
                          color: this.props.userColor.pink_blue
                        }
                      ]}
                    >
                      {' ' + I18n.t('EPC', { currency: this.state.currency })}
                    </Animated.Text>
                  </View>
                  <Animated.View
                    style={[
                      styles_top.epc_counter_info,
                      {
                        transform: [
                          {
                            scaleY: this.state.textScale
                          }
                        ]
                      }
                    ]}
                  >
                    <Text style={styles_top.epc}>
                      {I18n.t('EPC', { currency: this.state.currency })}
                    </Text>
                    <Text style={styles_top.epc_info}>
                      {I18n.t('FOR_BEING_IN_MALL')}
                    </Text>
                    <Text
                      style={
                        this.state.notInMall
                          ? styles_top.epc
                          : styles_top.epc_info
                      }
                    >
                      {this.state.notInMall
                        ? I18n.t('NOT_IN_MALL')
                        : I18n.t('TIME_STARTED')}
                    </Text>
                  </Animated.View>
                </Animated.View>

                <Animated.View
                  style={[
                    styles_top.time_counter_container,
                    {
                      width: this.state.timerWidth
                    }
                  ]}
                >
                  <Animated.View
                    style={[
                      styles_top.time_counter,
                      {
                        width: this.state.timerCounterWidth
                      }
                    ]}
                  >
                    <Text style={styles_top.time_counter_text}>
                      {this.state.notInMall
                        ? this.state.notInMallTimer.hours < 10 && '0'
                        : this.props.timer.hours < 10 && '0'}
                      {this.state.notInMall
                        ? this.state.notInMallTimer.hours
                        : this.props.timer.hours}
                    </Text>
                  </Animated.View>
                  <View>
                    <Text style={styles_top.time_divider}>:</Text>
                  </View>
                  <Animated.View
                    style={[
                      styles_top.time_counter,
                      {
                        width: this.state.timerCounterWidth
                      }
                    ]}
                  >
                    <Text style={styles_top.time_counter_text}>
                      {this.state.notInMall
                        ? this.state.notInMallTimer.minutes < 10 && '0'
                        : this.props.timer.minutes < 10 && '0'}
                      {this.state.notInMall
                        ? this.state.notInMallTimer.minutes
                        : this.props.timer.minutes}
                    </Text>
                  </Animated.View>
                  <View>
                    <Text style={styles_top.time_divider}>:</Text>
                  </View>
                  <Animated.View
                    style={[
                      styles_top.time_counter,
                      {
                        width: this.state.timerCounterWidth
                      }
                    ]}
                  >
                    <Text style={styles_top.time_counter_text}>
                      {this.state.notInMall
                        ? this.state.notInMallTimer.seconds < 10 && '0'
                        : this.props.timer.seconds < 10 && '0'}
                      {this.state.notInMall
                        ? this.state.notInMallTimer.seconds
                        : this.props.timer.seconds}
                    </Text>
                  </Animated.View>
                </Animated.View>
                <View style={styles_top.disabled} />
              </Animated.View>
            )
          ) : (
            <View style={styles_top.content_old}>
              <LinearGradient
                colors={[
                  this.props.userColor.second_gradient_color_02,
                  this.props.userColor.first_gradient_color_02
                ]}
                start={{ x: 0.0, y: 5.0 }}
                end={{ x: 1.0, y: 5.0 }}
                style={styles_top.location}
              >
                <View style={styles_top.location_left}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles_top.icon}
                    source={{
                      uri:
                        this.state.sex == 0
                          ? ICONS.COMMON.LOCATION_PINK
                          : ICONS.COMMON.LOCATION_BLUE
                    }}
                  />
                  <View>
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 0.5, y: 0.2 }}
                      style={styles_top.up_text}
                    >
                      {I18n.t('YOU_ARE_HERE')}
                    </LinearTextGradient>
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 0.5, y: 0.2 }}
                      style={styles_top.down_text}
                      numberOfLines={1}
                    >
                      {this.props.selectedMall.name}
                    </LinearTextGradient>
                  </View>
                </View>
                <View
                  style={[
                    styles_top.middle_border,
                    {
                      borderColor: this.props.userColor.second_gradient_color_02
                    }
                  ]}
                />
                <View style={styles_top.location_right}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles_top.icon}
                    source={{
                      uri:
                        this.state.sex == 0
                          ? ICONS.COMMON.CASH_EPC_PINK
                          : ICONS.COMMON.CASH_EPC_BLUE
                    }}
                  />
                  <View>
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 0.5, y: 0.2 }}
                      style={styles_top.up_text}
                    >
                      {I18n.t('YOUR_BONUS')}
                    </LinearTextGradient>
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 0.5, y: 0.2 }}
                      style={styles_top.down_text}
                    >
                      {this.props.balance}{' '}
                      {I18n.t('EPC', { currency: this.state.currency })}
                    </LinearTextGradient>
                  </View>
                </View>
              </LinearGradient>
              <Button
                transparent
                disabled
                style={styles_top.small_head}
                onPress={() => {
                  this.props.setDashboardState(1);
                }}
              >
                <View
                  style={[
                    styles_top.small_head,
                    this.state.pickedCashout && styles_top.disabled,
                    this.state.forceCloseHeader && { display: 'none' }
                  ]}
                >
                  <View style={styles_top.small_epc_counter_container}>
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 0.5, y: 0.2 }}
                      style={styles_top.small_epc_counter}
                    >
                      {this.state.mainMissionPrice}
                    </LinearTextGradient>
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 0.5, y: 0.2 }}
                      style={styles_top.time_counter_text}
                    >
                      {I18n.t('EPC', { currency: this.state.currency })}
                    </LinearTextGradient>
                  </View>
                  <View style={styles_top.small_time_counter_container}>
                    <LinearGradient
                      colors={[
                        this.props.userColor.second_gradient_color_02,
                        this.props.userColor.first_gradient_color_02
                      ]}
                      start={{ x: 0.0, y: 5.0 }}
                      end={{ x: 1.0, y: 5.0 }}
                      style={styles_top.small_time_counter}
                    >
                      <LinearTextGradient
                        locations={[0, 1]}
                        colors={[
                          this.props.userColor.second_gradient_color,
                          this.props.userColor.first_gradient_color
                        ]}
                        start={{ x: 0.0, y: 1.0 }}
                        end={{ x: 0.5, y: 0.2 }}
                        style={styles_top.time_counter_text}
                      >
                        {this.state.notInMall
                          ? this.state.notInMallTimer.hours < 10 && '0'
                          : this.props.timer.hours < 10 && '0'}
                        {this.state.notInMall
                          ? this.state.notInMallTimer.hours
                          : this.props.timer.hours}
                      </LinearTextGradient>
                    </LinearGradient>
                    <View>
                      <Text
                        style={[
                          styles_top.time_divider_pink,
                          { color: this.props.userColor.pink_blue }
                        ]}
                      >
                        :
                      </Text>
                    </View>
                    <LinearGradient
                      colors={[
                        this.props.userColor.second_gradient_color_02,
                        this.props.userColor.first_gradient_color_02
                      ]}
                      start={{ x: 0.0, y: 5.0 }}
                      end={{ x: 1.0, y: 5.0 }}
                      style={styles_top.small_time_counter}
                    >
                      <LinearTextGradient
                        locations={[0, 1]}
                        colors={[
                          this.props.userColor.second_gradient_color,
                          this.props.userColor.first_gradient_color
                        ]}
                        start={{ x: 0.0, y: 1.0 }}
                        end={{ x: 0.5, y: 0.2 }}
                        style={styles_top.time_counter_text}
                      >
                        {this.state.notInMall
                          ? this.state.notInMallTimer.minutes < 10 && '0'
                          : this.props.timer.minutes < 10 && '0'}
                        {this.state.notInMall
                          ? this.state.notInMallTimer.minutes
                          : this.props.timer.minutes}
                      </LinearTextGradient>
                    </LinearGradient>
                    <View>
                      <Text
                        style={[
                          styles_top.time_divider_pink,
                          { color: this.props.userColor.pink_blue }
                        ]}
                      >
                        :
                      </Text>
                    </View>
                    <LinearGradient
                      colors={[
                        this.props.userColor.second_gradient_color_02,
                        this.props.userColor.first_gradient_color_02
                      ]}
                      start={{ x: 0.0, y: 5.0 }}
                      end={{ x: 1.0, y: 5.0 }}
                      style={styles_top.small_time_counter}
                    >
                      <LinearTextGradient
                        locations={[0, 1]}
                        colors={[
                          this.props.userColor.second_gradient_color,
                          this.props.userColor.first_gradient_color
                        ]}
                        start={{ x: 0.0, y: 1.0 }}
                        end={{ x: 0.5, y: 0.2 }}
                        style={styles_top.time_counter_text}
                      >
                        {this.state.notInMall
                          ? this.state.notInMallTimer.seconds < 10 && '0'
                          : this.props.timer.seconds < 10 && '0'}
                        {this.state.notInMall
                          ? this.state.notInMallTimer.seconds
                          : this.props.timer.seconds}
                      </LinearTextGradient>
                    </LinearGradient>
                  </View>
                </View>
                <View style={styles_top.disabled} />
              </Button>
            </View>
          )}
        </Animated.View>
        <Animated.View
          style={[
            this.dashboardStyles(),
            {
              marginTop: !this.props.activeCard ? 0 : 10,
              height: !this.props.activeCard
                ? this.state.listHeight
                : height * 0.8
            }
          ]}
        >
          {!this.props.activeCard && (
            <View style={styles.nav_buttons}>
              <HistoryNavButton
                handler={!this.state.pickedTask ? () => this.pickTasks() : null}
                title={I18n.t('DASHBOARD_LIST.TASKS_TAB_TITLE')}
                disabled={this.state.pickedTask}
              />
              <HistoryNavButton
                handler={this.state.pickedTask ? () => this.pickPosts() : null}
                title={I18n.t('DASHBOARD_LIST.POSTS_TAB_TITLE')}
                disabled={!this.state.pickedTask}
              />
            </View>
          )}
          {this.state.pickedTask ? (
            <CardList
              connectSocial={e => {
                if (e.type === 'facebook_connect') {
                  this.LoginFacebook();
                } else if (e.type === 'instagram_connect') {
                  this.refs.instagramLogin.show();
                }
              }}
              onScrollBeginDrag={() => {
                //this.getMissions()
              }}
            />
          ) : (
            <CardListPosts posts={this.props.navigation.state.params.posts} />
          )}
        </Animated.View>
        {this.state.load_missions && <Loader />}
        {this.props.doneNotification || this.props.failedNotification ? (
          <View style={styles.timer_modal_container}>
            <TimerModal
              reward={this.state.mainMissionPrice}
              callTimer={() => {
                this.callTimer();
              }}
            />
          </View>
        ) : null}
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
  distance: state.distance,
  socialCount: state.socialCount,
  doneNotification: state.doneNotification,
  failedNotification: state.failedNotification
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDoneNotification,
      showFailedNotification,
      setDashboardState,
      timerStatus,
      setBalance,
      updateTimer,
      setMissions,
      reloadTimer,
      setCount,
      setInstaToken,
      setFacebookToken,
      loaderState,
      setActiveCard,
      selectMission
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
