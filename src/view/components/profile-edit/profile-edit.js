import React from "react";
import {
  Platform,
  Text,
  View,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  BackHandler
} from "react-native";
import { Button, Item, Input, Label, Form } from "native-base";
import ImagePicker from "react-native-image-picker";
//containers
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import CustomButton from "../../containers/custom-button/custom-button";
import CustomPhoto from "../../containers/custom-photo/custom-photo";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import Blur from "../../containers/blur/blur";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveUser } from "../../../reducers/profile-state";
import { loaderState } from "../../../reducers/loader";
//service
import { httpPost } from "../../../services/http";
import { serializeJSON } from "../../../services/serialize-json";
import { urls } from "../../../constants/urls";
import NavigationService from "../../../services/route";

const keyboardVerticalOffset = Platform.OS === "ios" ? -20 : -10;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: {
      username: this.props.navigation.state.params.async_storage_user.user_name,
      photo: this.props.navigation.state.params.async_storage_user
        .user_photo_url,
      phone: this.props.navigation.state.params.async_storage_user.user_phone
    },
    modalVisible: false,
    exitVisible: false,
    rejectedRequestModal: false,
    changed: false,
    errorText: "error"
  };
  setRejectVisible = visible => {
    this.setState({
      rejectedRequestModal: visible
    });
  };
  setModalVisible = visible => {
    this.setState({
      modalVisible: visible
    });
  };
  setExitVisible = visible => {
    this.setState({
      exitVisible: visible
    });
  };
  Exit = () => {
    this.setExitVisible(true);
  };
  SubmitEdit = () => {
    if (this.state.user.username === "") {
      this.setModalVisible(true);
    } else {
      this.props.loaderState(true);
      this.setRejectVisible(false);
      let body = {
        name: this.state.user.username,
        photo: "data:image/jpeg;base64," + this.state.user.photo
      };
      let promise = httpPost(
        urls.edit_profile_data,
        serializeJSON(body),
        this.props.token
      );
      promise.then(
        result => {
          this.setRejectVisible(false);
          console.log("Fulfilled: ", result);
          let user = {
            user_name: this.state.user.username,
            user_photo_url: this.state.user.photo,
            user_phone: this.state.user.phone
          };
          let JSON_user = JSON.stringify({
            name: this.state.user.username,
            photo: this.state.user.photo,
            phone: this.state.user.phone,
            token: this.props.token
          });
          AsyncStorage.setItem("user_info", JSON_user);
          this.props.saveUser(user);
          this.props.loaderState(false);
          NavigationService.navigate("Main");
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
          this.props.loaderState(false);
          this.setRejectVisible(true);
        }
      );
    }
  };
  ClearField = () => {
    let user = { ...this.state.user };
    user.username = "";
    this.setState({ user, changed: true });
  };
  ChangeUsername = text => {
    let user = { ...this.state.user };
    user.username = text.text;
    if (user.username.length + 1 <= 20) {
      this.setState({ user, changed: true });
    }
  };
  PhotoEdit = () => {
    const options = {
      title: RU.PROFILE_PAGE.CHOOSE_AVATAR,
      mediaType: "photo",
      maxWidth: 1000,
      maxHeight: 1000,
      takePhotoButtonTitle: "Сделать фото",
      chooseFromLibraryButtonTitle: "Выбрать из галереи",
      cancelButtonTitle: "Отмена",
      quality: 0.75,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        let source = { uri: response.data };
        let user = { ...this.state.user };
        user.photo = source.uri;
        this.setState({ user, changed: true });
      }
    });
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.changed) {
        this.Exit();
      } else {
        NavigationService.navigate("Main");
      }
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    return (
      <View style={styles.main}>
        {this.state.modalVisible ||
        this.state.exitVisible ||
        this.state.rejectedRequestModal ? (
          <Blur />
        ) : null}
        <View style={styles.user_edit_header_container}>
          {this.state.changed ? (
            <Button
              iconLeft
              transparent
              rounded
              style={styles.exit_button}
              onPress={() => this.Exit()}
            >
              <Image
                style={styles.cross}
                source={{ uri: ICONS.COMMON.CLOSE }}
              />
            </Button>
          ) : (
            <Button
              transparent
              iconLeft
              rounded
              style={styles.exit_button}
              onPress={() => NavigationService.navigate("Main")}
              title={" "}
            >
              <Image
                style={styles.cross}
                source={{ uri: ICONS.COMMON.CLOSE }}
              />
            </Button>
          )}

          <CustomAlert
            title={RU.PROFILE_PAGE.ALERT_NOT_SAVED_DATA}
            first_btn_title={RU.PROFILE_PAGE.YES}
            second_btn_title={RU.PROFILE_PAGE.NO}
            visible={this.state.exitVisible}
            second_btn_handler={() =>
              this.setExitVisible(!this.state.exitVisible)
            }
            first_btn_handler={() => NavigationService.navigate("Main")}
            decline_btn_handler={() =>
              this.setExitVisible(!this.state.exitVisible)
            }
          />
        </View>
        <KeyboardAvoidingView
          style={styles.keyboard_avoid_view}
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
          enabled
        >
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            backgroundColor={"transparent"}
          />
          <View style={styles.user_edit_container}>
            <View style={styles.photo_container}>
              <View>
                <CustomPhoto
                  status={this.state.user.status}
                  src={this.state.user.photo}
                />
              </View>
              <View style={styles.edit_photo_btn_container}>
                <Button
                  style={styles.edit_photo_btn}
                  onPress={() => this.PhotoEdit()}
                  rounded
                >
                  {this.state.user.photo ? (
                    <Text style={styles.edit_photo_btn_text}>
                      {RU.PROFILE_PAGE.EDIT_PHOTO.toUpperCase()}
                    </Text>
                  ) : (
                    <Text style={styles.edit_photo_btn_text}>
                      {RU.PROFILE_PAGE.LOAD_PHOTO.toUpperCase()}
                    </Text>
                  )}
                </Button>
              </View>
            </View>
            <View style={styles.text_container}>
              <Form>
                <Item
                  floatingLabel
                  style={styles.text_container_item}
                  ref={item => {
                    this.usernameItem = item;
                  }}
                >
                  <Label style={styles.text_container_label}>
                    { RU.ENTER_NAME }
                  </Label>
                  <Input
                    style={styles.text_container_input}
                    getRef={input => {
                      this.usernameItem = input;
                    }}
                    onFocus={() => this.ClearField()}
                    onChangeText={text => this.ChangeUsername({ text })}
                    value={this.state.user.username}
                  />
                </Item>
              </Form>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.btn_container}>
          <CustomButton
            style={styles.btn}
            active
            short
            gradient
            title={RU.PROFILE_PAGE.ACCEPT.toUpperCase()}
            color={colors.white}
            handler={() => this.SubmitEdit()}
          />
        </View>
        <CustomAlert
          title={RU.PROFILE_PAGE.ALERT_EMPTY}
          first_btn_title={RU.OK}
          visible={this.state.modalVisible}
          first_btn_handler={() =>
            this.setModalVisible(!this.state.modalVisible)
          }
          decline_btn_handler={() =>
            this.setModalVisible(!this.state.modalVisible)
          }
        />
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.rejectedRequestModal}
          first_btn_handler={() => {
            this.setRejectVisible(!this.state.rejectedRequestModal);
            this.SubmitEdit();
          }}
          decline_btn_handler={() =>
            this.setRejectVisible(!this.state.rejectedRequestModal)
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profileState,
  token: state.token,
  loader: state.loader
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveUser,
      loaderState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);
