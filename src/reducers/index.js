import { combineReducers } from "redux";
import isConnected from "./net-info";
import isLocation from "./geolocation-status";
import location from "./geolocation-coords";
import activeTab from "./tabs";
import selectedMall from "./selected-mall";
import dashboard from "./show-dashboard";
import doneNotification from "./main-task-done-notification";
import failedNotification from "./main-task-failed-notification";
import timer_status from "./timer-status";
import timer from "./timer";
import distance from "./distance";
import token from "./token";
import socket from "./socket";
import missions from "./missions";
import outlets from "./outlet-list";
import balance from "./user-balance";
import activeCard from "./set-active-card";
import dashboardState from "./dashboard-state";
import selectedMission from "./selected-mission";
import profileState from "./profile-state";
import receivedBonusesJSX from "./history-received-success";
import spentBonusesJSX from "./history-sent-success";
import loader from "./loader";
import timer_interval from "./timer-interval";

export default combineReducers({
  isConnected,
  isLocation,
  activeTab,
  location,
  selectedMall,
  dashboard,
  doneNotification,
  failedNotification,
  timer_status,
  timer,
  distance,
  token,
  balance,
  activeCard,
  dashboardState,
  selectedMission,
  profileState,
  receivedBonusesJSX,
  spentBonusesJSX,
  loader,
  missions,
  timer_interval,
  socket,
  outlets
});
