import React from "react";
import { View, Text, Image } from "react-native";
import * as Animatable from "react-native-animatable";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
const git_url = "../../../assets/img/process.gif";
class Process extends React.Component {
  render = () => {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={2000}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{RU.QRCODE.PROCESS}</Text>
          <Image source={require(git_url)} style={styles.image} />
        </View>
      </Animatable.View>
    );
  };
}

export default Process;
