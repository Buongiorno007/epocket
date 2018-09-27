import React from "react";
import { View, StatusBar, BackHandler } from "react-native";
import FastImage from 'react-native-fast-image'
//containers
import Navbar from "./../../containers/cashout-navbar/cashout-navbar";
//constants
import styles from "./styles";
//services
import NavigationService from "./../../../services/route";

class Picture extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params, "PARAMS");
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      NavigationService.navigate("Main");
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render = () => {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <Navbar />
        <View style={styles.block}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: this.props.navigation.state.params.image }}
            style={styles.image}
          />
        </View>
      </View>
    );
  };
}

export default Picture;
