import React from "react";
import { View, Text, Platform } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FastImage from "react-native-fast-image";
import I18n from "@locales/I18n";

class CardCashout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: ""
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency || "" });
    });
  }

  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    return (
      <Button
        style={[
          styles.card,
          Platform.OS === "android" && {
            borderTopWidth: 1,
            borderTopColor: "rgba(217, 221, 224, 0.5)"
          }
        ]}
        onPress={this._onPress}
      >
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.icon}
          source={{ uri: this.props.item.photo }}
        />
        <View style={styles.text_cashout}>
          <Text
            numberOfLines={1}
            style={[styles.owner, { color: this.props.userColor.black }]}
          >
            {this.props.item.name.toUpperCase()}
          </Text>
          <Text numberOfLines={1} style={[styles.price]}>
            {this.props.item.formated_price
              ? this.props.item.formated_price.amount
              : this.props.item.formated.amount}{" "}
            {I18n.t("EPC", { currency: this.state.currency })}
          </Text>
        </View>
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardCashout);
