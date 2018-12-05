import React from "react";
import { View, Text, Platform, ImageBackground } from "react-native";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//containers
import CustomButton from "../custom-button/custom-button";

class CardDiscount extends React.Component {
  constructor(props) {
    super(props);
  }
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };
  render() {
    return (
      <View
        style={
          [styles.card, Platform.OS === 'android' && {
            borderTopWidth: 1,
            borderTopColor: 'rgba(217, 221, 224, 0.5)',
          }]
        }
      >
        <ImageBackground
          source={{ uri: this.props.item.photo }}
          imageStyle={styles.card_image}
          style={[styles.card_background]}
        >
          <View style={styles.dark_cont}>
            <View style={styles.top_text}>
              <Text style={[styles.price]}>
                {this.props.item.adress}
              </Text>
              <Text style={[styles.owner]}>
                {this.props.item.name}
              </Text>
            </View>
            {this.props.timer_status &&
              <View style={styles.timer}>
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
            }
            <CustomButton
              mapCard
              style={styles.bottom_btn}
              active
              gradient
              short
              extra_short
              semi_short
              color={this.props.userColor.white}
              title={this.props.btnText}
              handler={() => { this._onPress() }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  timer: state.timer,
  timer_status: state.timer_status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDiscount);