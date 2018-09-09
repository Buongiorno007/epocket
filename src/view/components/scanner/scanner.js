import React from "react";
import { View, StatusBar, BackHandler } from "react-native";
//containers
import Mission from "./../../containers/scanner-mission/scanner-mission";
import Info from "./../../containers/scanner-info/scanner-info";
import Camera from "./../../containers/scanner-camera/scanner-camera";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//constants
import styles from "./styles";
//redux
import { setActiveCard } from "../../../reducers/set-active-card";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Scanner extends React.Component {
  componentDidMount() {
    this.props.setActiveCard(false);

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
        {this.props.loader && <ActivityIndicator />}
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <View style={styles.content}>
          <Mission />
          <Info />
          <Camera />
        </View>
      </View>
    );
  };
}
const mapStateToProps = state => ({
  loader: state.loader
});

const mapDispatchToProps = dispatch => bindActionCreators({setActiveCard}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanner);
