import React from "react";
import { View, Image } from "react-native";
import { Button } from "native-base";
//constants
import { ICONS } from "../../../constants/icons";
import styles from "./styles";

class CurrentGeolocation extends React.Component {
  render() {
    return (
      <View style={styles.shadow}>
        <View style={styles.get_geolocation_view}>
          <Button
            transparent
            style={styles.get_geolocation_button}
            onPress={() => {
              this.props.onPress();
            }}
          >
            <Image
              style={styles.get_geolocation}
              source={{ uri: ICONS.COMMON.GET_CURR_GEOLOCATION }}
            />
          </Button>
        </View>
      </View>
    );
  }
}

export default CurrentGeolocation;
