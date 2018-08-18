import React from "react";
import { View, StatusBar } from "react-native";
//containers
import Mission from "./../../containers/scanner-mission/scanner-mission";
import Camera from "./../../containers/photo-camera/photo-camera";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
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
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <View style={styles.content}>
          <Mission />
          <Camera />
          <Footer />
        </View>
        {this.props.loader && <ActivityIndicator />}
      </View>
    );
  };
}
const mapStateToProps = state => ({
  loader: state.loader
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photograph);
