import React from "react";
import { View, StatusBar, BackHandler } from "react-native";
//components
import Map from "./../map/map";
import Profile from "./../profile/profile";
import Cashout from "./../cashout/cashout";
import History from "./../history/history";
import Info from "./../info/info";
import Dashboard from "../dashboard/dashboard";
//containers
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import ReturnToMall from "../../containers/return-to-mall-timer/return-to-mall-timer";
import NoInternet from "../../containers/no-internet/no-internet";
import TimerModal from "../../containers/timer-modal/timer-modal";
//constants
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showDoneNotification } from "../../../reducers/main-task-done-notification";
import { showFailedNotification } from "../../../reducers/main-task-failed-notification";
import { setActiveCard } from "../../../reducers/set-active-card";
//services
import GeolocationService from "../../../services/geolocation-service";

class Main extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.setActiveCard(false);
      return true;
    });
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
          {this.props.activeTab == 0 ? <Profile /> : null}
          {this.props.activeTab == 1 ? <Cashout /> : null}
          {this.props.activeTab == 2 ? ( this.props.dashboard ? ( <Dashboard/> ) : ( <Map /> ) ) : null}
          {this.props.activeTab == 3 ? <History /> : null}
          {this.props.activeTab == 4 ? <Info /> : null}
        </View>
        {!this.props.isConnected && <NoInternet />}
        {!this.props.dashboard && this.props.timer_status && <ReturnToMall />}
        <GeolocationService />
        {this.props.loader && <ActivityIndicator />}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  activeTab: state.activeTab,
  loader: state.loader,
  isConnected: state.isConnected,
  dashboard: state.dashboard,
  timer_status: state.timer_status,
  doneNotification: state.doneNotification,
  failedNotification: state.failedNotification
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showDoneNotification,
      showFailedNotification,
      setActiveCard
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
