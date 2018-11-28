import React from "react";
import { View, Text } from "react-native";
import RadialGradient from "react-native-radial-gradient";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class UserMarker extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.main_view}>
        <View style={styles.outer_circle}>
          <RadialGradient
            style={styles.outer_circle}
            colors={[this.props.userColor.light_blue, this.props.userColor.blue]}
          />
        </View>
        <View style={styles.inner_circle}>
          <RadialGradient
            style={styles.inner_circle}
            colors={[this.props.userColor.light_blue, this.props.userColor.blue]}
          />
        </View>
        <View style={styles.center_circle}>
          <RadialGradient
            style={styles.center_circle}
            colors={[this.props.userColor.light_blue, this.props.userColor.blue]}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMarker);