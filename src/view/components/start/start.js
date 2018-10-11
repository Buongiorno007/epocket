import React from "react";
import {
  View,
  StatusBar,
  Text,
  AsyncStorage,
  Image,
  Keyboard,
  Platform
} from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import NoInternet from "../../containers/no-internet/no-internet";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setBalance } from "../../../reducers/user-balance";
import { getConnection } from "../../../reducers/net-info";
import { setTabState } from "../../../reducers/tabs";
import { loaderState } from "../../../reducers/loader";
import { getPush } from "../../../reducers/push";
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
import BackgroundGeolocationModule from "../../../services/background-geolocation-picker"
//constants
import { urls } from "../../../constants/urls";
import { sendToTelegramm } from "../../../services/telegramm-notification";
import { httpPost } from "../../../services/http";

class Start extends React.Component {
  state = {
    enable_login: false
  };

  constructor(props) {
    super(props);
    Keyboard.dismiss();
  }

  componentDidMount = () => {
    this.props.setTabState(2);
    this.props.getConnection();
    this._getLocation();
    this.props.locationStateListener();
    this.props.locationCoordsListener();
    if (Platform.OS === "ios") {
      BackgroundGeolocationModule.ready(geo_config(), state => {
        if (!state.enabled) {
          BackgroundGeolocationModule.start(function () { });
        }
      });
    } else {
      BackgroundGeolocationModule.configure(geo_config())
      BackgroundGeolocationModule.checkStatus(status => {
        if (!status.isRunning) {
          BackgroundGeolocationModule.start();
        }
      });
    }
    this._initialConfig();
  };

  _initialConfig = () => {
    AsyncStorage.multiGet(["insta_token", "token", "balance"], (err, stores) => {
      stores.map((result, i, store) => {
        this.props.loaderState(false);
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
        switch (key) {
          case 'insta_token': {
            value && this.props.setInstaToken(value);
            break;
          }
          case 'token': {
            if (value) {
              this.props.setToken(value);
              NavigationService.navigate("Main");
            } else {
              this.setState({ enable_login: true });
            }
            break;
          }
          case 'balance': {
            value && this.props.setBalance(value);
            break;
          }
        }
      });
    });
  };

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
      },
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

        <View style={styles.main_view}>
          <FastImage
            style={styles.bottom_image}
            source={{ uri: ICONS.COMMON.START_BACKGROUND }}
          />
          <LinearGradient
            colors={["#595BF1", "#E843E8", "rgba(255,187,71,0.64)"]}
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            style={styles.grad}
          />
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.top_image}
            // source={{ uri: ICONS.COMMON.START_TOP_BACKGROUND }}
            source={require('../../../assets/img/START_TOP_BACKGROUND.png')}
          />
          <Text style={styles.start_title}>{RU.START_TITLE}</Text>
          {this.state.enable_login && (
            <View style={styles.signup_signin_buttons}>
              <CustomButton
                style={styles.signup_button}
                active
                title={RU.SIGN_UP_TITLE}
                handler={() => this.goToSignUp()}
              />
              <Button
                rounded
                block
                transparent
                style={styles.go_to_signin}
                onPress={() => this.goToSignIn()}
              >
                <Text style={styles.go_to_signin_text}>{RU.GO_TO_SIGNIN}</Text>
              </Button>
            </View>
          )}
        </View>
        {this.props.loader && <ActivityIndicator />}
        {!this.props.isConnected && <NoInternet />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.isConnected,
  loader: state.loader,
  token: state.token,
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
      setBalance,
      loaderState,
      getPush
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
