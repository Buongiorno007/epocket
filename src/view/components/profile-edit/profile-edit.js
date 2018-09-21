import React from "react";
import {
  Platform,
  Text,
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  StatusBar,
  BackHandler
} from "react-native";
import { Button } from "native-base";
import ImagePicker from "react-native-image-picker";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import CustomPhoto from "../../containers/custom-photo/custom-photo";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import Blur from "../../containers/blur/blur";
//constants
import styles from "./styles";
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
import { TextField } from "react-native-material-textfield";
import { LinearTextGradient } from "react-native-text-gradient";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
const keyboardVerticalOffset = Platform.OS === "ios" ? -20 : -10;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: {
      username: this.props.navigation.state.params.async_storage_user.user_name,
      photo: this.props.navigation.state.params.async_storage_user.user_photo_url,
      phone: this.props.navigation.state.params.async_storage_user.user_phone,
      birthDay: this.props.navigation.state.params.async_storage_user.user_birthDay,
      sex: this.props.navigation.state.params.async_storage_user.user_sex
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
    if (!this.state.user.username ||
      !this.state.user.birthDay ||
      !this.state.user.sex) {
      this.setModalVisible(true);
    } else {
      this.props.loaderState(true);
      this.setRejectVisible(false);
      let body = {
        name: this.state.user.username,
        sex: this.state.user.sex,
        birthDay: this.state.user.birthDay,
        photo: "data:image/jpeg;base64," + this.state.user.photo
      };
      let promise = httpPost(
        urls.edit_profile_data,
        serializeJSON(body),
        this.props.token,
        true
      );
      promise.then(
        result => {
          this.setRejectVisible(false);
          let user = {
            name: this.state.user.username,
            photo: this.state.user.photo,
            sex: this.state.user.sex,
            birthDay: this.state.user.birthDay,
            phone: this.state.user.phone,
            token: this.props.token
          };
          AsyncStorage.setItem("user_info", JSON.stringify(user));
          this.props.saveUser(user);
          this.props.loaderState(false);
          NavigationService.navigate("Main");
        },
        error => {
          console.log("Rejected: ", error);
          if (error.code === 503) {
            this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
            this.props.loaderState(false);
            this.setRejectVisible(true);
          } else if (error.code === 400) {
            this.setState({ errorText: RU.HTTP_ERRORS.NOT_FOUND });
            this.props.loaderState(false);
            this.setRejectVisible(true);
          } else if (error.code === 403) {
            this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
            this.props.loaderState(false);
            this.setRejectVisible(true);
          } else if (error.code === 408) {
            this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
            this.props.loaderState(false);
            this.setRejectVisible(true);
          }

        }
      );
    }
  };
  ClearName = () => {
    let user = { ...this.state.user };
    user.username = "";
    this.setState({ user, changed: true });
  };
  ClearBirthDay = () => {
    let user = { ...this.state.user };
    user.birthDay = "";
    this.setState({ user, changed: true });
  };
  ChangeUserName = text => {
    let user = { ...this.state.user };
    user.username = text;
    this.setState({ user, changed: true });
  };
  ChangeUserBirthDay = text => {
    let user = { ...this.state.user };
    user.birthDay = text;
    this.setState({ user, changed: true });
  };
  ChangeUserSex = sex => {
    let user = { ...this.state.user };
    user.sex = sex;
    this.setState({ user, changed: true });
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
      quality: 0.75
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
    console.log(this.props.navigation.state.params.async_storage_user)
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
        {this.props.loader && <ActivityIndicator />}
        {(this.state.modalVisible ||
          this.state.exitVisible ||
          this.state.rejectedRequestModal) && <Blur />}
        <View style={styles.user_edit_header_container}>
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
              <CustomPhoto
                edit
                status={this.state.user.status}
                src={this.state.user.photo}
                PhotoEdit={() => this.PhotoEdit()}
              />
            </View>
            <View style={styles.text_container}>
              <TextField
                label={RU.NAMES}
                placeholder={RU.ENTER_NAME}
                tintColor={colors.black41_09}
                baseColor={colors.black41_09}
                textColor={colors.black}
                fontSize={20}
                labelFontSize={12}
                onChangeText={text => { this.ChangeUserName(text) }}
                value={this.state.user.username}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                onFocus={() => { this.ClearName() }}
              />

              <TextField
                label={RU.PROFILE_PAGE.BIRTHDAY}
                placeholder={RU.PROFILE_PAGE.ENTER_BIRTHDAY}
                tintColor={colors.black41_09}
                baseColor={colors.black41_09}
                textColor={colors.black41_09}
                fontSize={12}
                labelFontSize={12}
                onChangeText={text => { this.ChangeUserBirthDay(text) }}
                value={this.state.user.birthDay}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                onFocus={() => { this.ClearBirthDay() }}
                keyboardType="numeric"
              />
              <Text style={styles.title} >{RU.PROFILE_PAGE.SEX}</Text>
              <View style={styles.sex_picker}>
                <Button
                  transparent
                  block
                  rounded
                  style={styles.sex_btn}
                  onPress={() => { this.ChangeUserSex(1) }}
                >
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={this.state.user.sex === 1 ? [colors.light_orange, colors.pink] : [colors.black41_09, colors.black41_09]}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 0.7, y: 1.0 }}
                    style={styles.title}
                  >
                    мужской
                </LinearTextGradient>
                </Button>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[colors.light_orange, colors.pink]}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 0.7, y: 1.0 }}
                  style={styles.title}
                >
                  {" "}/{" "}
                </LinearTextGradient>
                <Button
                  transparent
                  block
                  rounded
                  style={styles.sex_btn}
                  onPress={() => { this.ChangeUserSex(0) }}
                >
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={this.state.user.sex === 0 ? [colors.light_orange, colors.pink] : [colors.black41_09, colors.black41_09]}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 0.7, y: 1.0 }}
                    style={styles.title}
                  >
                    женский
                </LinearTextGradient>
                </Button>
              </View>
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
          <CustomButton
            style={styles.btn}
            active
            short
            bordered
            title={RU.PROFILE_PAGE.DECLINE_2.toUpperCase()}
            color={colors.pink}
            handler={() => this.state.changed ? this.Exit() : NavigationService.navigate("Main")}
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
