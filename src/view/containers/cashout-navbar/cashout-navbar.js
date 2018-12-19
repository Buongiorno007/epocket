import React from "react";
import { View } from "react-native";
import Close from "react-native-vector-icons/Feather";
//constants
import styles from "./styles";
import { Button } from "native-base";
import { colors } from "./../../../constants/colors";
//services
import NavigationService from "./../../../services/route";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CashoutNavbar extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Button
          rounded
          block
          transparent
          androidRippleColor={this.props.userColor.card_shadow}
          style={styles.button}
          onPress={() => NavigationService.navigate("Cashout", { cashout_data: this.props.copyOfCards, general_info: this.props.general_info })}
        >
          <Close name="x" style={styles.icon} />
        </Button>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  userColor: state.userColor,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashoutNavbar);
