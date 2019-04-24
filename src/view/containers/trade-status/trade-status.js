import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import I18n from "@locales/I18n";

class TradeStatus extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.status == -1
            ? I18n.t("TRADE.FAIL")
            : I18n.t("TRADE.SUCCESS")}
        </Text>
        {this.props.status == -1 ? (
          <Text style={styles.message}>{I18n.t("TRADE.FAIL_MESSAGE")}</Text>
        ) : null}
        {this.props.status == 1 ? (
          <Text style={styles.message}>
            {!this.props.total_approve ? I18n.t("TRADE.SUCCESS_MESSAGE") : null}
          </Text>
        ) : null}
      </View>
    );
  };
}

export default TradeStatus;
