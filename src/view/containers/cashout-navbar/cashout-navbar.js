import React from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { Button } from "native-base";
import { colors } from "./../../../constants/colors";
import { ICONS } from '../../../constants/icons';
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
          <FastImage style={styles.icon}
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: ICONS.COMMON.CLOSE }} >
          </FastImage>
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
