import React from "react";
import { View, StatusBar, BackHandler, AsyncStorage } from "react-native";
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
//constants
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showDoneNotification } from "../../../reducers/main-task-done-notification";
import { showFailedNotification } from "../../../reducers/main-task-failed-notification";
import { setActiveCard } from "../../../reducers/set-active-card";
import { setColor } from "../../../reducers/user-color"
//services
import GeolocationService from "../../../services/geolocation-service";

class Main extends React.Component {

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.setActiveCard(false);
      return true;
    });
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      console.log(object)
      this.props.setColor(object.sex);
    });
  }
  renderLastTab = () => {
    let container;
    if (this.props.game_status == "start" || this.props.game_status == "lock") {
      container = <GameStart />
    }
    else if (this.props.game_status == "expired") {
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
        {!this.props.isLocation && <LocationDisabled />}
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
  timerShow: state.timerShow
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDoneNotification,
      showFailedNotification,
      setActiveCard,
      setColor
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
