import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import I18n from "@locales/I18n";

class PhotoFooter extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.text}>{I18n.t("SCANNER.TYPE")}</Text>
        </View>
      </View>
    );
  };
}

export default PhotoFooter;
