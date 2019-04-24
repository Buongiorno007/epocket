import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import I18n from "@locales/I18n";

class ScannerInfo extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.please}>{I18n.t("SCANNER.PLEASE")}</Text>
        <Text style={styles.text}>{I18n.t("SCANNER.TEXT")}</Text>
      </View>
    );
  };
}

export default ScannerInfo;
