import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import Icon from "react-native-vector-icons/Feather";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors_men";
//services
import NavigationService from "./../../../services/route";
//redux
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RU } from "./../../../locales/ru";

class CashoutList extends React.Component {
  state = { count: this.props.item.count ? this.props.item.count : 0 };
  item = this.props.item;

  setItemCount = count => {
    this.props.loaderState(true);
    this.setState({ count }, () => {
      this.item.count = count;
      if (count === 0) {
        this.deleteElement();
      }
      else {
        this.props.addItemToOrder(this.item);
      }
      this.props.loaderState(false);
    });
  };
  componentWillReceiveProps = (nextProps) => {
  }
  deleteElement = () => {
    this.props.deleteElem(this.item)
  }
  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Button
            style={styles.button}
            transparent
            block
            rounded
            onPress={() =>
              NavigationService.navigate("Picture", {
                image: this.props.item.photo,
                copyOfCards: this.props.copyOfCards,
                general_info: this.props.general_info
              })
            }
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{ uri: this.props.item.photo }}
              style={styles.photo}
            />
          </Button>
          <View style={styles.title}>
            <Text numberOfLines={2} style={styles.text}>{this.props.item.name.toUpperCase()}</Text>
            <Text style={styles.text_epc}>{this.props.item.price} {RU.EPC}</Text>
          </View>
        </View>
        <View style={styles.calculate}>
          <Button
            disabled={this.state.count == 0 ? true : false}
            rounded
            block
            transparent
            androidRippleColor={this.props.userColor.card_shadow}
            style={styles.calculate_button}
            onPress={() => this.setItemCount(--this.state.count)}
          >
            <Icon name="minus" style={styles.icon} />
          </Button>
          <Text style={styles.text_count}>{this.props.item.count ? this.props.item.count : 0}</Text>
          <Button
            disabled={this.state.count == this.props.item.amount ? true : false}
            rounded
            block
            transparent
            androidRippleColor={this.props.userColor.card_shadow}
            style={styles.calculate_button}
            onPress={() => this.setItemCount(++this.state.count)}
          >
            <Icon name="plus" style={styles.icon} />
          </Button>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  loader: state.loader
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashoutList);
