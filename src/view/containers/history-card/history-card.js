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

class HistoryCard extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    errorVisible: true,
    errorText: ""
  };
  componentDidMount() {
    if (this.props.info.error === 503) {
      this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
    } else if (this.props.info.error === 400) {
      this.setState({ errorText: RU.HTTP_ERRORS.NOT_FOUND });
    } else if (this.props.info.error === 403) {
      this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
    } else if (this.props.info.error === 408) {
      this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
    }
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
                    {this.props.info.price} epc
                  </Text>
                </View>
                <View style={styles.name}>
                  <LinearTextGradient
                    numberOfLines={1}
                    locations={[0, 1]}
                    colors={[colors.pink, colors.orange]}
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
                      .slice(0, -3)}
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
                    locations={[0, 1]}
                    colors={[colors.light_orange, colors.pink]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={styles.item_name_text}
                  >
                    {this.props.info.product_name}
                  </LinearTextGradient>
                  <Text style={styles.amount}>
                    {this.props.info.price} x {this.props.info.amount} ={" "}
                    {this.props.info.price * this.props.info.amount} epc
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
