import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { RU } from "../../../locales/ru";
import { ICONS } from "../../../constants/icons";
//containers
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import Balance from "./../../containers/cashout-balance/cashout-balance";
import HistoryNavButton from "./../../containers/history-nav-button/history-nav-button";
import HistoryList from "./../../containers/history-list/history-list";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import TimerModal from "../../containers/timer-modal/timer-modal";

class History extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    pickedBonuses: true,
    balance: 0
  };
  pickSpentBonuses = () => {
    let pick = this.state.pickedBonuses;
    this.setState({ pickedBonuses: !pick });
  };
  pickReceivedBonuses = () => {
    let pick = this.state.pickedBonuses;
    this.setState({ pickedBonuses: !pick });
  };
  componentDidMount() {}

  
  render() {
    return (
      <View style={styles.main_view}>
        <LinearGradient
          colors={[colors.light_orange, colors.pink]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.grad}
        >


          <View style={styles.history_nav}>
            <Balance />
            <View style={styles.nav_buttons}>
              <HistoryNavButton
                handler={
                  !this.state.pickedBonuses
                    ? () => this.pickReceivedBonuses()
                    : null
                }
                title={RU.HISTORY_PAGE.GETTED}
                active_color={colors.orange}
                disabled={this.state.pickedBonuses}
              />
              <HistoryNavButton
                handler={
                  this.state.pickedBonuses
                    ? () => this.pickSpentBonuses()
                    : null
                }
                title={RU.HISTORY_PAGE.LOST}
                active_color={colors.dark_pink}
                disabled={!this.state.pickedBonuses}
              />
            </View>
          </View>
          <View style={styles.list_container}>
            <HistoryList picked_bonuses={this.state.pickedBonuses} />
          </View>
        </LinearGradient>
        {/* {(this.props.receivedBonusesJSX.loader ||
          this.props.spentBonusesJSX.loader) && <ActivityIndicator />} */}
          <TimerModal/>
        <FooterNavigation />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    receivedBonusesJSX: state.receivedBonusesJSX,
    spentBonusesJSX: state.spentBonusesJSX
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
