import React from "react";
import {
  View,
  Text,
  DeviceEventEmitter,
  BackHandler,
  Platform
} from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import Permissions from "react-native-permissions";
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { ICONS } from "../../../constants/icons";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  locationStateListener,
  locationState
} from "../../../reducers/geolocation-status";
import {
  locationCoordsListener,
  setLocation
} from "../../../reducers/geolocation-coords";
//components
import Blur from "../blur/blur";
//services
import geo_config from "./geolocation-config";
import NavigationService from "../../../services/route";
import BackgroundGeolocationModule from "../../../services/background-geolocation-picker"


class LocationDisabled extends React.Component {
  async checkIsLocation() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
      .then(data => {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.props.locationState(true);
            this.props.setLocation({
              lng: position.coords.longitude,
              lat: position.coords.latitude
            });
          },
          error => {
            console.log('position', error)
            this.props.locationState(false);
          },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
        );
      }).catch(err => {
        console.log(err)
      });

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
      },
    );
  };

  connectGeolocation = () => {
    if (Platform.OS === "ios") {
      BackgroundGeolocationModule.ready(geo_config(), state => {
        if (!state.enabled) {
          BackgroundGeolocationModule.start(function () { });
          this._getLocation();
        }
      });
    } else {
      BackgroundGeolocationModule.configure(geo_config())
      BackgroundGeolocationModule.checkStatus(status => {
        if (!status.isRunning) {
          BackgroundGeolocationModule.start();
          this._getLocation();
        }
      });
    }
  }
  _requestLocation = () => {
    switch (Platform.OS) {
      case "android": {
        this.checkIsLocation();
        break;
      }
      case "ios": {
        Permissions.openSettings();
        break;
      }
    }
  };
  render() {
    return (
      this.props.geolocationIsVirgin && this.props.geolocationIsVirgin != "false" ?
        <View style={styles.main_view}>
          <Blur dark />
          <FastImage
            style={styles.bottom_image}
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../../assets/img/GEOLOCATION_ENABLE.gif')}
          />
          <View style={[styles.circle_container, styles.virgin_container,]}>
            <Text style={styles.location_disable_text_white}>
              {RU.LOCATION_VIRGIN.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.enable_location, styles.btnContainer, styles.virgin_btn_container]}>
            <Button
              transparent
              style={styles.enable_location}
              onPress={() => {
                this.connectGeolocation();
              }}
            >
              <LinearGradient
                colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={styles.enable_location}
              />
              <Text style={styles.location_enable_text}>
                {RU.LOCATION_ENABLE}
              </Text>
            </Button>
          </View>
        </View>
        :
        <View style={styles.main_view}>
          <Blur strong />
          <View style={styles.circle_container}>
            <Text style={styles.location_disable_text}>
              {RU.LOCATION_DISABLED}
            </Text>
          </View>
          <View style={[styles.enable_location, styles.btnContainer]}>
            <Button
              transparent
              style={styles.enable_location}
              onPress={() => {
                this.connectGeolocation();
              }}
            >
              <LinearGradient
                colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={styles.enable_location}
              />
              <Text style={styles.location_enable_text}>
                {RU.LOCATION_ENABLE}
              </Text>
            </Button>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  timer_status: state.timer_status,
  geolocationIsVirgin: state.geolocationIsVirgin
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      locationState,
      setLocation,
      locationStateListener,
      locationCoordsListener
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDisabled);