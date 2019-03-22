import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import PickedLanguage from "./../../../locales/language-picker";
//services
import { formatDate } from "./../../../services/format-date";

class TradeTitle extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.data}>
          <Text style={[styles.text, styles.title]}>{PickedLanguage.TRADE.DATE}</Text>
          <Text style={[styles.text, styles.value]}>
            {formatDate(this.props.date)}
          </Text>
        </View>
        <View style={styles.line} />
      </View>
    );
  };
}

export default TradeTitle;
