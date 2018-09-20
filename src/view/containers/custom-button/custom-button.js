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
          this.props.short && { width: width * 0.5 },
          this.props.extra_short && { width: width * 0.3 },
        ]}
        onPress={() => {
          this.props.active && this.props.handler();
        }}
      >
        {this.props.gradient && (
          <LinearGradient
            colors={[colors.light_orange, colors.pink]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 0.5, y: 0.2 }}
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
                this.props.short ? this.props.extra_short?{ width: width * 0.3 - 2 }: { width: width * 0.5 - 2 } : { width: width * 0.85 - 2 },
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
