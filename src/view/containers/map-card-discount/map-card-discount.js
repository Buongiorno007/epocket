import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CardDiscount extends React.Component {
  constructor(props) {
    super(props);
  }
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };
  render() {
    return (
      <Button
        style={
          this.props.item.active
            ? [styles.card, Platform.OS === 'android' && {  
              borderTopWidth : 1,
              borderTopColor : 'rgba(217, 221, 224, 0.5)',
            }]
            : [
                styles.card,
                {
                  borderWidth: 1,
                  borderColor: this.props.item.color,
                  backgroundColor: "transparent",
                  elevation: 0,
                  shadowColor: this.props.userColor.card_shadow,
                  shadowOffset: {
                    width: 0,
                    height: 0
                  },
                  shadowRadius: 0
                }
              ]
        }
        onPress={
          this.props.item.active
            ? this._onPress
            : null
        }
      >
        <Text
          style={[
            this.props.item.active
              ? styles.price
              : [styles.price, { color: this.props.item.color }]
          ]}
        >
          {this.props.item.price} epc
        </Text>
        <Text style={[styles.owner, { color: this.props.item.color }]}>
          {this.props.item.trade}
        </Text>
        <Text
          style={[
            this.props.item.active
              ? styles.time_range
              : [styles.failed_time_range, { color: this.props.item.color }]
          ]}
        >
          {this.props.item.date_start.substring(10, 16)} -{" "}
          {this.props.item.date_end.substring(10, 16)}
        </Text>
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
)(CardDiscount);