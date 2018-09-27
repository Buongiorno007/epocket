import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import Icon from "react-native-vector-icons/Feather";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
//services
import NavigationService from "./../../../services/route";
//redux
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RU } from "./../../../locales/ru";

class CashoutList extends React.Component {
  state = { count: 0 };
  item = this.props.item;

  setItemCount = count => {
    this.props.loaderState(true);
    this.setState({ count }, () => {
      this.item.count = count;
      this.props.addItemToOrder(this.item);
      this.props.loaderState(false);
    });
  };

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
                image: 'data:image/jpeg;base64,' + this.props.item.photo
              })
            }
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{ uri: 'data:image/jpeg;base64,' + this.props.item.photo }}
              style={styles.photo}
            />
          </Button>
          <View style={styles.title}>
            <Text style={styles.text}>{this.props.item.price} {RU.EPC}</Text>
            <Text numberOfLines={2} style={styles.text}>{this.props.item.name}</Text>
          </View>
        </View>
        <View style={styles.calculate}>
          <Button
            disabled={this.state.count == 0 ? true : false}
            rounded
            block
            transparent
            androidRippleColor={colors.card_shadow}
            style={styles.calculate_button}
            onPress={() => this.setItemCount(--this.state.count)}
          >
            <Icon name="minus" style={styles.icon} />
          </Button>
          <Text style={styles.text}>{this.state.count}</Text>
          <Button
            disabled={this.state.count == this.props.item.amount ? true : false}
            rounded
            block
            transparent
            androidRippleColor={colors.card_shadow}
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
