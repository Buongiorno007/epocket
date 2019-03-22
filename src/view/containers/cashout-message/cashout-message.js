import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import PickedLanguage from "./../../../locales/language-picker";

class CashoutMessage extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>
          {PickedLanguage.QRCODE.TITLE}
          {this.props.total_price} {PickedLanguage.EPC}
        </Text>
        <Text style={[styles.text, styles.seller]}>{PickedLanguage.QRCODE.SELLER}</Text>
      </View>
    );
  };
}

export default CashoutMessage;
