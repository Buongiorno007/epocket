import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FastImage from "react-native-fast-image";
import { RU } from "../../../locales/ru";

class CardCashout extends React.Component {
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
          [styles.card, Platform.OS === 'android' && {
            borderTopWidth: 1,
            borderTopColor: 'rgba(217, 221, 224, 0.5)',
          }]
        }
        onPress={this._onPress}
      >
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.icon}
          source={{ uri: this.props.item.photo }}
        />
        <View style={styles.text_cashout}>
          <Text numberOfLines={1} style={[styles.owner, { color: this.props.userColor.black }]}>
            {this.props.item.name.toUpperCase()}
          </Text>
          <Text numberOfLines={1} style={[styles.price]}>
            {this.props.item.formated.amount ? this.props.item.formated.amount : this.props.item.price} {RU.EPC}
        </Text>
        </View>
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
)(CardCashout);