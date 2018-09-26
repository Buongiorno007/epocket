import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import CustomAlert from "../custom-alert/custom-alert";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
//redux
import { setActiveCard } from "../../../reducers/set-active-card";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//services
import NavigationService from "../../../services/route";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


class OpenedCard extends React.Component {
  state = {
    errorVisible: true
  };
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  executeTask = () => {
    NavigationService.navigate("Scanner");
  };
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <GestureRecognizer
        onSwipeDown={() => {this.props.setActiveCard(false)}}
        config={config}
        style={[styles.container]}
      >
        <View style={styles.image_container}>
          <LinearGradient
            colors={['transparent', this.props.selectedMission.color]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            style={styles.grad}
          />
          <Image
            style={[
              styles.bottom_image,

            ]}
            source={{ uri: "data:image/jpeg;base64," +this.props.selectedMission.photo }}
          />
          <View style={styles.image_content}>
            {/* <View style={styles.amount}>
              <Text style={styles.regular_font}>
                {this.props.selectedMission.price} {RU.EPC}
              </Text>
            </View>
            <View style={styles.logo_conainer}>1
              <Text style={styles.logo}>
                {this.props.selectedMission.trade}
              </Text>
              <Text style={styles.time}>
                {this.props.selectedMission.date_start.substring(10, 16)} -{" "}
                {this.props.selectedMission.date_end.substring(10, 16)}
              </Text>
            </View> */}
            <Button
              transparent
              block
              rounded
              style={styles.close_container}
              onPress={() => {
                this.props.setActiveCard(false);
              }}
            >
              <Image
                style={styles.close}
                source={{ uri: ICONS.COMMON.CLOSE_WHITE }}
              />
            </Button>
          </View>
        </View>
        <View
          style={[
            styles.task_container,
            { backgroundColor: this.props.selectedMission.color }
          ]}
        >
          {this.props.selectedMission.subMissions.length > 0 ? (
            <View>
              <ScrollView contentContainerStyle={styles.task_content}>
                {this.props.selectedMission.subMissions.map(
                  (element, index) => {
                    return (
                      <View key={index} style={styles.task_line}>
                        {index + 1 !== 3 && <Text style={styles.task_text}>{index + 1.} </Text>}
                        <Text style={styles.task_text}>{element.desc}</Text>
                      </View>
                    );
                  }
                )}
              </ScrollView>
              <View style={styles.my_button}>
                <CustomButton
                  handler={() => {
                    this.executeTask();
                  }}
                  active
                  title={RU.EXECUTE}
                  color={this.props.selectedMission.color}
                />
              </View>
            </View>
          ) : (
              <CustomAlert
                title={RU.MISSION.NO_SUBMISSIOMS}
                first_btn_title={RU.OK}
                visible={this.state.errorVisible}
                first_btn_handler={() => {
                  this.setModalVisible(!this.state.errorVisible);
                  this.props.setActiveCard(false);
                }}
                decline_btn_handler={() => {
                  this.setModalVisible(!this.state.errorVisible);
                  this.props.setActiveCard(false);
                }}
              />
            )}
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => ({
  selectedMission: state.selectedMission
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setActiveCard
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenedCard);
