import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  findNodeHandle,
  Picker
} from "react-native";
import FastImage from 'react-native-fast-image'
import { LinearTextGradient } from "react-native-text-gradient";
import { Button } from "native-base";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setBirthDay } from "../../../reducers/birthday";
//containers
import { WheelPicker } from 'react-native-wheel-picker-android'
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { colors } from "../../../constants/colors";
import Blur from "../blur/blur";
const today = new Date();
const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
{
  /* 
call example
title - main message
first_btn_title - title on left button
second_btn_title - title on right button (if doesnt exist, modal will be with 1 big button)
first_btn_handler - function onPress left button
second_btn_handler - function onPress right button
visible - visibility of the modal (default true)

<CustomAlert
            title={"Sample"}
            first_btn_title={"OK"}
            second_btn_title={"DECLINE"}
            visible={this.state.modalVisible}
            first_btn_handler={() => NavigationService.navigate("Main")}
            second_btn_handler={() =>
              this.setModalVisible(!this.state.exitVisible)
            }
            decline_btn_handler={() =>
              this.setModalVisible(!this.state.exitVisible)
            }
          />

*/
}
class CustomAlert extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    viewRef: null,
    initialDay: today.getUTCDate(),
    initialYear: today.getFullYear(),
    initialMonths: today.getMonth(),
    wheelPickerDataDays: [],
    wheelPickerDataYears: [],
    wheelPickerDataMonths: months,
    pickedDay: Platform.OS === "ios" ? { data: today.getUTCDate() + "" } : { data: today.getUTCDate() },
    pickedMonth: { position: today.getMonth() },
    pickedYear: Platform.OS === "ios" ? { data: today.getFullYear() + "" } : { data: today.getFullYear() }
  };
  componentDidMount() {
    let wheelPickerDataDays = [];
    let wheelPickerDataYears = [];
    for (let i = 1; i <= 31; i++) {
      Platform.OS === "ios" ? wheelPickerDataDays.push('' + i) : wheelPickerDataDays.push(i)
    }
    for (let i = 1905; i <= today.getFullYear(); i++) {
      Platform.OS === "ios" ? wheelPickerDataYears.push('' + i) : wheelPickerDataYears.push(i)
    }
    this.setState({ wheelPickerDataDays, wheelPickerDataYears })
  }
  modalLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundModal) });
  }
  onDaySelected(pickedDay) {
    this.setState({ pickedDay })
  }
  onMonthSelected(pickedMonth) {
    this.setState({ pickedMonth })
  }
  onYearSelected(pickedYear) {
    this.setState({ pickedYear })
    console.log(this.state.pickedDay, this.state.pickedMonth, this.state.pickedYear)
  }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => { }}
      >
        <Blur />
        <View style={styles.content}>
          <View style={this.props.datepicker ? styles.big_content_inner : styles.content_inner}>
            <View style={styles.cross_view}>
              <Button
                transparent
                style={styles.cross_button}
                onPress={() => this.props.decline_btn_handler()}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.cross}
                  source={{ uri: ICONS.COMMON.CLOSE }}
                />
              </Button>
            </View>
            {this.props.datepicker ?
              Platform.OS === "ios" ?
                <View style={styles.date_modal}>
                  <Picker
                    style={[styles.wheelPickerIOS]}
                    selectedValue={this.state.pickedDay.data}
                    onValueChange={itemValue => this.setState({ pickedDay: { data: itemValue } })}
                  >
                    {this.state.wheelPickerDataDays.map((i, index) => (
                      <Picker.Item style={[styles.wheelPickerIOS_item]} key={index} label={i} value={i} />
                    ))}
                  </Picker>
                  <Picker
                    style={[styles.wheelPickerIOS, styles.wheelPickerIOS_month]}
                    selectedValue={this.state.pickedMonth.position}
                    onValueChange={itemValue => this.setState({ pickedMonth: { position: itemValue } })}>
                    {this.state.wheelPickerDataMonths.map((i, index) => (
                      <Picker.Item style={[styles.wheelPickerIOS_item]} key={index} label={i} value={index} />
                    ))}
                  </Picker>
                  <Picker
                    style={[styles.wheelPickerIOS]}
                    selectedValue={this.state.pickedYear.data}
                    onValueChange={itemValue => this.setState({ pickedYear: { data: itemValue } })}>
                    {this.state.wheelPickerDataYears.map((i, index) => (
                      <Picker.Item style={[styles.wheelPickerIOS_item]} key={index} label={i} value={i} />
                    ))}
                  </Picker>
                </View>
                :
                <View style={styles.date_modal}>
                  <WheelPicker
                    isCurved
                    isCyclic
                    selectedItemTextColor="#F63272"
                    indicatorColor="#F63272"
                    renderIndicator
                    selectedItemPosition={this.state.wheelPickerDataDays.indexOf(this.state.initialDay)}
                    itemSpace={30}
                    itemTextSize={31}
                    visibleItemCount={3}
                    data={this.state.wheelPickerDataDays}
                    style={[styles.wheelPicker, styles.wheelPickerDay]}
                    onItemSelected={(day) => this.onDaySelected(day)} />
                  <WheelPicker
                    isCurved
                    isCyclic
                    selectedItemTextColor="#F63272"
                    indicatorColor="#F63272"
                    renderIndicator
                    selectedItemPosition={this.state.initialMonths}
                    itemSpace={30}
                    itemTextSize={31}
                    visibleItemCount={3}
                    data={this.state.wheelPickerDataMonths}
                    style={[styles.wheelPicker, styles.wheelPickerMonths]}
                    onItemSelected={(month) => this.onMonthSelected(month)} />
                  <WheelPicker
                    isCurved
                    selectedItemTextColor="#F63272"
                    indicatorColor="#F63272"
                    renderIndicator
                    selectedItemPosition={this.state.wheelPickerDataYears.indexOf(this.state.initialYear)}
                    itemSpace={30}
                    itemTextSize={31}
                    visibleItemCount={3}
                    data={this.state.wheelPickerDataYears}
                    style={[styles.wheelPicker, styles.wheelPickerYear]}
                    onItemSelected={(year) => this.onYearSelected(year)} />
                </View>
              :
              <View style={styles.modal_title}>
                <Text style={styles.modal_title_text}>{this.props.title}</Text>
                {this.props.subtitle &&
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.light_orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={styles.modal_title_text}
                  >
                    {this.props.subtitle}
                  </LinearTextGradient>
                }
              </View>
            }
            {this.props.second_btn_title ? (
              <View style={styles.modal_buttons}>
                <Button
                  transparent
                  style={styles.fisrt_small_btn}
                  onPress={() => this.props.first_btn_handler()}
                >
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[colors.light_orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={styles.alert_text}
                  >
                    {this.props.first_btn_title}
                  </LinearTextGradient>
                </Button>
                <Button
                  transparent
                  style={styles.second_small_btn}
                  onPress={() => this.props.second_btn_handler()}
                >
                  <Text style={styles.alert_text}>
                    {this.props.second_btn_title}
                  </Text>
                </Button>
              </View>
            ) : (
                <View style={styles.modal_buttons}>
                  <Button
                    transparent
                    style={styles.big_centered_button}
                    onPress={() => { this.props.datepicker ? (this.props.setBirthDay({ day: this.state.pickedDay.data, month: this.state.pickedMonth.position + 1, year: this.state.pickedYear.data }), this.props.first_btn_handler()) : this.props.first_btn_handler() }}
                  >
                    {this.props.datepicker || this.props.subtitle ?
                      <LinearTextGradient
                        locations={[0, 1]}
                        colors={[colors.light_orange, colors.pink]}
                        start={{ x: 0.0, y: 1.0 }}
                        end={{ x: 1.0, y: 1.0 }}
                        style={styles.alert_text}
                      >
                        {this.props.first_btn_title}
                      </LinearTextGradient> :
                      <Text style={styles.alert_text}>
                        {this.props.first_btn_title}
                      </Text>
                    }
                  </Button>
                </View>
              )}
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setBirthDay
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAlert);