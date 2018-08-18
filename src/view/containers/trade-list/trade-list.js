import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";
//services
import { formatNumber } from "./../../../services/format-number";

class TradeList extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        {this.props.list.map((item, i) => {
          return (
            <View style={[styles.item, !item.amount && styles.hide]} key={i}>
                <View style={styles.one_product}>
                  <View style={styles.data}>
                    <Text style={styles.text}>{item.product__name}</Text>
                    {item.amount >= 1 &&
                      item.approve && (
                        <Text
                          style={[styles.text, styles.small]}
                        >{`${formatNumber(item.product__price)} x ${item.amount} =`}</Text>
                      )}
                  </View>
                  <View
                    style={[
                      styles.data,
                      !item.approve && styles.error,
                      styles.align
                    ]}
                  >
                    <Text
                      style={[
                        styles.text,
                        item.approve && item.amount > 1 && styles.small,
                        !item.approve && styles.product__price
                      ]}
                    >
                      {item.amount > 1 && !item.approve
                        ? `${formatNumber(item.product__price)} x ${
                        item.amount
                        } = ${formatNumber(item.product__price * item.amount)}`
                        : formatNumber(item.product__price)}
                    </Text>
                    {item.amount > 1 &&
                      item.approve && (
                        <Text style={styles.text}>
                          {formatNumber(item.product__price * item.amount)}
                        </Text>
                      )}
                  </View>
                  {(!item.approve || !item.amount )&& (
                    <View style={[styles.data, styles.align]}>
                      <Text style={[styles.text, styles.message]}>
                        {RU.TRADE.CANCEL}
                      </Text>
                    </View>
                  )}
                </View>
            </View>
          );
        })}
      </View>
    );
  };
}

export default TradeList;
