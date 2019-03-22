import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import PickedLanguage from "./../../../locales/language-picker";

class ScannerInfo extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.please}>{PickedLanguage.SCANNER.PLEASE}</Text>
        <Text style={styles.text}>{PickedLanguage.SCANNER.TEXT}</Text>
      </View>
    );
  };
}

export default ScannerInfo;
