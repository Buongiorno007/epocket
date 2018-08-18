import React from "react";
import { View, Image, Platform, Text,ImageBackground } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";

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
          pinColor={colors.blue}

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
              ? colors.trc_marker_light_green
              : colors.trc_marker_blue
          }
        />
      </View> : null
    );
  }
}

export default TRCMarker;
