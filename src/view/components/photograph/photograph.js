import React from "react";
import { View } from "react-native";
//containers
import Mission from "./../../containers/scanner-mission/scanner-mission";
import Camera from "./../../containers/photo-camera/photo-camera";
import Footer from "./../../containers/photo-footer/photo-footer";
//constants
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Photograph extends React.Component {
  

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Mission />
          <Camera />
          <Footer />
        </View>
      </View>
    );
  };
}
const mapStateToProps = state => ({
  userColor: state.userColor,
  loader: state.loader
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photograph);
