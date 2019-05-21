import React from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
//constants
import styles from "./styles";
import I18n from "@locales/I18n";

class CashoutMessage extends React.Component {
  state = {
    currency: ""
  };

  componentDidMount() {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency });
    });
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>
          {I18n.t("QRCODE.TITLE")}
          {this.props.total_price}{" "}
          {I18n.t("EPC", { currency: this.state.currency })}
        </Text>
        <Text style={[styles.text, styles.seller]}>
          {I18n.t("QRCODE.SELLER")}
        </Text>
      </View>
    );
  };
}

export default CashoutMessage;
