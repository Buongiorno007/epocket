import React from "react";
import { View, Dimensions } from "react-native";
import QRCode from "react-native-qrcode";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";

class CashoutCode extends React.Component {
  static defaultProps = {
    link: "http://facebook.github.io/react-native/"
  };

  state = {
    width: Dimensions.get("window").width
  };

  render = () => {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.props.link}
          size={this.state.width * 0.65}
          bgColor={this.props.userColor.black}
          fgColor={this.props.userColor.white}
        />
      </View>
    );
  };
}

export default CashoutCode;
