import React from "react";
import { View, AsyncStorage } from "react-native";
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
import Barcode from "../../containers/barcode/barcode"


class History extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    pickedBonuses: true,
    balance: 0,
    showBarcode: false,
    phone: "0000000000000"
  };
  pickSpentBonuses = () => {
    let pick = this.state.pickedBonuses;
    this.setState({ pickedBonuses: !pick });
  };
  pickReceivedBonuses = () => {
    let pick = this.state.pickedBonuses;
    this.setState({ pickedBonuses: !pick });
  };
  componentWillMount = () => {
    AsyncStorage.getItem('user_info').then((value) => {
      let object = JSON.parse(value);
      this.setState({
        phone: object.phone.replace(/\D/g, '')
      });
    });
  }

  render() {
    return (
      <View style={styles.main_view}>
        {this.state.showBarcode && <Barcode phone={this.state.phone} closeBarcode={() => { this.setState({ showBarcode: !this.state.showBarcode }) }} />}
        <LinearGradient
          colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.grad}
        >
          <View style={styles.history_nav}>
            <Balance showCurrency openBarcode={() => { this.state.phone ? this.setState({ showBarcode: !this.state.showBarcode }) : console.log("phone is not ready") }} />
          </View>
          <View style={styles.list_container}>
            <View style={styles.nav_buttons}>
              <HistoryNavButton
                handler={
                  !this.state.pickedBonuses
                    ? () => this.pickReceivedBonuses()
                    : null
                }
                title={RU.HISTORY_PAGE.GETTED}
                disabled={this.state.pickedBonuses}
              />
              <HistoryNavButton
                handler={
                  this.state.pickedBonuses
                    ? () => this.pickSpentBonuses()
                    : null
                }
                title={RU.HISTORY_PAGE.LOST}
                disabled={!this.state.pickedBonuses}
              />
            </View>
            <HistoryList picked_bonuses={this.state.pickedBonuses} />
          </View>
        </LinearGradient>
        {/* {(this.props.receivedBonusesJSX.loader ||
          this.props.spentBonusesJSX.loader) && <ActivityIndicator />} */}
        <FooterNavigation />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    receivedBonusesJSX: state.receivedBonusesJSX,
    userColor: state.userColor,
    spentBonusesJSX: state.spentBonusesJSX
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
