import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";

class PhotoFooter extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.text}>{RU.SCANNER.TYPE}</Text>
        </View>
      </View>
    );
  };
}

export default PhotoFooter;
