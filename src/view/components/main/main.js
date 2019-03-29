import React from "react";
import { View, StatusBar, BackHandler, AsyncStorage, Platform, AppState } from "react-native";
//components
import Map from "./../map/map";
import Profile from "./../profile/profile";
import Cashout from "./../cashout/cashout";
import History from "./../history/history";
import Info from "./../info/info";
import GameStart from "./../game-start/game-start";
import Game from "./../game/game";
import GameExpired from "./../game-expired/game-expired";
import Dashboard from "../dashboard/dashboard";
//containers
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import ReturnToMall from "../../containers/return-to-mall-timer/return-to-mall-timer";
import NoInternet from "../../containers/no-internet/no-internet";
import TimerModal from "../../containers/timer-modal/timer-modal";
import LocationDisabled from "../../containers/location-disabled/location-disabled";
import RootEnabled from "../../containers/root-enabled/root-enabled"
import DateAbuseEnabled from "../../containers/date-abuse-enabled/date-abuse-enabled"
//constants
import styles from "./styles";
import PickedLanguage from "../../../locales/language-picker"
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showDoneNotification } from "../../../reducers/main-task-done-notification";
import { showFailedNotification } from "../../../reducers/main-task-failed-notification";
import { setActiveCard } from "../../../reducers/set-active-card";
import { setColor } from "../../../reducers/user-color"
import { getGameInfo } from "../../../reducers/game-info";
import { loaderState } from "../../../reducers/loader";
import { updateRootStatus } from "../../../reducers/root-status"
import { loadNTPDate } from "../../../reducers/date-abuse-status"
import { setAppState } from "../../../reducers/app-state"
//services
import GeolocationService from "../../../services/geolocation-service";

class Main extends React.Component {
  state = {
    develop: false
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      this.props.loadNTPDate();
      this.props.loaderState(true)
      this.props.updateRootStatus();
      setTimeout(() => {
        this.props.updateRootStatus();
      }, 5000);
    }
  }
  componentWillMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.setActiveCard(false);
      return true;
    });
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.props.setColor(object.sex);
    });
    if (__DEV__) {
      this.setState({ develop: true })
    }
    //this.props.getGameInfo(this.props.token, this.props.location.lat, this.props.location.lng)
  }
  renderLastTab = () => {
    let container;
    if (this.props.game_status == "start" || this.props.game_status == "lock" || this.props.game_status == "initial") {
      container = <GameStart />
    }
    else if (this.props.game_status == "expired" || this.props.game_status == "failed") {
      container = <GameExpired />
    }
    else {
      container = <Game />
    }
    return container
  }
  render() {
    return (
      <View style={styles.main_view}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <View style={styles.content}>
          {this.props.activeTab == 0 ? this.renderLastTab() : null}
          {this.props.activeTab == 1 ? <Map /> : null}
          {this.props.activeTab == 2 ? <History /> : null}
          {this.props.activeTab == 3 ? <Profile /> : null}

        </View>
        {!this.props.isConnected && <NoInternet />}
        {this.props.timerShow && this.props.timer_status && <ReturnToMall />}
        <GeolocationService />
        {this.props.loader && <ActivityIndicator />}
        {Platform.OS === "ios" ?
          !this.props.isLocation && (this.props.activeTab == 1 || this.props.activeTab == 0) && <LocationDisabled /> :
          !this.props.isLocation && <LocationDisabled />
        }
        {
          !this.state.develop && //!this.state.develop && 
          (
            Platform.OS === "ios" ?
              this.props.rootStatus && this.props.isLocation && (this.props.activeTab == 1 || this.props.activeTab == 0) && <RootEnabled /> :
              this.props.rootStatus && this.props.isLocation && <RootEnabled />
          )

        }
        {
          !this.state.develop && !this.props.dateAbuseStatus ? <DateAbuseEnabled /> : null
        }
        <TimerModal />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  activeTab: state.activeTab,
  loader: state.loader,
  userColor: state.userColor,
  isConnected: state.isConnected,
  dashboard: state.dashboard,
  info: state.info,
  timer_status: state.timer_status,
  doneNotification: state.doneNotification,
  failedNotification: state.failedNotification,
  game_status: state.game_status,
  isLocation: state.isLocation,
  timerShow: state.timerShow,
  token: state.token,
  location: state.location,
  rootStatus: state.rootStatus,
  dateAbuseStatus: state.dateAbuseStatus,
  appState: state.appState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDoneNotification,
      showFailedNotification,
      setActiveCard,
      setColor,
      updateRootStatus,
      getGameInfo,
      loadNTPDate,
      loaderState,
      setAppState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
