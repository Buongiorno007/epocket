import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";

class HistoryNavButton extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Button
        rounded
        transparent
        onPress={this.props.handler}
        style={[
          this.props.disabled
            ? styles.semi_transparent_button_active
            : styles.semi_transparent_button_disabled
        ]}
      >
        <Text
          style={[
            this.props.disabled
              ? [{ color: this.props.active_color }, styles.button_text_active]
              : styles.button_text_disabled
          ]}
        >
          {this.props.title}
        </Text>
      </Button>
    );
  }
}

export default HistoryNavButton;
