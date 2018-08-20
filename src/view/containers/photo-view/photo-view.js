import React from "react";
import { View, Image, AsyncStorage } from "react-native";
import { Button, Text } from "native-base";
import NavigationService from "./../../../services/route";
//containers
import CustomAlert from "../../containers/custom-alert/custom-alert";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { urls } from "../../../constants/urls";
import { RU } from "./../../../locales/ru";
//redux
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setBalance } from "../../../reducers/user-balance";
//services
import { httpPost } from "../../../services/http";
import { serializeJSON } from "../../../services/serialize-json";

class PhotoView extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    errorPhotoVisible: false,
    errorMissionVisible: false,
    errorText: ""
  };
  setErrorPhotoVisible = visible => {
    this.setState({ errorPhotoVisible: visible });
  };
  setErrorMissionVisible = visible => {
    this.setState({ errorMissionVisible: visible });
  };
  componentDidMount() {
    this.props.loaderState(false);
  }
  sendPhoto = () => {
    this.setErrorPhotoVisible(false);
    this.props.loaderState(true);
    let body = {
      missionId: this.props.selectedMission.id,
      photo: this.props.navigation.state.params.image
    };
    let promise = httpPost(
      urls.send_photo,
      serializeJSON(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setErrorPhotoVisible(false);
        this.finishMission();
        // NavigationService.navigate("MissionSuccess", { price: this.props.selectedMission.price });
      },
      error => {
        console.log("Rejected: ", error);
        if (error.code === 503) {
          this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
        } else if (error.code === 400) {
          this.setState({ errorText: RU.HTTP_ERRORS.NOT_FOUND });
        } else if (error.code === 403) {
          this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
        } else if (error.code === 408) {
          this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
        }
        this.setErrorPhotoVisible(true);
        this.props.loaderState(false);
      }
    );
  };

  finishMission() {
    this.setErrorMissionVisible(false);
    let body = {
      outletId: this.props.selectedMall.id,
      missionId: this.props.selectedMission.id
    };
    let promise = httpPost(
      urls.finish_mission,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setErrorMissionVisible(false);
        this.props.setBalance(result.body.balance);
        AsyncStorage.setItem("balance", result.body.balance, () => {
          NavigationService.navigate("MissionSuccess", {
            price: this.props.selectedMission.price
          });
        });
      },
      error => {
        console.log("Rejected: ", error);
        if (error.code === 503) {
          this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
        } else if (error.code === 400) {
          this.setState({ errorText: RU.HTTP_ERRORS.NOT_FOUND });
        } else if (error.code === 403) {
          this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
        } else if (error.code === 408) {
          this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
        }
        this.setErrorMissionVisible(true);
        this.props.loaderState(false);
      }
    );
  }

  render = () => {
    return (
      <View style={styles.container}>
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorPhotoVisible}
          first_btn_handler={() => {
            this.sendPhoto();
          }}
          decline_btn_handler={() => {
            this.setErrorPhotoVisible(!this.state.errorPhotoVisible);
          }}
        />
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorMissionVisible}
          first_btn_handler={() => {
            this.finishMission();
          }}
          decline_btn_handler={() => {
            this.setErrorMissionVisible(!this.state.errorMissionVisible);
          }}
        />
        <View style={[styles.block, styles.size]}>
          <Image
            source={{ uri: this.props.navigation.state.params.url }}
            style={styles.image}
          />
        </View>
        <View style={[styles.navigation, styles.size]}>
          <View style={[styles.button_container, styles.size]}>
            <Button
              rounded
              transparent
              block
              style={[styles.button, styles.remove]}
              onPress={() => NavigationService.navigate("Photograph")}
              androidRippleColor={colors.card_shadow}
            >
              <Text
                uppercase={false}
                style={[styles.button_text, styles.remove_text]}
              >
                {RU.SCANNER.REMOVE}
              </Text>
            </Button>
            <Button
              rounded
              transparent
              block
              style={[styles.button, styles.send]}
              androidRippleColor={colors.card_shadow}
              onPress={() => this.sendPhoto()}
            >
              <Text
                uppercase={false}
                style={[styles.button_text, styles.send_text]}
              >
                {RU.SCANNER.SEND}
              </Text>
            </Button>
          </View>
        </View>
        {this.props.loader && <ActivityIndicator />}
      </View>
    );
  };
}

const mapStateToProps = state => ({
  selectedMission: state.selectedMission,
  selectedMall: state.selectedMall,
  token: state.token,
  loader: state.loader
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setBalance,
      loaderState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoView);
