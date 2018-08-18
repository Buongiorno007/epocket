import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";

class TradeStatus extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.status == -1
            ? RU.TRADE.FAIL
            : RU.TRADE.SUCCESS}
        </Text>
        {this.props.status == -1 ? (
          <Text style={styles.message}>
              {RU.TRADE.FAIL_MESSAGE}
          </Text>
        ) : null}
        {this.props.status == 1 ? (
          <Text style={styles.message}>
            {!this.props.total_approve
              ? RU.TRADE.SUCCESS_MESSAGE
              : null}
          </Text>
        ) : null}
      </View>
    );
  };
}

export default TradeStatus;
