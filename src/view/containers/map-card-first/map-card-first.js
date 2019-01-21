import React from "react";
import { View, Text, Platform, ImageBackground, AsyncStorage } from "react-native";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
import { ICONS } from "../../../constants/icons";
import { RU } from "./../../../locales/ru";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//containers
import CustomButton from "../custom-button/custom-button";
//services
import moment from "moment";

class CardDiscount extends React.Component {
  state = {
    notInMall: (this.props.distance <= 0 && this.props.isLocation) ? false : true,
    cartNumber: 0
  }
  constructor(props) {
    super(props);
  }
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };
  componentDidMount = () => {
    if (!this.props.type && this.props.shopActive) {
      AsyncStorage.multiGet(["cashout_cart", "cashout_cart_time", "cashout_cart_id"]).then(response => {
        responseOrder = JSON.parse(response[0][1]);
        let diff = moment().diff(response[1][1], 'seconds')
        if ((diff < 86400) && String(this.props.item.id) == response[2][1]) {
          this.setState({ cartNumber: responseOrder.length })
        }
      })
    }
  }
  render() {
    return (
      <View
        style={
          [styles.card, Platform.OS === 'android' && {
            borderTopWidth: 1,
            borderTopColor: 'rgba(217, 221, 224, 0.5)',
          },
          this.props.type && styles.social_container_cart]
        }
      >
        {this.props.type === "instagram_connect" || this.props.type === "facebook_connect" ?
          <View style={styles.social_card}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.social_icon}
              source={{ uri: this.props.type === "instagram_connect" ? ICONS.INSTAGRAM_COLOR : ICONS.FACEBOOK_COLOR }}
            />
            <Text numberOfLines={3} style={styles.social_text}>{
              this.props.type === "instagram_connect" ?
                RU.MAP.CONNECT_INSTA + "10" + RU.EPC
                :
                RU.MAP.CONNECT_FACEBOOK + "10" + RU.EPC
            }</Text>
            <CustomButton
              mapCard
              style={styles.bottom_btn}
              active
              gradient
              short
              color={this.props.userColor.white}
              title={this.props.btnText}
              handler={() => { this._onPress() }}
            />
          </View>
          :
          <ImageBackground
            source={{ uri: this.props.item.photo }}
            imageStyle={styles.card_image}
            style={[styles.card_background]}
          >
            <View style={styles.dark_cont}>
              <View style={styles.top_text}>
                <Text numberOfLines={1} style={[styles.adress]}>
                  {this.props.item.adress}
                </Text>
                <Text style={[styles.name]}>
                  {this.props.item.name}
                </Text>
                {!this.state.notInMall && this.props.timer_status && this.props.taskActive &&
                  < View style={styles.timer}>
                    <View style={styles.time_counter_container}>
                      <View style={styles.time_counter}>
                        <Text style={styles.time_counter_text}>
                          {this.props.timer.hours < 10 && "0"}
                          {this.props.timer.hours}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.time_divider}>:</Text>
                      </View>
                      <View style={styles.time_counter}>
                        <Text style={styles.time_counter_text}>
                          {this.props.timer.minutes < 10 && "0"}
                          {this.props.timer.minutes}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.time_divider}>:</Text>
                      </View>
                      <View style={styles.time_counter}>
                        <Text style={styles.time_counter_text}>
                          {this.props.timer.seconds < 10 && "0"}
                          {this.props.timer.seconds}
                        </Text>
                      </View>
                    </View>
                  </View>
                }
              </View>
              <CustomButton
                mapCard
                style={styles.bottom_btn}
                active
                short
                gradient
                cartCount={(!this.props.type && this.props.shopActive && this.state.cartNumber > 0) ? this.state.cartNumber : false}
                color={this.props.userColor.white}
                title={this.state.cartNumber > 0 ? RU.MAP.CART.toUpperCase() : this.props.btnText}
                handler={() => { this._onPress() }}
              />
            </View>
          </ImageBackground>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  timer: state.timer,
  timer_status: state.timer_status,
  isLocation: state.isLocation,
  distance: state.distance,
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