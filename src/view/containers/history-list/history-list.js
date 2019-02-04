import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";
//containers
import HistoryCard from "./../../containers/history-card/history-card";
//redux
import { getBonuses } from "../../../reducers/history-bonuses";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class HistoryList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    limitReceived: 10,
    limitSpent: 10
  };
  componentDidMount = () => {
    this.refreshList();
  };
  refreshList = () => {
    console.log('refreshList');
    this.props.receivedBonusesJSX.loader = true;
    this.props.spentBonusesJSX.loader = true;
    this.props.getBonuses(
      this.props.token,
      this.state.limitReceived,
      this.state.limitSpent
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.picked_bonuses ? (
          <View>
            {this.props.receivedBonusesJSX.body.length > 0 ? (
              <View style={styles.summary}>
                <Text style={styles.summary_light}>
                  {RU.HISTORY_PAGE.ALL_BONUSES_RECEIVED}
                </Text>
                <Text style={styles.summary_bold}>
                  {Number(this.props.receivedBonusesJSX.sum.toFixed(2))} {RU.EPC}
                </Text>
              </View>
            ) : null}
            <View>
              {this.props.receivedBonusesJSX.body.length > 0 ? (
                <ScrollView
                  style={styles.list}
                  onScrollBeginDrag={() => {
                    if (!this.props.receivedBonusesJSX.loader || !this.props.spentBonusesJSX.loader) {
                      let old_limitReceived = this.state.limitReceived;
                      this.setState({ limitReceived: old_limitReceived + 10 });
                      this.refreshList();
                    }
                  }}
                >
                  {this.props.receivedBonusesJSX.body}
                  <View style={styles.filler} />
                </ScrollView>
              ) : (
                  <View style={styles.empty}>
                    <Text>{RU.HISTORY_PAGE.NO_HISTORY}</Text>
                    <View style={styles.filler} />
                  </View>
                )}
            </View>
          </View>
        ) : (
            <View>
              {this.props.spentBonusesJSX.body.length > 0 ? (
                <View style={styles.summary}>
                  <Text style={styles.summary_light}>
                    {RU.HISTORY_PAGE.ALL_BONUSES_SPENT}
                  </Text>
                  <Text style={styles.summary_bold}>
                    {Number(this.props.spentBonusesJSX.sum.toFixed(2))} {RU.EPC}
                  </Text>
                </View>
              ) : null}
              <View>
                {this.props.spentBonusesJSX.body.length > 0 ? (
                  <ScrollView
                    style={styles.list}
                    onScrollBeginDrag={() => {
                      if (!this.props.receivedBonusesJSX.loader || !this.props.spentBonusesJSX.loader) {
                        let old_limitSpent = this.state.limitSpent;
                        this.setState({ limitSpent: old_limitSpent + 10 });
                        this.refreshList();
                      }
                    }}
                  >
                    {this.props.spentBonusesJSX.body}
                    <View style={styles.filler} />
                  </ScrollView>
                ) : (
                    <View style={styles.empty}>
                      <Text>{RU.HISTORY_PAGE.NO_HISTORY}</Text>
                      <View style={styles.filler} />
                    </View>
                  )}
              </View>
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
)(HistoryList);
