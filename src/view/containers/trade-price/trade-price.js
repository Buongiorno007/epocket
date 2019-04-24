import React from "react";
import { View, Text } from "react-native";
import { LinearTextGradient } from "react-native-text-gradient";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
//services
import { formatNumber } from "./../../../services/format-number";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "@locales/I18n";

class TradePrice extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.line} />
        <View style={styles.data}>
          <Text style={styles.text}>{I18n.t("TRADE.RESULT")}</Text>
          <Text style={styles.text}>{formatNumber(this.props.price)}</Text>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  userColor: state.userColor
});

export default connect(mapStateToProps)(TradePrice);
