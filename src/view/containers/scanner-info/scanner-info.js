import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";

class ScannerInfo extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.please}>{RU.SCANNER.PLEASE}</Text>
        <Text style={styles.text}>{RU.SCANNER.TEXT}</Text>
      </View>
    );
  };
}

export default ScannerInfo;
