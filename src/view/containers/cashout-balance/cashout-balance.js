import React from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { ICONS } from "./../../../constants/icons";
import PickedLanguage from "./../../../locales/language-picker";
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
  navigateToPartners = () => {
    NavigationService.navigate("Partners")
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
        {this.props.showCurrency ?
          <View style={[styles.block, styles.vertical_block]}>
            <View style={[styles.balance_title]}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={[styles.epc_icon]}
                source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
              />
              <Text style={[styles.text, styles.title]}>{this.props.navigation ? PickedLanguage.CASH.YOUR_TITLE : PickedLanguage.CASH.TITLE} {Number(this.props.balance.toFixed(2))} {PickedLanguage.EPC}</Text>
            </View>
            <View style={styles.small_border}></View>
            <View style={[styles.balance_value]}>
              <Text style={[styles.text, styles.cash]}>
                {this.state.currency} {Number(this.props.balance.toFixed(2))}
              </Text>
            </View>
          </View>
          :
          <View style={styles.block}>
            <View style={[styles.item, styles.balance_title]}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.epc_icon}
                source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
              />
            </View>
            <View style={[styles.item, styles.balance_value]}>
              <Text style={[styles.text, styles.title]}>{this.props.navigation ? PickedLanguage.CASH.YOUR_TITLE : PickedLanguage.CASH.TITLE} {Number(this.props.balance.toFixed(2))} {PickedLanguage.EPC}</Text>
            </View>
          </View>
        }
        {this.props.showCurrency &&
          <View style={[styles.block, styles.vertical_block_center]}>
            <View style={[styles.balance_title]}>
              <View style={styles.epc_icon_filler}></View>
              <Text style={[styles.text, styles.title]}>{PickedLanguage.CASH.PARTNERS}</Text>
            </View>
            <View style={[styles.small_border, { display: "none" }]}></View>
            <View>
              <Button
                rounded
                block
                transparent
                onPress={() => this.navigateToPartners()}
                style={styles.barcode_btn}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.barcode_icon}
                  source={{ uri: ICONS.COMMON.PARTNERS }}
                />
              </Button>
            </View>
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
