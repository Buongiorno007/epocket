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
import insta_token from "./insta-token";
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
import birthday from "./birthday"
import showQR from "./set-show-qr"
import sheduleRequestStart from "./set-shedule-request-start"
import appState from "./app-state"
import mainTaskId from "./main-task-id"
import info from "./info"

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
  insta_token,
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
  outlets,
  birthday,
  showQR,
  sheduleRequestStart,
  appState,
  mainTaskId,
  info
});
