import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
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
  goToDashboard = () => {
    NavigationService.navigate("Main");
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
        <LinearGradient
          colors={[
            "#F7BB42",
            colors.orange,
            colors.pink,
            "rgba(214, 41, 197, 0.88)",
            "rgba(119, 12, 225, 0.69)"
          ]}
          start={{ x: 0.0, y: 1.4 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.grad}
        />
        <Image
          style={styles.image}
          source={{ uri: ICONS.COMMON.START_TOP_BACKGROUND }}
        />
        <View style={styles.success}>
          <Text style={styles.congratulation}>{RU.MISSION.SUCCESS}</Text>
          <Text style={styles.cash}>
            {RU.MISSION.CASH} {this.props.navigation.state.params.price} epc
          </Text>
          <Button
            rounded
            transparent
            block
            style={styles.button}
            androidRippleColor={colors.card_shadow}
            onPress={() => {
              this.goToDashboard();
            }}
          >
            <Text style={styles.text}>{RU.OK}</Text>
          </Button>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({

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
)(MissionSuccess);