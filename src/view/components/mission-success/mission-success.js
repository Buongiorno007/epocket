import React from "react";
import { View, Text, StatusBar } from "react-native";
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { colors } from "./../../../constants/colors";
import { RU } from "./../../../locales/ru";
//services
import NavigationService from "./../../../services/route";
//redux
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MissionSuccess extends React.Component {

  earnMore = () => {
    NavigationService.navigate("EarnMore", {
      insta_data: this.props.navigation.state.params.insta_data
    });
  };

  componentDidMount = () => {
    this.props.loaderState(false)
  }

  render = () => {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          translucent={true}
        />
         <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image_background}
          source={require('../../../assets/img/ANIMATED_EARN_MORE.gif')}
        />
        <LinearGradient
          colors={this.props.userColor.earn_more}
          start={{ x: 0.0, y: 1.4 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.grad}
        />
        <View style={styles.success}>
          <Text style={styles.congratulation}>{RU.MISSION.SUCCESS}</Text>
          <Text style={styles.cash}>
            {RU.MISSION.CASH} {this.props.navigation.state.params.price} {RU.EPC}
          </Text>
          <Button
            rounded
            transparent
            block
            style={styles.button}
            androidRippleColor={this.props.userColor.card_shadow}
            onPress={() => {
              this.earnMore()
            }}
          >
            <Text style={styles.text}>{RU.OK}</Text>
          </Button>
        </View>
      </View >
    );
  };
}

const mapStateToProps = state => ({
  userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MissionSuccess);