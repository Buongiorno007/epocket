import React from "react";
import { View,Text } from "react-native";
import { LinearTextGradient } from "react-native-text-gradient";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";
import { colors } from "./../../../constants/colors";
//services
import { formatNumber } from "./../../../services/format-number";

class TradePrice extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.line} />
        <View style={styles.data}>
          <LinearTextGradient
            style={styles.text}
            locations={[0, 1]}
            colors={[this.props.userColor.light_red, this.props.userColor.dark_pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
              {RU.TRADE.RESULT}
          </LinearTextGradient>
          <LinearTextGradient
            style={styles.text}
            locations={[0, 1]}
            colors={[this.props.userColor.light_red, this.props.userColor.dark_pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
              {formatNumber(this.props.price)}
          </LinearTextGradient>
        </View>
      </View>
    );
  };
}

export default TradePrice;
