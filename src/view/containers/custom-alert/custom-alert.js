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
    viewRef: null
  };
  modalLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundModal) });
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
          <View style={styles.content_inner}>
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
            <View style={styles.modal_title}>
              <Text style={styles.modal_title_text}>{this.props.title}</Text>
            </View>
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
                    <Text style={styles.alert_text}>
                      {this.props.first_btn_title}
                    </Text>
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
