import React from "react";
import {
  View,
  StatusBar,
  Text,
  AsyncStorage,
  Keyboard,
  Platform
} from "react-native";
import FastImage from "react-native-fast-image";
import { Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { AccessToken } from "react-native-fbsdk";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import NoInternet from "../../containers/no-internet/no-internet";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setGameStatus } from "../../../reducers/game-status";
import { setBalance } from "../../../reducers/user-balance";
import { getConnection } from "../../../reducers/net-info";
import { setTabState } from "../../../reducers/tabs";
import { setSounds } from "../../../reducers/sounds";
import { loaderState } from "../../../reducers/loader";
import { setGeoVirgin } from "../../../reducers/geo-virgin";
import { getPush } from "../../../reducers/push";
import { setFacebookToken } from "../../../reducers/facebook-token";
import { setProfileVirgin } from "../../../reducers/profile-virgin";
import { updateRootStatus } from "../../../reducers/root-status";
import { loadNTPDate } from "../../../reducers/date-abuse-status";
import {
  locationStateListener,
  locationState
} from "../../../reducers/geolocation-status";
import {
  locationCoordsListener,
  setLocation
} from "../../../reducers/geolocation-coords";
import { setToken } from "../../../reducers/token";
import { setInstaToken } from "../../../reducers/insta-token";
//services
import geo_config from "./geolocation-config";
import NavigationService from "../../../services/route";
import BackgroundGeolocationModule from "../../../services/background-geolocation-picker";
//constants
import { urls } from "../../../constants/urls";
import { sendToTelegramm } from "../../../services/telegramm-notification";
import { httpPost } from "../../../services/http";
import I18n from "@locales/I18n";

class Start extends React.Component {
  state = {
    enable_login: false
  };

  constructor(props) {
    super(props);
    Keyboard.dismiss();
  }
  _getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.locationState(true);
        this.props.setLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        });
      },
      error => {
        this.props.locationState(false);
      }
    );
  };
  componentDidMount = () => {
    this.props.setTabState(0);
    this.props.setSounds();
    this.props.getConnection();
    this.props.locationStateListener();
    this.props.locationCoordsListener();
    this._initialConfig();
    this.props.updateRootStatus();
    this.props.loadNTPDate();
  };

  _initialConfig = () => {
    AsyncStorage.multiGet(
      [
        "insta_token",
        "token",
        "balance",
        "facebook_token",
        "geo_virgin",
        "profile_virgin",
        "game_status"
      ],
      (err, stores) => {
        stores.map((result, i, store) => {
          this.props.loaderState(false);
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          switch (key) {
            case "insta_token": {
              value && this.props.setInstaToken(value);
              break;
            }
            case "facebook_token": {
              value && this.props.setFacebookToken(value);
              value &&
                Platform.OS === "ios" &&
                AccessToken.setCurrentAccessToken({ accessToken: value });
              break;
            }
            case "token": {
              if (value) {
                this.props.setToken(value);
                this._getLocation();
                NavigationService.navigate("Main");
                if (Platform.OS === "ios") {
                  BackgroundGeolocationModule.ready(geo_config(), state => {
                    if (!state.enabled) {
                      BackgroundGeolocationModule.start(function() {});
                    }
                  });
                } else {
                  BackgroundGeolocationModule.configure(geo_config());
                  BackgroundGeolocationModule.checkStatus(status => {
                    if (!status.isRunning) {
                      BackgroundGeolocationModule.start();
                    }
                  });
                }
              } else {
                this.setState({ enable_login: true });
              }
              break;
            }
            case "balance": {
              value && this.props.setBalance(Number(value));
              break;
            }
            case "geo_virgin": {
              value && this.props.setGeoVirgin(value);
              break;
            }
            case "profile_virgin": {
              value && this.props.setProfileVirgin(value);
              break;
            }
            case "game_status": {
              value && this.props.setGameStatus(value);
              break;
            }
          }
        });
      }
    );
  };
  goToSignIn = () => {
    this.props.loaderState(true);
    NavigationService.navigate("SignIn");
  };
  goToSignUp = () => {
    this.props.loaderState(true);
    NavigationService.navigate("SignUp");
  };
  render() {
    return (
      <View style={styles.main_view}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <LinearGradient
          colors={[
            "rgba(89,91,241,1)",
            "rgba(232,67,232, 0.1)",
            "rgba(255,187,71,0)"
          ]}
          start={{ x: 1.0, y: 0.1 }}
          end={{ x: 0.0, y: 1.5 }}
          style={styles.grad}
        />
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.top_image}
          source={require("../../../assets/img/ANIMATED_EARN_MORE.gif")}
        />
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.top_image}
          source={require("../../../assets/img/START_GRADIENT_med.png")}
        />
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.top_logo_image}
          source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
        />
        <Text style={styles.start_title}>{I18n.t("START_TITLE")}</Text>
        {this.state.enable_login && (
          <View style={styles.signup_signin_buttons}>
            <CustomButton
              style={styles.signup_button}
              active
              title={I18n.t("SIGN_UP_TITLE").toUpperCase()}
              color={"#F55890"}
              handler={() => this.goToSignUp()}
            />
            <Button
              rounded
              block
              transparent
              style={styles.go_to_signin}
              onPress={() => this.goToSignIn()}
            >
              <Text style={styles.go_to_signin_text}>
                {I18n.t("GO_TO_SIGNIN")}
              </Text>
            </Button>
          </View>
        )}
        {this.props.loader && <ActivityIndicator />}
        {!this.props.isConnected && <NoInternet />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  isConnected: state.isConnected,
  loader: state.loader,
  token: state.token,
  isLocation: state.isLocation
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getConnection,
      locationState,
      setLocation,
      setTabState,
      locationStateListener,
      locationCoordsListener,
      setToken,
      setInstaToken,
      setFacebookToken,
      setGeoVirgin,
      setBalance,
      loaderState,
      getPush,
      setProfileVirgin,
      setSounds,
      updateRootStatus,
      loadNTPDate,
      setGameStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
