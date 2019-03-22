import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import PickedLanguage from "./../../../locales/language-picker";

class TradeStatus extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.status == -1
            ? PickedLanguage.TRADE.FAIL
            : PickedLanguage.TRADE.SUCCESS}
        </Text>
        {this.props.status == -1 ? (
          <Text style={styles.message}>
              {PickedLanguage.TRADE.FAIL_MESSAGE}
          </Text>
        ) : null}
        {this.props.status == 1 ? (
          <Text style={styles.message}>
            {!this.props.total_approve
              ? PickedLanguage.TRADE.SUCCESS_MESSAGE
              : null}
          </Text>
        ) : null}
      </View>
    );
  };
}

export default TradeStatus;
