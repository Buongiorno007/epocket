import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import PickedLanguage from "./../../../locales/language-picker";

class PhotoFooter extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.text}>{PickedLanguage.SCANNER.TYPE}</Text>
        </View>
      </View>
    );
  };
}

export default PhotoFooter;
