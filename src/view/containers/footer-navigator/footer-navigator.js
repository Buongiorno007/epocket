import React from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image'
import { Label, Button } from "native-base";
//constants
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import styles from "./styles";
//redux
import { setTabState } from "../../../reducers/tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showDashboard } from "../../../reducers/show-dashboard";
import { getGameInfo } from "../../../reducers/game-info";

class FooterNavigation extends React.Component {
  render() {
    return (
      <View style={styles.footer_container}>
        <View style={[styles.footer_tab]}>
          <Button
            transparent
            style={[styles.footer_tab]}
            onPress={() => this.props.setTabState(0)}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={
                this.props.activeTab == 0
                  ? styles.footer_tab_icon_active
                  : styles.footer_tab_icon
              }
              source={
                this.props.activeTab === 0
                  ? { uri: ICONS.FOOTER_TABS.PROFILE_ACTIVE }
                  : { uri: ICONS.FOOTER_TABS.PROFILE }
              }
            />
            {this.props.activeTab === 0 ? (
              <Label style={styles.footer_tab_text}> {RU.PROFILE} </Label>
            ) : null}
          </Button>
        </View>
        <View style={[styles.footer_tab, styles.footer_tab_offset]}>
          <Button
            transparent
            style={[styles.footer_tab, styles.footer_tab_offset]}
            onPress={() => this.props.setTabState(1)}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={[
                this.props.activeTab === 1
                  ? styles.footer_tab_icon_active
                  : styles.footer_tab_icon,
                styles.footer_tab_icon_offset_left
              ]}
              source={
                this.props.activeTab === 1
                  ? { uri: ICONS.FOOTER_TABS.CASHOUT_ACTIVE }
                  : { uri: ICONS.FOOTER_TABS.CASHOUT }
              }
            />
            {this.props.activeTab === 1 ? (
              <Label
                style={[
                  styles.footer_tab_text,
                  styles.footer_tab_icon_offset_left,
                  { fontSize: 10 }
                ]}
              >
                {" "}
                {RU.CASHOUT}{" "}
              </Label>
            ) : null}
          </Button>
        </View>
        <View style={[styles.footer_tab, styles.footer_tab_central]} />
        <View style={[styles.circle]}>
          <Button
            transparent
            style={[styles.circle_button]}
            onPress={() => this.props.setTabState(2)}
          >
            {this.props.activeTab !== 2 && (
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.footer_small_logo}
                source={{ uri: ICONS.COMMON.CASH_EPC_GRAY }}
              />
            )}
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={
                this.props.activeTab === 2
                  ? styles.footer_tab_icon_active
                  : styles.footer_tab_icon
              }
              source={
                this.props.activeTab === 2
                  ? { uri: ICONS.FOOTER_TABS.SHOP_ACTIVE }
                  : { uri: ICONS.FOOTER_TABS.SHOP }
              }
            />
            {this.props.activeTab === 2 ? (
              <Label
                style={[
                  styles.footer_tab_text,
                  styles.footer_tab_text_margin_bottom
                ]}
              >
                {" "}
                {RU.SHOP}{" "}
              </Label>
            ) : null}
          </Button>
        </View>
        <View style={[styles.footer_tab, styles.footer_tab_offset]}>
          <Button
            transparent
            style={[styles.footer_tab, styles.footer_tab_offset]}
            onPress={() => this.props.setTabState(3)}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={[
                this.props.activeTab === 3
                  ? styles.footer_tab_icon_active
                  : styles.footer_tab_icon,
                styles.footer_tab_icon_offset_right
              ]}
              source={
                this.props.activeTab === 3
                  ? { uri: ICONS.FOOTER_TABS.HISTORY_ACTIVE }
                  : { uri: ICONS.FOOTER_TABS.HISTORY }
              }
            />
            {this.props.activeTab === 3 ? (
              <Label
                style={[
                  styles.footer_tab_text,
                  styles.footer_tab_icon_offset_right
                ]}
              >
                {" "}
                {RU.HISTORY}{" "}
              </Label>
            ) : null}
          </Button>
        </View>
        <View style={[styles.footer_tab]}>
          <Button
            transparent
            style={[styles.footer_tab]}
            // onPress={() =>  (this.props.dashboard) ? this.props.showDashboard(false) : this.props.showDashboard(true) }
            onPress={() => { this.props.getGameInfo(), this.props.setTabState(4) }}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={
                this.props.activeTab === 4
                  ? styles.footer_tab_icon_active
                  : styles.footer_tab_icon
              }
              source={
                this.props.activeTab === 4
                  ? { uri: ICONS.FOOTER_TABS.GAME_ACTIVE }
                  : { uri: ICONS.FOOTER_TABS.GAME }
              }
            />
            {this.props.activeTab === 4 ? (
              <Label style={styles.footer_tab_text}> {RU.GAME.GAME_TITLE} </Label>
            ) : null}
          </Button>
        </View>
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
    activeTab: state.activeTab,
    activeTab: state.activeTab,
    dashboard: state.dashboard
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTabState,
      showDashboard,
      getGameInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterNavigation);
