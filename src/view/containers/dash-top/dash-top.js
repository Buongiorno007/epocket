import React from "react";
import { View, Text, Image } from "react-native";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { colors } from "./../../../constants/colors";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDashboardState } from "../../../reducers/dashboard-state";

import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";
import { Button } from "native-base";

class DashTop extends React.Component {
  render() {
    return (
      !this.props.activeCard ?
        <View style={styles.content}>
          <View style={styles.location}>
            <View style={styles.location_left}>
              <Image
                style={styles.icon}
                source={{ uri: ICONS.COMMON.GEOLOCATION_WHITE }}
              />
              <View>
                <Text style={styles.up_text}>{RU.YOU_ARE_HERE}</Text>
                <Text 
                  numberOfLines={1}
                  style={styles.down_text}>
                  {this.props.selectedMall.name}
                </Text>
              </View>
            </View>
            <View style={styles.middle_border} />
            <View style={styles.location_right}>
              <Image
                style={styles.icon}
                source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
              />
              <View>
                <Text style={styles.up_text}>{RU.YOUR_BONUS}</Text>
                <Text style={styles.down_text}>{this.props.balance} {RU.EPC}</Text>
              </View>
            </View>
          </View>

          <View style={this.props.dashboardState === 1 ? null : styles.disabled} >
            <View style={this.props.timer_status ? null : styles.disabled}>
              <View style={styles.epc_counter_container}>
                <Text style={styles.epc_counter}>
                  {this.props.mainMissionPrice}
                </Text>
                <View style={styles.epc_counter_info}>
                  <Text style={styles.epc}>{RU.EPC}</Text>
                  <Text style={styles.epc_info}>{RU.FOR_BEING_IN_MALL}</Text>
                  <Text style={styles.epc_info}>{RU.TIME_STARTED}</Text>
                </View>
              </View>
              <View style={styles.time_counter_container}>
                <View style={styles.time_counter}>
                  <Text style={styles.time_counter_text}>
                    {this.props.timer.hours < 10 && "0"}
                    {this.props.timer.hours}
                  </Text>
                </View>
                <View>
                  <Text style={styles.time_divider}>:</Text>
                </View>
                <View style={styles.time_counter}>
                  <Text style={styles.time_counter_text}>
                    {this.props.timer.minutes < 10 && "0"}
                    {this.props.timer.minutes}
                  </Text>
                </View>
                <View>
                  <Text style={styles.time_divider}>:</Text>
                </View>
                <View style={styles.time_counter}>
                  <Text style={styles.time_counter_text}>
                    {this.props.timer.seconds < 10 && "0"}
                    {this.props.timer.seconds}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={
                this.props.timer_status
                  ? styles.disabled
                  : styles.main_task_expired_container
              }
            >
              {/* <Text style={styles.main_task_expired}>
                {RU.MAIN_TASK_EXPIRED}
              </Text> */}
            </View>
          </View>
          <Button
            transparent
            style={
              this.props.dashboardState === 2
                ? styles.small_head
                : styles.disabled
            }
            onPress={() => {
              this.props.setDashboardState(1);
            }}
          >
            <View
              style={
                this.props.timer_status ? styles.small_head : styles.disabled
              }
            >
              <View style={styles.small_epc_counter_container}>
                <Text style={styles.small_epc_counter}>
                  {this.props.mainMissionPrice}
                </Text>
                <Text style={styles.time_counter_text}>{RU.EPC}</Text>
              </View>
              <View style={styles.small_time_counter_container}>
                <View style={styles.small_time_counter}>
                  <Text style={styles.time_counter_text}>
                    {this.props.timer.hours < 10 && "0"}
                    {this.props.timer.hours}
                  </Text>
                </View>
                <View>
                  <Text style={styles.time_divider}>:</Text>
                </View>
                <View style={styles.small_time_counter}>
                  <Text style={styles.time_counter_text}>
                    {this.props.timer.minutes < 10 && "0"}
                    {this.props.timer.minutes}
                  </Text>
                </View>
                <View>
                  <Text style={styles.time_divider}>:</Text>
                </View>
                <View style={styles.small_time_counter}>
                  <Text style={styles.time_counter_text}>
                    {this.props.timer.seconds < 10 && "0"}
                    {this.props.timer.seconds}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={
                this.props.timer_status
                  ? styles.disabled
                  : styles.main_task_expired_container
              }
            >
            </View>
          </Button>
        </View>
        :
        <View style={styles.content}>
          <LinearGradient
            colors={[colors.orange_02, colors.pink_02]}
            start={{ x: 0.0, y: 5.0 }}
            end={{ x: 1.0, y: 5.0 }}
            style={styles.location}
          >
            <View style={styles.location_left}>
              <Image
                style={styles.icon}
                source={{ uri: ICONS.COMMON.LOCATION_PINK }}
              />
              <View>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 0.5, y: 0.2 }} 
                  style={styles.up_text}
                >
                  {RU.YOU_ARE_HERE}
                </LinearTextGradient>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 0.5, y: 0.2 }} 
                  style={styles.down_text}
                  numberOfLines={1}
                >
                
                  {this.props.selectedMall.name}
                </LinearTextGradient>
              </View>
            </View>
            <View style={[styles.middle_border, { borderColor: colors.pink_02 }]} />
            <View style={styles.location_right}>
              <Image
                style={styles.icon}
                source={{ uri: ICONS.COMMON.CASH_EPC_PINK }}
              />
              <View>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 0.5, y: 0.2 }} 
                  style={styles.up_text}
                >
                  {RU.YOUR_BONUS}
                </LinearTextGradient>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 0.5, y: 0.2 }} 
                  style={styles.down_text}
                >
                  {this.props.balance} {RU.EPC}
                </LinearTextGradient>
              </View>
            </View>
          </LinearGradient>

          <View style={this.props.dashboardState === 1 ? null : styles.disabled} >
            <View style={this.props.timer_status ? null : styles.disabled}>
              <View style={styles.epc_counter_container}>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 0.5, y: 0.2 }} 
                  style={styles.epc_counter}>
                  {this.props.mainMissionPrice}
                </LinearTextGradient>
                <View style={styles.epc_counter_info}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.epc}>
                    {RU.EPC}
                  </LinearTextGradient>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.epc_info}>
                    {RU.FOR_BEING_IN_MALL}
                  </LinearTextGradient>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.epc_info}>
                    {RU.TIME_STARTED}
                  </LinearTextGradient>
                </View>
              </View>
              <View style={styles.time_counter_container}>
                <LinearGradient
                  colors={[colors.orange_02, colors.pink_02]}
                  start={{ x: 0.0, y: 5.0 }}
                  end={{ x: 1.0, y: 5.0 }}
                  style={styles.time_counter}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.time_counter_text}>
                    {this.props.timer.hours < 10 && "0"}
                    {this.props.timer.hours}
                  </LinearTextGradient>
                </LinearGradient>
                <View>
                  <Text style={styles.time_divider_pink}>:</Text>
                </View>
                <LinearGradient
                  colors={[colors.orange_02, colors.pink_02]}
                  start={{ x: 0.0, y: 5.0 }}
                  end={{ x: 1.0, y: 5.0 }}
                  style={styles.time_counter}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.time_counter_text}>
                    {this.props.timer.minutes < 10 && "0"}
                    {this.props.timer.minutes}
                  </LinearTextGradient>
                </LinearGradient>
                <View>
                  <Text style={styles.time_divider_pink}>:</Text>
                </View>
                <LinearGradient
                  colors={[colors.orange_02, colors.pink_02]}
                  start={{ x: 0.0, y: 5.0 }}
                  end={{ x: 1.0, y: 5.0 }}
                  style={styles.time_counter}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.time_counter_text}>
                    {this.props.timer.seconds < 10 && "0"}
                    {this.props.timer.seconds}
                  </LinearTextGradient>
                </LinearGradient>
              </View>
            </View>
            <View style={this.props.timer_status ? styles.disabled : styles.main_task_expired_container} >
              {/* <LinearTextGradient
                locations={[0, 1]}
                colors={[colors.orange, colors.pink]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 0.5, y: 0.2 }}
                style={styles.main_task_expired}>
                {RU.MAIN_TASK_EXPIRED}
              </LinearTextGradient> */}
            </View>
          </View>
          <Button
            transparent
            style={this.props.dashboardState === 2 ? styles.small_head : styles.disabled}
            onPress={() => { this.props.setDashboardState(1); }} >
            <View
              style={
                this.props.timer_status ? styles.small_head : styles.disabled
              }
            >
              <View style={styles.small_epc_counter_container}>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 0.5, y: 0.2 }}
                  style={styles.small_epc_counter}>
                  {this.props.mainMissionPrice}
                </LinearTextGradient>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.orange, colors.pink]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 0.5, y: 0.2 }}
                  style={styles.time_counter_text}>
                  {RU.EPC}
                </LinearTextGradient>
              </View>
              <View style={styles.small_time_counter_container}>
                <LinearGradient
                  colors={[colors.orange_02, colors.pink_02]}
                  start={{ x: 0.0, y: 5.0 }}
                  end={{ x: 1.0, y: 5.0 }}
                  style={styles.small_time_counter}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.time_counter_text}>
                    {this.props.timer.hours < 10 && "0"}
                    {this.props.timer.hours}
                  </LinearTextGradient>
                </LinearGradient>
                <View>
                  <Text style={styles.time_divider_pink}>:</Text>
                </View>
                <LinearGradient
                  colors={[colors.orange_02, colors.pink_02]}
                  start={{ x: 0.0, y: 5.0 }}
                  end={{ x: 1.0, y: 5.0 }}
                  style={styles.small_time_counter}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }}
                    style={styles.time_counter_text}>
                    {this.props.timer.minutes < 10 && "0"}
                    {this.props.timer.minutes}
                  </LinearTextGradient>
                </LinearGradient>
                <View>
                  <Text style={styles.time_divider_pink}>:</Text>
                </View>
                <LinearGradient
                  colors={[colors.orange_02, colors.pink_02]}
                  start={{ x: 0.0, y: 5.0 }}
                  end={{ x: 1.0, y: 5.0 }}
                  style={styles.small_time_counter}>
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 0.5, y: 0.2 }} 
                    style={styles.time_counter_text}>
                    {this.props.timer.seconds < 10 && "0"}
                    {this.props.timer.seconds}
                  </LinearTextGradient>
                </LinearGradient>
              </View>
            </View>

            <View
              style={
                this.props.timer_status
                  ? styles.disabled
                  : styles.main_task_expired_container
              }
            >
            </View>
          </Button>
        </View>
    );
  }
}
const mapStateToProps = state => ({
  selectedMall: state.selectedMall,
  balance: state.balance,
  activeCard: state.activeCard,
  timer: state.timer,
  timer_status: state.timer_status,
  dashboardState: state.dashboardState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDashboardState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashTop);
