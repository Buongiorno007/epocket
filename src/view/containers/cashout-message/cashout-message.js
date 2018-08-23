import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";

class CashoutMessage extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>
          {RU.QRCODE.TITLE}
          {this.props.total_price} {RU.EPC}
        </Text>
        <Text style={[styles.text, styles.seller]}>{RU.QRCODE.SELLER}</Text>
      </View>
    );
  };
}

export default CashoutMessage;
