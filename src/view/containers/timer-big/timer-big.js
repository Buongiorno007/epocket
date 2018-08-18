import React from "react";
import { View, Text } from "react-native";
import RadialGradient from "react-native-radial-gradient";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";

class TimerBig extends React.Component {
  render() {
    return (
      <View style={styles.main_view}>
        <View style={styles.outer_circle}>
          <RadialGradient
            style={styles.outer_circle}
            colors={[colors.light_blue, colors.blue]}
          />
        </View>
        <View style={styles.inner_circle}>
          <RadialGradient
            style={styles.inner_circle}
            colors={[colors.light_blue, colors.blue]}
          />
        </View>
        <View style={styles.center_circle}>
          <RadialGradient
            style={styles.center_circle}
            colors={[colors.light_blue, colors.blue]}
          />
        </View>
      </View>
    );
  }
}

export default TimerBig;
