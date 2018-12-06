import React from "react";
import { View, Platform, Text, ImageBackground } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class TRCMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    coordinate: {
      latitude: parseFloat(this.props.marker.lat),
      longitude: parseFloat(this.props.marker.lng)
    },
    marker: {}
  };

  render() {
    return (
      this.props.marker.price ?
        <View style={styles.main_view}>
          <Marker
            style={[styles.marker, this.props.discountMarker && {
              width: 60,
              height: 60,
            }]}
            ref={marker => {
              this.marker = marker;
            }}
            onPress={this.props.onPress}
            coordinate={this.state.coordinate}
            pinColor={this.props.userColor.blue}

          >
            {this.props.active &&
              <LinearGradient
                colors={[this.props.userColor.active_marker_blue, this.props.userColor.active_marker_lightblue]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={this.props.discountMarker ? styles.big_gradient : styles.gradient}
              />
            }
            <ImageBackground
              key={this.props.marker.id}
              style={this.props.discountMarker ? styles.discount_image : styles.image}
              source={{ uri: this.props.active ? this.props.discountMarker ? ICONS.COMMON.DISCOUNT_ACTIVE : ICONS.COMMON.STORE_ACTIVE : this.props.discountMarker ? ICONS.COMMON.DISCOUNT_INACTIVE : ICONS.COMMON.STORE_INACTIVE }}
            >
              {this.props.discountMarker &&
                <View style={styles.discount_text_container}>
                  <Text style={[styles.discount_text, this.props.active && { color: this.props.userColor.white }]}>%</Text>
                  <Text style={[styles.discount_text, this.props.active && { color: this.props.userColor.white }]}>-N</Text>
                </View>
              }
            </ImageBackground>
            {!this.props.discountMarker &&
              <View style={[!this.props.active ? styles.mall_price_view : styles.mall_price_view_fill]}>
                <Text style={styles.mall_price}>{!this.props.active ? this.props.marker.price : "      "}</Text>
                <Text style={styles.mall_price_epc} >{!this.props.active ? "epc" : "      "}</Text>
              </View >
            }
          </Marker>
          <Circle
            center={{
              latitude: Number(this.props.marker.lat),
              longitude: Number(this.props.marker.lng)
            }}
            radius={this.props.marker.rad}
            strokeWidth={0}
            fillColor={
              this.props.marker.id == this.props.selected
                ? this.props.userColor.trc_marker_light_green
                : this.props.userColor.trc_marker_blue
            }
          />
        </View> : null
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
)(TRCMarker);