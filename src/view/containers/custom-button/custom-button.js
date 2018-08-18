import React from "react";
import { View } from "react-native";
import { Button, Text } from "native-base";
import { Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
//constants
import { colors } from "../../../constants/colors";
import styles from "./styles";
const { width } = Dimensions.get("window");

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
          this.props.short ? { width: width * 0.5 } : null
        ]}
        onPress={() => {
          this.props.active && this.props.handler();
        }}
      >
        {this.props.gradient && (
          <LinearGradient
            colors={[colors.light_orange, colors.pink]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={[
              styles.button_container,
              this.props.short ? { width: width * 0.5 } : null,
              styles.gradient
            ]}
          />
        )}
        <Text
          style={[
            styles.button_text,
            this.props.color
              ? { color: this.props.color }
              : this.props.active
                ? { color: colors.pink }
                : { color: colors.white }
          ]}
        >
          {this.props.title ? this.props.title : "OK"}
        </Text>
      </Button>
    );
  }
}

export default CustomButton;
