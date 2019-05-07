import React from "react";
import { View, Text } from "react-native";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
//container
import Blur from "../blur/blur";
const gif_url = "../../../assets/img/preloader_nobg.gif";

class ActivityIndicator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Blur loader/>
        <FastImage resizeMode={FastImage.resizeMode.contain} source={require(gif_url)} style={styles.loader_image} />
      </View>
    );
  }
}

export default ActivityIndicator;
