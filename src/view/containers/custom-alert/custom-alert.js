import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  findNodeHandle
} from "react-native";
import { LinearTextGradient } from "react-native-text-gradient";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { colors } from "../../../constants/colors";
import Blur from "../blur/blur";
//containers
import { WheelPicker } from 'react-native-wheel-picker-android'

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
    wheelPickerDataDays:[],
    wheelPickerDataYears:[],
    wheelPickerDataMonths:['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    pickedDay:'',
    pickedMonth:'',
    pickedYear:''
  };
  componentDidMount(){
    let wheelPickerDataDays=[];
    let wheelPickerDataYears=[];
    for(let i=0; i<=31; i++){
      wheelPickerDataDays.push(''+i)
    }
    for(let i=1905; i<=(new Date()).getFullYear(); i++){
      wheelPickerDataYears.push(''+i)
    }
    this.setState({wheelPickerDataDays, wheelPickerDataYears})
  }
  modalLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundModal) });
  }
  onDaySelected(pickedDay) {
    this.setState({pickedDay})
  }
  onMonthSelected(pickedMonth) {
    this.setState({pickedMonth})
  }
  onYearSelected(pickedYear) {
    this.setState({pickedYear})
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
                <Image
                  style={styles.cross}
                  source={{ uri: ICONS.COMMON.CLOSE }}
                />
              </Button>
            </View>
            {this.props.datepicker ?
              <View style={styles.date_modal}>
                <WheelPicker
                  isCurved
                  isCyclic
                  selectedItemTextColor="#F63272"
                  indicatorColor="#F63272"
                  renderIndicator
                  selectedItemPosition={2}
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
                  selectedItemPosition={2}
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
                  selectedItemPosition={2}
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
                    onPress={() => this.props.first_btn_handler()}
                  >
                    {this.props.datepicker ?
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
export default CustomAlert;
