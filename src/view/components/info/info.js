import React from "react";
import { View, Text, Image,ImageBackground, BackHandler } from "react-native";
import VideoPlayer from "react-native-video-controls";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import TimerModal from "../../containers/timer-modal/timer-modal";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";
//services
import NavigationService from "./../../../services/route";

class Info extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    show_video: false,
    url: "https://vjs.zencdn.net/v/oceans.mp4"
  };
  startVideo = () => {
    this.setState({
      show_video: true
    });
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      NavigationService.navigate("Main");
      this.closeVideo();
      return true;
    });
  };
  closeVideo = () => {
    this.setState({
      show_video: false
    });
    this.backHandler.remove();
  };
  render() {
    return (
      <View style={styles.main_view}>
        <View style={styles.back_view}>
          <ImageBackground style={styles.back_img} source={require('../../../assets/img/INFO_BACK.png')} />
        </View>
        {this.state.show_video ? (
          <View style={styles.video_player_view}>
            <VideoPlayer
              style={styles.video}
              source={{
                uri: this.state.url
              }}
              onBack={() => this.closeVideo()}
              onEnd={() => this.closeVideo()}
            />
          </View>
        ) : null}

        {/* <LinearGradient
          colors={["rgba(138, 109, 247, 0.75)", "rgba(245, 88, 144, 0.75)"]}
          start={{ x: 1.7, y: 1.7 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.gradient}
        />*/}
        <View style={styles.logo_view}>
          <Image style={styles.logo} source={{ uri: ICONS.WHITE_LOGO }} />
        </View>
        <View style={styles.awesome_button}>
          <CustomButton
            active
            short
            title={RU.INFO_PAGE.WATCH.toUpperCase()}
            color={colors.pink}
            handler={() => this.startVideo()}
          />
        </View> 
        <TimerModal/>
        <FooterNavigation />
      </View>
    );
  }
}

export default Info;
