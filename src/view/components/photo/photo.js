import React from "react";
import { View } from "react-native";
//containers
import Mission from "./../../containers/scanner-mission/scanner-mission";
import Display from "./../../containers/photo-view/photo-view";
import Footer from "./../../containers/photo-footer/photo-footer";
//constants
import styles from "./styles";

class Photo extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Mission />
          <Display navigation={this.props.navigation} />
          <Footer />
        </View>
      </View>
    );
  };
}

export default Photo;
