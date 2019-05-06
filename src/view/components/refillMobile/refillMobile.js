import React from "react";
import { View } from "react-native";
import NavigationService from "./../../../services/route";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class refillMobile extends React.Component {
  render = () => {
    return (
      <View >
        
      </View>
    );
  };
}
const mapStateToProps = state => ({
//   userColor: state.userColor,
//   loader: state.loader
});

const mapDispatchToProps = dispatch => bindActionCreators({
    // setActiveCard
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(refillMobile);
