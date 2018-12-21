import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class HistoryNavButton extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <Button
        rounded
        transparent
        onPress={this.props.handler}
        style={[styles.button]}
      >
        {this.props.cartCount &&
          <View style={[styles.cart_number, { backgroundColor: this.props.userColor.pink_blue }]} >
            <Text style={styles.number}>{this.props.cartCount}</Text>
          </View>
        }
        <Text
          style={[styles.button_text]}
        >
          {this.props.title.toUpperCase()}
        </Text>
        {this.props.disabled &&
          <View style={[styles.dot,
          { backgroundColor: this.props.userColor.pink_blue }]} />
        }
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryNavButton);