import React from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image'
import { RNCamera } from "react-native-camera";
import Refresh from "react-native-vector-icons/SimpleLineIcons";
import Circle from "react-native-vector-icons/Entypo";
import { Button } from "native-base";
//containers
import TemplateInstagramPhoto from "../template-insta-photo/template-insta-photo";
import InstaHashTags from "../insta-hashtags/insta-hashtags";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";
import { urls } from "../../../constants/urls";
import { colors } from "./../../../constants/colors";
import { ICONS } from "./../../../constants/icons";
//services
import NavigationService from "./../../../services/route";
import { httpPost } from "../../../services/http";
import { serializeJSON } from "../../../services/serialize-json";
//redux
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class PhotoCamera extends React.Component {
  state = {
    type: false,
    flash: false,
    template_info: {
      media: '',
      hashtags: ''
    }

  };

  componentDidMount = () => {
    this.props.loaderState(false);
    let body = JSON.stringify({
      outlet_id: this.props.selectedMall.id,
      mission_id: this.props.selectedMission.id
    });
    let promise = httpPost(
      urls.insta_outlet_template,
      body,
      this.props.token
    );
    promise.then(
      result => {
        console.log(result)
        this.setState({
          template_info: {
            media: result.body.media,
            hashtags: result.body.hash_tag
          }
        });
      },
      error => {
        console.log("Rejected: ", error);
      }
    );
  }

  takePicture = async () => {
    if (this.camera) {
      this.props.loaderState(true);
      const options = { quality: 0.5, base64: true, fixOrientation: true, forceUpOrientation: true, width: 500, height: 500 };
      const data = await this.camera.takePictureAsync(options);

      NavigationService.navigate("Photo", {
        image: `data:image/jpg;base64,${data.base64}`,
        url: data.uri,
        template_info: this.state.template_info
      });
    }
  };

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.template_photo}>
          <TemplateInstagramPhoto template_url={this.state.template_info.media} />
        </View>
        <View style={[styles.camera, styles.size]}>
          <RNCamera
            captureAudio={false}
            ratio={"1:1"}
            ref={ref => (this.camera = ref)}
            style={styles.preview}
            type={
              !this.state.type
                ? RNCamera.Constants.Type.back
                : RNCamera.Constants.Type.front
            }
            flashMode={
              this.state.flash
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            permissionDialogTitle={RU.TITLE}
            permissionDialogMessage={RU.CAMERA_PERMISSION}
          />
        </View>
        <View style={styles.template_hashtags}>
          <InstaHashTags hashtags={this.state.template_info.hashtags} />
        </View>
        <View style={[styles.settings, styles.size]}>
          <View style={styles.photo_button}>
            <View>
              <Button
                rounded
                transparent
                block
                style={styles.button}
                androidRippleColor={this.props.userColor.card_shadow}
                onPress={() => this.setState({ type: !this.state.type })}
              >
                <Refresh name="refresh" style={styles.icon_refresh} />
              </Button>
            </View>
            <View>
              <Button
                rounded
                transparent
                block
                style={[styles.button, styles.button_circle]}
                androidRippleColor={this.props.userColor.card_shadow}
                onPress={this.takePicture}
              >
                <Circle name="circle" style={styles.icon_circle} />
              </Button>
            </View>
            <View>
              <Button
                rounded
                transparent
                block
                style={styles.button}
                androidRippleColor={this.props.userColor.card_shadow}
                onPress={() => this.setState({ flash: !this.state.flash })}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={{ uri: ICONS.SCANNER.FLASH }}
                  style={styles.icon_flash}
                />
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  loader: state.loader,
  userColor: state.userColor,
  selectedMission: state.selectedMission,
  selectedMall: state.selectedMall,
  token: state.token,
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
)(PhotoCamera);
