import React from "react";
import { AsyncStorage, Text, Dimensions, Platform } from "react-native";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "@locales/I18n";

const { width, height } = Dimensions.get("window");

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    currency: ""
  };
  componentDidMount() {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency });
    });
  }
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };
  render() {
    return (
      <Button
        style={
          this.props.item.active
            ? [
                styles.card,
                this.props.missions.length - this.props.socialCount != 1 &&
                  this.props.socialCount === 1 && { top: -(width * 0.2 - 20) }, //rows in flatlist have to be similar height, so this string is here to avoid this issue
                Platform.OS === "android" && {
                  borderTopWidth: 1,
                  borderTopColor: "rgba(217, 221, 224, 0.5)"
                }
              ]
            : [
                styles.card,
                this.props.missions.length - this.props.socialCount != 1 &&
                  this.props.socialCount === 1 && { top: -(width * 0.2 - 20) }, //rows in flatlist have to be similar height, so this string is here to avoid this issue
                {
                  borderWidth: 1,
                  borderColor: this.props.item.color
                    ? this.props.item.color
                    : this.props.userColor.black,
                  backgroundColor: "transparent",
                  elevation: 0,
                  shadowColor: this.props.userColor.card_shadow,
                  shadowOffset: {
                    width: 0,
                    height: 0
                  },
                  shadowRadius: 0
                }
              ]
        }
        onPress={
          // this.props.item.active
          //   ? this._onPress
          //   : null
          this._onPress
        }
      >
        <Text
          style={[
            this.props.item.active
              ? styles.price
              : [
                  styles.price,
                  {
                    color: this.props.item.color
                      ? this.props.item.color
                      : this.props.userColor.black
                  }
                ]
          ]}
        >
          {this.props.item.formated.amount}{" "}
          {I18n.t("EPC", { currency: this.state.currency })}
        </Text>
        <Text
          style={[
            styles.owner,
            {
              color: this.props.item.color
                ? this.props.item.color
                : this.props.userColor.black
            }
          ]}
        >
          {this.props.item.trade}
        </Text>
        <Text
          style={[
            this.props.item.active
              ? styles.time_range
              : [
                  styles.failed_time_range,
                  {
                    color: this.props.item.color
                      ? this.props.item.color
                      : this.props.userColor.black
                  }
                ]
          ]}
        >
          {this.props.item.date_start.substring(10, 16)} -{" "}
          {this.props.item.date_end.substring(10, 16)}
        </Text>
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  timer: state.timer,
  timer_status: state.timer_status,
  socialCount: state.socialCount,
  missions: state.missions
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
