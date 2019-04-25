import React from "react";
import { View, Text, Dimensions, AppState, AsyncStorage } from "react-native";
import { Button } from "native-base";
import FastImage from "react-native-fast-image";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTempTime } from "../../../reducers/tempTime";
import { setFixedTime } from "../../../reducers/fixedTime";
import { setGameStatus } from "../../../reducers/game-status";
import { setAppState } from "../../../reducers/app-state";
import { loaderState } from "../../../reducers/loader";
import { passGameResult } from "../../../reducers/game-info";
import {
  playClock,
  stopClock,
  playQuestComplete,
  playQuestFail
} from "../../../reducers/sounds";
import { editGame, clearGame } from "../../../reducers/game-controller";
//constants
import { ICONS } from "../../../constants/icons";
import styles from "./styles";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import CustomProgressBar from "../../containers/custom-progress-bar/custom-progress-bar";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//services
import "../../../services/correcting-interval";
import { toHHMMSS } from "./../../../services/convert-time";
import I18n from "@locales/I18n";
import { AsyncStorage } from "react-native";

const { width } = Dimensions.get("window");

class Game extends React.Component {
  state = {
    interval: null,
    progress: 1,
    buttonActive: true,
    progressGradient: {
      colors: [
        this.props.userColor.second_gradient_color,
        this.props.userColor.first_gradient_color
      ],
      start: { x: 0.0, y: 1.0 },
      end: { x: 1.0, y: 0.0 }
    },
    currency: ""
  };
  componentDidMount() {
    this.props.loaderState(false);
    AppState.addEventListener("change", this._handleAppStateChange);
    this.props.clearGame();
    if (this.props.tempTime >= 1) {
      this.startTimer();
    }
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency });
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    clearCorrectingInterval(this.state.interval);
  }
  changePressed(i) {
    this.props.editGame(i + 1);
  }
  goToResult = status => {
    let status_for_api = status === "success" ? true : false;
    let instadata = {
      success_image: this.props.game_info.success_image,
      base64: this.props.game_info.insta_data.base64,
      hash_tag: this.props.game_info.insta_data.hash_tag,
      video: this.props.game_info.video
    };
    this.props.passGameResult(
      this.props.game_info.insta_data.id,
      status_for_api,
      this.props.token,
      status,
      instadata
    );
    clearCorrectingInterval(this.state.interval);
  };
  startTimer = () => {
    this.setState({ progress: 0 });
    this.setState({
      interval: setCorrectingInterval(() => {
        if (this.props.tempTime === 5) {
          this.props.playClock(this.props.sounds[0]);
        } else if (this.props.tempTime <= 1) {
          clearCorrectingInterval(this.state.interval);
          this.submitGame(true);
        }
        this.props.setTempTime(this.props.tempTime - 1);
      }, 1000)
    });
  };
  submitGame = timer_expired => {
    this.setState({ buttonActive: false });
    this.props.stopClock(this.props.sounds[0]);
    let pressedArray = [];
    let pressedIndexArray = [];
    this.props.game_images.forEach(item => {
      if (item.pressed) {
        pressedArray.push(item);
      }
    });
    pressedArray.forEach(pressedItem => {
      pressedIndexArray.push(pressedItem.id);
    });
    if (
      pressedArray.length >= 1 &&
      JSON.stringify(pressedIndexArray) ===
        JSON.stringify(this.props.game_info.true_answer)
    ) {
      //compare JSONs to compare arrays
      this.props.playQuestComplete(this.props.sounds[1]);
      this.goToResult("success");
    } else {
      this.props.playQuestFail(this.props.sounds[2]);
      if (timer_expired) {
        this.goToResult("expired");
      } else {
        this.goToResult("failed");
      }
    }
  };
  _handleAppStateChange = nextAppState => {
    if (
      this.props.appState.match(/background|inactive/) &&
      nextAppState === "active"
    ) {
      clearCorrectingInterval(this.state.interval);
      this.props.setTempTime(this.props.tempTime);
      this.startTimer();
    }
    this.props.setAppState(nextAppState);
  };

  render() {
    return (
      <View style={styles.main_view}>
        {this.props.loader && <ActivityIndicator />}
        <View style={styles.game_title}>
          <Text style={styles.game_cost_text}>
            {this.props.game_info.cost}{" "}
            {I18n.t("EPC", { currency: this.state.currency })}
          </Text>
          <Text style={styles.game_title_text}>
            {this.props.game_info.title}
          </Text>
        </View>
        <View style={styles.game_time}>
          <Text style={styles.game_time_text}>
            {toHHMMSS(this.props.tempTime)}
          </Text>
        </View>
        <CustomProgressBar
          style={styles.custom_progress}
          gradient={this.state.progressGradient}
          animationType={"timing"}
          borderWidth={0}
          borderRadius={12}
          height={5}
          animationConfig={{ duration: this.props.fixedTime * 1000 }}
          progress={this.state.progress}
          width={width * 0.85}
          useNativeDriver={true}
          unfilledColor={this.props.userColor.black_o90}
        />
        <View style={styles.game_description}>
          <Text style={styles.game_description_text}>
            {this.props.game_info.description}
          </Text>
        </View>
        <View style={styles.container}>
          {this.props.game_images.map((game_element, index) => {
            return (
              <Button
                transparent
                block
                key={index}
                style={[
                  game_element.pressed
                    ? index >= 6
                      ? styles.pressed_button_last_line
                      : styles.pressed_button
                    : index >= 6
                    ? styles.item_last_line
                    : styles.item
                ]}
                onPress={() => {
                  this.changePressed(index);
                }}
              >
                <View
                  style={[
                    game_element.pressed
                      ? index >= 6
                        ? styles.pressed_button_last_line
                        : styles.pressed_button
                      : index >= 6
                      ? styles.item_last_line
                      : styles.item,
                    { position: "absolute" }
                  ]}
                />
                <FastImage
                  style={styles.image_in_square}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{
                    uri: this.props.game_info.game_array[index].img
                      ? this.props.game_info.game_array[index].img
                      : ICONS.COMMON.CLOSE_WHITE,
                    priority: FastImage.priority.high
                  }}
                />
              </Button>
            );
          })}
        </View>
        <View style={styles.btn_container}>
          <CustomButton
            active={this.state.buttonActive ? true : false}
            short
            gradient
            title={I18n.t("GAME.CONFIRM").toUpperCase()}
            color={this.props.userColor.white}
            handler={() => {
              this.submitGame();
            }}
          />
        </View>
      </View>
    );
  }
}
//
const mapStateToProps = state => {
  return {
    game_info: state.game_info,
    tempTime: state.tempTime,
    token: state.token,
    loader: state.loader,
    fixedTime: state.fixedTime,
    userColor: state.userColor,
    appState: state.appState,
    game_images: state.game_controller.game_images,
    sounds: state.sounds
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTempTime,
      setFixedTime,
      setGameStatus,
      setAppState,
      passGameResult,
      editGame,
      loaderState,
      clearGame,
      playClock,
      stopClock,
      playQuestComplete,
      playQuestFail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
