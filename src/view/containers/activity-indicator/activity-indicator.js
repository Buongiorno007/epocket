import React from "react";
import { View, Text, Image } from "react-native";
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
        <Blur />
        <Image source={require(gif_url)} style={styles.loader_image} />
      </View>
    );
  }
}

export default ActivityIndicator;
