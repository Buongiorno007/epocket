import React from "react";
import { View } from "react-native";
import { Button, Text } from "native-base";
import { Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
//constants
import { colors } from "../../../constants/colors_men";
import styles from "./styles";
const { width } = Dimensions.get("window");
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

{
  /* 
call example
active - default false
short - default false
title - default OK

<CustomButton active short handler={() => navigation.navigate("Start")} title={'Регистрация'} /> 

*/
}

class CustomButton extends React.Component {
  render() {
    return (
      <Button
        transparent
        block
        rounded
        style={[
          styles.button_container,
          this.props.active ? styles.enabled_button : styles.disabled_button,
          this.props.short && { width: width * 0.5 },
          this.props.extra_short && { width: width * 0.3 },
        ]}
        onPress={() => {
          this.props.active && this.props.handler();
        }}
      >
        {this.props.gradient && (
          <LinearGradient
            colors={[this.props.userColor.light_orange, this.props.userColor.pink]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.7, y: 1.0 }}
            style={[
              styles.button_container,
              this.props.short ? this.props.extra_short ? { width: width * 0.3 } : { width: width * 0.5 } : null,
              styles.gradient
            ]}
          />
        )}
        {this.props.bordered && (
          <View
            style={[
              styles.button_container,
              this.props.short && { width: width * 0.5 },
              this.props.extra_short && { width: width * 0.3 },
              styles.border_btn
            ]}
          >
            <View
              style={[
                styles.button_container,
                this.props.short ? this.props.extra_short ? { width: width * 0.3 - 2 } : { width: width * 0.5 - 2 } : { width: width * 0.85 - 2 },
                styles.background_btn
              ]}
            />
          </View>
        )}
        <Text
          style={[
            styles.button_text,
            this.props.color
              ? { color: this.props.color }
              : this.props.active
                ? { color: this.props.userColor.pink }
                : { color: this.props.userColor.white }
          ]}
        >
          {this.props.title ? this.props.title : "OK"}
        </Text>
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomButton);