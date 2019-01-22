import React from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { ICONS } from "./../../../constants/icons";
import { RU } from "./../../../locales/ru";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//services
import NavigationService from "./../../../services/route";
import { Button } from "native-base";

class CashoutBalance extends React.Component {
  state = {
    currency: "epc"
  }
  navigateBack = () => {
    this.props.navigation ?
      NavigationService.navigate(this.props.navigation.direction)
      :
      console.log("Fail. No navigation prop")
  }
  componentDidMount = () => {
    AsyncStorage.getItem('user_info').then((value) => {
      let object = JSON.parse(value);
      this.setState({
        currency: object.currency
      });
    });
  }
  render = () => {
    return (
      <View style={styles.container}>
        {this.props.navigation &&
          <View style={[styles.block]}>
            <Button
              rounded
              block
              transparent
              onPress={() => this.navigateBack()}
              style={styles.navigation_item}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.icon}
                source={{ uri: ICONS.COMMON.NAVIGATE_BACK }}
              />
              <Text style={[styles.text, styles.title]}>{this.props.navigation.title}</Text>
            </Button>
          </View>
        }
        <View style={styles.block}>
          <View style={[styles.item, styles.balance_title]}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.epc_icon}
              source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
            />
          </View>
          <View style={[styles.item, styles.balance_value]}>
            <Text style={[styles.text, styles.title]}>{this.props.navigation ? RU.CASH.YOUR_TITLE : RU.CASH.TITLE}</Text>
            <Text style={[styles.text, styles.cash]}>
              {this.props.balance} {RU.EPC} = {this.props.balance} {this.state.currency}
            </Text>
          </View>
        </View>
        {this.props.barcode &&
          <View style={[styles.block]}>
            <Button
              rounded
              block
              transparent
              onPress={() => this.props.openBarcode()}
              style={styles.barcode_btn}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.barcode_icon}
                source={{ uri: ICONS.COMMON.BARCODE }}
              />
            </Button>
          </View>
        }
      </View>
    );
  };
}
const mapStateToProps = state => ({ userColor: state.userColor, balance: state.balance });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashoutBalance);
