import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { ICONS } from "./../../../constants/icons";
import { RU } from "./../../../locales/ru";
//redux
import { connect } from "react-redux";
//services
import NavigationService from "./../../../services/route";
import { Button } from "native-base";

class CashoutBalance extends React.Component {
  navigateBack = () => {
    this.props.navigation ?
      NavigationService.navigate(this.props.navigation.direction)
      :
      console.log("Fail. No navigation prop")
  }
  render = () => {
    return (
      <View style={styles.container}>
        {this.props.navigation &&
          <View style={styles.block}>
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
              style={styles.icon}
              source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
            />
            <Text style={[styles.text, styles.title]}>{RU.CASH.TITLE}</Text>
          </View>
          <View style={[styles.item, styles.balance_value]}>
            <Text style={[styles.text, styles.cash]}>
              {this.props.balance} {RU.EPC}
            </Text>
          </View>
        </View>
      </View>
    );
  };
}
const mapStateToProps = state => ({ userColor: state.userColor, balance: state.balance });
export default connect(mapStateToProps)(CashoutBalance);
