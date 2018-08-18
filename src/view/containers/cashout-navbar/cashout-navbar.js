import React from "react";
import { View } from "react-native";
import Close from "react-native-vector-icons/Feather";
//constants
import styles from "./styles";
import { Button } from "native-base";
import { colors } from "./../../../constants/colors";
//services
import NavigationService from "./../../../services/route";

class CashoutNavbar extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Button
          rounded
          block
          transparent
          androidRippleColor={colors.card_shadow}
          style={styles.button}
          onPress={() => NavigationService.navigate("Main")}
        >
          <Close name="x" style={styles.icon} />
        </Button>
      </View>
    );
  };
}

export default CashoutNavbar;
