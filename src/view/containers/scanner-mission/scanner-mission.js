import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
//constants
import PickedLanguage from "../../../locales/language-picker";
import { ICONS } from '../../../constants/icons';
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//services
import NavigationService from "./../../../services/route";

class ScannerMission extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <View style={[styles.item, styles.cost]}>
          <Text style={[styles.text, styles.cost]}>
            {this.props.selectedMission.price} {PickedLanguage.EPC}
          </Text>
          <Text />
        </View>
        <View style={[styles.item, styles.info]}>
          <Text style={[styles.text, styles.title]}>
            {this.props.selectedMission.trade}
          </Text>
          <Text style={[styles.text, styles.date]}>
            {this.props.selectedMission.date_start.substring(10, 16)} -{this.props.selectedMission.date_end.substring(
              10,
              16
            )}
          </Text>
        </View>
        <View style={styles.item}>
          <Button
            rounded
            transparent
            onPress={() => {
              NavigationService.navigate("Main");
            }}
            style={styles.button}
            androidRippleColor={this.props.userColor.card_shadow}
          >
            <FastImage style={styles.icon}
              resizeMode={FastImage.resizeMode.contain}
              source={{ uri: ICONS.COMMON.CLOSE }} >
            </FastImage>
          </Button>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  selectedMission: state.selectedMission
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannerMission);
