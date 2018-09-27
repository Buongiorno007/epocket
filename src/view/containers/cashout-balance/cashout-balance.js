import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { ICONS } from "./../../../constants/icons";
import { RU } from "./../../../locales/ru";
//redux
import { connect } from "react-redux";

class CashoutBalance extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
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
              {this.props.balance} epc
            </Text>
          </View>
        </View>
      </View>
    );
  };
}
const mapStateToProps = state => ({ balance: state.balance });
export default connect(mapStateToProps)(CashoutBalance);
