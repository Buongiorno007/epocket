import React from "react";
import { View } from "react-native";
//constants
import styles from "./styles";

class Blur extends React.Component {
  render() {
    return <View style={[styles.blur_container,
    this.props.strong && styles.blur_container_strong,
    this.props.dark && styles.blur_container_dark,
    this.props.paddingBottom && styles.bottom_padding, this.props.loader && styles.blur_loader_dark]} />;
  }
}

export default Blur;
