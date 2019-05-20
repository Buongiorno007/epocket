import React from "react";
import { View, BackHandler, Text } from "react-native";
//containers
import Navbar from "./../../containers/cashout-navbar/cashout-navbar";
import Message from "./../../containers/cashout-message/cashout-message";
import Code from "./../../containers/cashout-code/cashout-code";
import Process from "./../../containers/process/process";
//constants
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSocket } from "../../../reducers/socket";

//services
import NavigationService from "./../../../services/route";

class QrCode extends React.Component {
  state = {
    modal: false
  };

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
    this.props.getSocket(this.props.token, this.props.navigation.state.params.orderId);

  }
  goBackPress = () => {
    NavigationService.navigate("Main");
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentWillReceiveProps = nextProps => {
    let thisStatus = this.props.socket.status;
    let nextStatus = nextProps.socket.status;
    ((nextStatus === 1 || nextStatus === -1) && thisStatus === 2) && NavigationService.navigate("Trade");

  }

  render = () => {
    return (
      <View
        style={[styles.container, this.state.modal ? styles.modal : null]}>
        <Code link={this.props.navigation.state.params.link} />
        <View style={styles.top}>
          <Navbar general_info={this.props.navigation.state.params.general_info} copyOfCards={this.props.navigation.state.params.copyOfCards} />

          <Message
            total_price={this.props.navigation.state.params.total_price}
          />
        </View>

        {this.props.socket.status === 2 ? <Process /> : null}
      </View>
    );
  };
}

const mapStateToProps = state => ({
  selectedMall: state.selectedMall,
  userColor: state.userColor,
  token: state.token,
  socket: state.socket,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSocket }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QrCode);
