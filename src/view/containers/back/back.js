import React from "react";
import { View, Text } from "react-native";
import BackIcon from "react-native-vector-icons/Ionicons";
import { Button } from "native-base";
//constants
import styles from "./styles";
import NavigationService from "../../../services/route";

class BackButton extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Button
          transparent
          style={styles.back_button}
          onPress={() => NavigationService.navigate(this.props.route)}
        >
          <BackIcon name="ios-arrow-back" style={styles.back_icon} />
        </Button>
        <Text style={styles.back_txt}>{this.props.title}</Text>
      </View>
    );
  }
}

export default BackButton;
