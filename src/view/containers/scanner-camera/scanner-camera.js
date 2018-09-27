import React from "react";
import { Alert } from "react-native";
import FastImage from 'react-native-fast-image'
import { View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
//containers
import CustomAlert from "../../containers/custom-alert/custom-alert";
//constants
import { RU } from "./../../../locales/ru";
import styles from "./styles";
import { ICONS } from "./../../../constants/icons";
import { urls } from "../../../constants/urls";
//redux
import { loaderState } from "../../../reducers/loader";
import { setShowQR } from "../../../reducers/set-show-qr";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//services
import NavigationService from "../../../services/route";
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";

class ScannerCamera extends React.Component {
  state = {
    errorVisible: false,
    qr_code: null,
    errorText: ""
  };

  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.loaderState(false);
    }, 2000);
  };

  sendQRCode = qrcode => {
    if (qrcode.data) {
      this.setModalVisible(false);
      this.props.loaderState(true);
      this.props.setShowQR(false)
      let body = {
        missionId: this.props.selectedMission.id,
        qrCode: qrcode.data
      };
      let promise = httpPost(
        urls.send_qr_code,
        JSON.stringify(body),
        this.props.token
      );
      promise.then(
        result => {
          NavigationService.navigate("Photograph");
          this.props.setShowQR(true)
        },
        error => {
          this.props.loaderState(false);
          this.props.setShowQR(true)
          let error_respons = handleError(error, this.constructor.name, "sendQRCode");
          this.setState({ errorText: error_respons.error_text });
          this.setModalVisible(error_respons.error_modal);
        }
      );
    }
  };
  reopenQRScanner = () => {
    this.props.setShowQR(true)
    this.setModalVisible(!this.state.errorVisible);
  }
  render = () => {
    return (
      <View style={styles.container}>
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => this.reopenQRScanner()}
          decline_btn_handler={() => this.reopenQRScanner()}
        />
        <View style={styles.frame}>
          <QRCodeScanner
            containerStyle={styles.container}
            cameraStyle={styles.camera}
            onRead={e => { if (this.props.showQR) this.sendQRCode(e) }}
            fadeIn={true}
            reactivate={true}
            checkAndroid6Permissions={true}
            reactivateTimeout={3000}
            permissionDialogTitle={RU.TITLE}
            permissionDialogMessage={RU.CAMERA_PERMISSION}
          />
          <FastImage resizeMode={FastImage.resizeMode.contain} source={{ uri: ICONS.SCANNER.FRAME }} style={styles.image} />
        </View>
        <View style={styles.scanner}>
          <FastImage resizeMode={FastImage.resizeMode.contain} source={{ uri: ICONS.SCANNER.CODE }} style={styles.icon} />
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  selectedMission: state.selectedMission,
  token: state.token,
  loader: state.loader,
  showQR: state.showQR
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loaderState, setShowQR }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannerCamera);
