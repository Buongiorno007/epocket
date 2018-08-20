import React from "react";
import {
  View,
  Text,
  Image,
  DeviceEventEmitter,
  BackHandler,
  Platform
} from "react-native";
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
import { locationState } from "../../../reducers/geolocation-status";
import { setLocation } from "../../../reducers/geolocation-coords";
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
      <View style={styles.main_view}>
        {!this.props.timer_status ?
          <View style={styles.circle_container}>
            <View style={styles.outer_circle} />
            <View style={styles.inner_circle} />
            <Image
              style={styles.location_icon}
              source={{ uri: ICONS.COMMON.GEOLOCATION_DISABLED }}
            />
            <Text style={styles.location_disable_text}>
              {RU.LOCATION_DISABLED}
            </Text>
          </View>:null}
        <View style={styles.enable_location}>
          <Button
            transparent
            style={styles.enable_location}
            onPress={() => {
              this._requestLocation();
            }}
          >
            <LinearGradient
              colors={["#FF9950", "#F55890"]}
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
  timer_status : state.timer_status
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      locationState,
      setLocation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDisabled);