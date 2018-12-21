import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "native-base";
import { LinearTextGradient } from "react-native-text-gradient";
//containers
import CustomAlert from "../custom-alert/custom-alert";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { colors } from "./../../../constants/colors";
//redux
import { getBonuses } from "../../../reducers/history-bonuses";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleError } from "../../../services/http-error-handler";

class HistoryCard extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    errorVisible: true,
    errorText: ""
  };
  componentDidMount() {
    let error_respons = handleError({ code: this.props.info.error }, this.constructor.name, "componentDidMount");
    this.setState({ errorText: error_respons.error_text });
  }
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  format = input => {
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!input || !input.match(pattern)) {
      return null;
    }
    return input.replace(pattern, "$3.$2.$1");
  };
  render() {
    return (
      <View>
        {this.props.info.error ? (
          <CustomAlert
            title={this.state.errorText}
            first_btn_title={RU.REPEAT}
            visible={this.state.errorVisible}
            first_btn_handler={() => {
              this.props.getBonuses(this.props.token, 10, 10);
            }}
            decline_btn_handler={() => {
              this.setModalVisible(!this.state.errorVisible);
            }}
          />
        ) : (
            <View>
              {this.props.type == "received" ? (
                <View style={styles.received_card}>
                  <View style={styles.cost}>
                    <Text style={styles.price_text}>
                      {this.props.info.price} {RU.EPC}
                    </Text>
                  </View>
                  <View style={styles.name}>
                    <LinearTextGradient
                      numberOfLines={1}
                      locations={[0, 1]}
                      colors={[this.props.userColor.second_gradient_color, this.props.userColor.first_gradient_color]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 1.0, y: 1.0 }}
                      style={styles.name_text}
                    >
                      {this.props.info.trade_point_name.toUpperCase()}
                    </LinearTextGradient>
                  </View>
                  <View style={styles.date}>
                    <Text style={styles.date_text}>
                      {this.props.info.date
                        .split("T")[1]
                        .split("+")[0]
                        .slice(0, -7)}
                    </Text>
                    <Text style={styles.date_text}>
                      {this.format(this.props.info.date.split("T")[0])}
                    </Text>
                  </View>
                </View>
              ) : (
                  <View style={styles.spent_card}>
                    <View style={styles.name_and_price}>
                      <LinearTextGradient
                        numberOfLines={2}
                        locations={[0, 1]}
                        colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
                        start={{ x: 0.0, y: 1.0 }}
                        end={{ x: 1.0, y: 1.0 }}
                        style={styles.item_name_text}
                      >
                        {this.props.info.product_name}
                      </LinearTextGradient>
                      <Text style={styles.amount}>
                        {this.props.info.price} x {this.props.info.amount} ={" "}
                        {this.props.info.price * this.props.info.amount} {RU.EPC}
                      </Text>
                    </View>
                    <View style={styles.date}>
                      <Text style={styles.date_text}>
                        {this.props.info.date
                          .split("T")[1]
                          .split("+")[0]
                          .slice(0, -3)}
                      </Text>
                      <Text style={styles.date_text}>
                        {this.format(this.props.info.date.split("T")[0])}
                      </Text>
                    </View>
                  </View>
                )}
            </View>
          )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.token,
    userColor: state.userColor,
    receivedBonusesJSX: state.receivedBonusesJSX,
    spentBonusesJSX: state.spentBonusesJSX
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBonuses }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryCard);
