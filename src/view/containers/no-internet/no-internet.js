import React from "react";
import { View, Text, Image } from "react-native";
//constants
import { RU } from "../../../locales/ru";
import styles from "./styles";
const gif_url = "../../../assets/img/No_connect_BG.gif";
class NoInternet extends React.Component {
  render() {
    return (
      <View style={styles.no_internet}>
        <Text style={styles.purple_text}>{RU.NO_INTERNET}</Text>
        <Image style={styles.no_internet_image} source={require(gif_url)} />
      </View>
    );
  }
}

export default NoInternet;
