import React from "react";
import { View, Image } from "react-native";
import { RNCamera } from "react-native-camera";
import Refresh from "react-native-vector-icons/SimpleLineIcons";
import Circle from "react-native-vector-icons/Entypo";
import { Button } from "native-base";
//containers
import ActivityIndicator from "../activity-indicator/activity-indicator";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";
import { colors } from "./../../../constants/colors";
import { ICONS } from "./../../../constants/icons";
//services
import NavigationService from "./../../../services/route";
//redux
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class PhotoCamera extends React.Component {
  state = {
    type: false,
    flash: false
  };

  takePicture = async () => {
    if (this.camera) {
      this.props.loaderState(true);
      const options = { quality: 0.5, base64: true, fixOrientation: true  };
      const data = await this.camera.takePictureAsync(options);
      
      NavigationService.navigate("Photo", {
        image: `data:image/jpg;base64,${data.base64}`,
        url: data.uri
      });
    }
  };

  render = () => {
    return (
      <View style={styles.container}>
        <View style={[styles.camera, styles.size]}>
          <RNCamera
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
        <View style={[styles.settings, styles.size]}>
          <View style={styles.photo_button}>
            <View>
              <Button
                rounded
                transparent
                block
                style={styles.button}
                androidRippleColor={colors.card_shadow}
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
                androidRippleColor={colors.card_shadow}
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
                androidRippleColor={colors.card_shadow}
                onPress={() => this.setState({ flash: !this.state.flash })}
              >
                <Image
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
  loader: state.loader
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
