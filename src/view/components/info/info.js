import React from "react";
import { View, Text, ImageBackground, ScrollView } from "react-native";
import FastImage from 'react-native-fast-image'
//containers
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import TimerModal from "../../containers/timer-modal/timer-modal";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";


import LinearGradient from "react-native-linear-gradient";

class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main_view}>
        <View style={styles.back_view}>
          <ImageBackground style={styles.back_img} source={require('../../../assets/img/INFO_BACK.jpg')} />
        </View>

        <ScrollView style={styles.scroll}>

          <LinearGradient
            colors={["rgba(171,107,255,0.91)", "rgba(254,81,162,0.95)", "rgba(253,77,133,0.90)", "rgba(252,72,102,0.90)"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 0.5, y: 0.2 }}
            style={styles.gradient}
          >
            <View style={styles.logo_view}>
              <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.logo} source={{ uri: ICONS.WHITE_LOGO }} />
            </View>
            <Text style={styles.info_title}>
              {RU.INFO_PAGE.INFO_TITLE}
            </Text>
          </LinearGradient>

        </ScrollView>
        <TimerModal />
        <FooterNavigation />
      </View>
    );
  }
}

export default Info;
