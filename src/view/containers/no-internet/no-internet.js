import React from "react";
import { View, Text } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import PickedLanguage from "../../../locales/language-picker";
import styles from "./styles";
const gif_url = "../../../assets/img/wifi.gif";
class NoInternet extends React.Component {
  render() {
    return (
      <View style={styles.no_internet}>
        <Text style={styles.purple_text}>{PickedLanguage.NO_INTERNET}</Text>
        <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.no_internet_image} source={require(gif_url)} />
      </View>
    );
  }
}

export default NoInternet;
