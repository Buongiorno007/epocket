import React from "react";
import { View, Platform, Text,ImageBackground } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
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
          style={styles.marker}
          ref={marker => {
            this.marker = marker;
          }}
          onPress={this.props.onPress}
          coordinate={this.state.coordinate}
          pinColor={this.props.userColor.blue}

        >
          <ImageBackground
            key={this.props.marker.id}
            style={styles.image}
            source={{ uri: ICONS.COMMON.LOCATION_BLUE }}
          />
          <View style={styles.mall_price_view}>
            <Text
              style={styles.mall_price}
            >
              {this.props.marker.price}
            </Text>
            <Text
              style={styles.mall_price_epc}
            >
              epc
          </Text>
          </View >
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