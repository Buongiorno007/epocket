import React from "react";
import { View, Text, Dimensions } from "react-native";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
const { width } = Dimensions.get("window");

class TrcInformation extends React.Component {
  render() {
    return (
      <View style={styles.trc_info}>
        <View style={[styles.left]}>
          <Text style={[styles.trc_info_text_tittle, {width : width *0.45}]} numberOfLines={1}>
            {this.props.info.name || "Караван"}
          </Text>
          <Text numberOfLines={1} style={[styles.trc_info_text_info, {width : width *0.45}]}>
            {this.props.info.adress || "березинка 19"}
          </Text>
        </View>
        <View style={styles.trc_info_border} />
        <View style={[styles.right]}>
          <Text style={styles.trc_info_text_tittle}>{this.props.distance}</Text>
          <Text style={styles.trc_info_text_info}>{RU.M}</Text>
        </View>
      </View>
    );
  }
}

export default TrcInformation;
