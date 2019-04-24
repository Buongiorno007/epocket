import React from "react";
import { View, Text, FlatList, Linking } from "react-native";
import { Button } from "native-base";
import FastImage from "react-native-fast-image";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class PartnerCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let item = this.props.item;
    let index = this.props.index + 1;
    return !item.invisible ? (
      <Button
        rounded
        block
        onPress={() => {
          if (!this.props.picked_shops) {
            this.props.openBarcode(item.link);
          } else {
            this.props.openLink(item.link);
          }
        }}
        style={[
          styles.partner_card,
          index % 2 === 0 ? styles.partner_card_right : styles.partner_card_left
        ]}
      >
        <View style={styles.partner_card_inner}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.icon}
            source={{
              uri: item.image ? item.image : ICONS.COMMON.PARTNERS,
              priority: FastImage.priority.high
            }}
          />
          <View style={styles.border} />
          <Text numberOfLines={1} style={styles.partner_title}>
            {item.name.toUpperCase()}
          </Text>
        </View>
      </Button>
    ) : (
      <View style={styles.invisible} />
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.token,
    userColor: state.userColor
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerCard);
