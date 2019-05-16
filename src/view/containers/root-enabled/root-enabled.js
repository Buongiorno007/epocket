import React from "react";
import { View, Text, Platform, Linking } from "react-native";
import FastImage from "react-native-fast-image";
import { Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import Permissions from "react-native-permissions";
import AndroidOpenSettings from "react-native-android-open-settings";
//constants
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateRootStatus } from "../../../reducers/root-status";
import I18n from "@locales/I18n";

class LocationDisabled extends React.Component {
  openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.canOpenURL("App-prefs:")
        .then(supported => {
          if (!supported) {
            // console.log("Can't handle settings url");
            Permissions.openSettings();
          } else {
            return Linking.openURL("App-prefs:");
          }
        })
        .catch(err => console.error("An error occurred", err));
    } else {
      AndroidOpenSettings.generalSettings();
    }
  };
  render() {
    return (
      <View style={[styles.main_view]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image_background}
          source={require("../../../assets/img/ANIMATED_EARN_MORE.gif")}
        />
        <LinearGradient
          colors={this.props.userColor.earn_more}
          start={{ x: 0.0, y: 1.4 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.grad}
        />
        <View style={styles.circle_container}>
          <Text style={styles.attention}>{I18n.t("ATTENTION")}</Text>
          <Text style={styles.root_text}>
            {I18n.t("DEVELOPER_ENABLED")}{" "}
            {Platform.OS === "ios"
              ? I18n.t("ROOT_ENABLED_IOS")
              : I18n.t("ROOT_ENABLED_ANDROID")}
          </Text>
        </View>
        <View style={[styles.open_settings, styles.btnContainer]}>
          <Button
            transparent
            style={styles.open_settings}
            onPress={() => {
              this.openSettings();
            }}
          >
            <Text
              style={[
                styles.settings_text,
                { color: this.props.userColor.pink_blue }
              ]}
            >
              {I18n.t("DEVICE_SETTINGS").toUpperCase()}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateRootStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDisabled);
