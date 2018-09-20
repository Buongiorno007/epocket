import React, { Component } from "react";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { Button, Text } from "native-base";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";

{
  /* 
call example
status - default false (will be shown icon), if true will be shown photo from src
src - photo's source 

<CustomPhoto status={this.state.user.status} src={this.state.user.photo}/>

*/
}
class CustomPhoto extends Component {
  render() {
    return (
      <View>
        <LinearGradient
          colors={[colors.light_orange, colors.pink]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 0.5, y: 0.2 }}
          style={styles.photo_container}
        >
          {this.props.src ? (
            <Image
              style={styles.photo}
              source={{ uri: "data:image/jpeg;base64," + this.props.src }}
            />
          ) : (
              <Image
                style={styles.icon}
                source={require('../../../assets/img/UNSET_PROILE.png')}
              />
            )}
        </LinearGradient>
      </View>
    );
  }
}
export default CustomPhoto;
