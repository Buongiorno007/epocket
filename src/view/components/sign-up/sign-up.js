import React from "react";
import {
  View,
  StatusBar,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  Animated
} from "react-native";
import FastImage from 'react-native-fast-image'
import { TextField } from "react-native-material-textfield";
import LinearGradient from "react-native-linear-gradient";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import BackButton from "../../containers/back/back";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";
import { urls } from "../../../constants/urls";
import { ICONS } from "../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setToken } from "../../../reducers/token";
import { loaderState } from "../../../reducers/loader";
import { setBalance } from "../../../reducers/user-balance";
import { setProfileVirgin } from "../../../reducers/profile-virgin"
import { setGeoVirgin } from "../../../reducers/geo-virgin"
import { getPush } from "../../../reducers/push";
import { saveUser } from "../../../reducers/profile-state";
//services
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";

const keyboardVerticalOffset = Platform.OS === "ios" ? -50 : -100;

class SignUp extends React.Component {
  static navigationOptions = () => ({
    header: <BackButton title={RU.SIGN_UP_TITLE} route="Start" />
  });

  state = {
    signUpMargin: new Animated.Value(40),
    phone: "",
    name: "",
    code: "",
    numberExists: false,
    invalidCode: false,
    phoneCorrect: false,
    nameCorrect: false,
    codeCorrect: false,
    step: 1,
    failedSignVisible: false,
    failedConfirmVisible: false,
    errorText: ""
  };

  constructor(props) {
    super(props);
  }
  setFailedSignVisible = visible => {
    this.setState({ failedSignVisible: visible });
  };
  setFailedConfirmVisible = visible => {
    this.setState({ failedConfirmVisible: visible });
  };
  mask = (text) => {
    let phoneCopy = text;
    let maskedPhone = this.mphone(phoneCopy);
    if (phoneCopy != maskedPhone) {
      this.setState({ phone: maskedPhone })
    }
  }

  mphone = (v) => {
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 7) {
      // 11+ digits.
      r = r.replace(/^(\d{2})(\d{3})(\d{0,3})(\d{0,4}).*/, "$1 ($2) $3 $4");
    }
    else if (r.length > 5) {
      // 6..10 digits. Format as 4+4
      r = r.replace(/^(\d{2})(\d{0,3})(\d{0,5}).*/, "$1 ($2) $3");
    }
    else if (r.length > 2) {
      // 3..5 digits.
      r = r.replace(/^(\d{2})(\d{0,3})/, "$1 ($2");
    }
    else {
      // 0..2 digits.
      r = r.replace(/^(\d*)/, "$1");
    }
    return r;
  }
  onChangedPhone(text) {
    this.setState({ numberExists: false });
    let newText = "";
    let phonePattern = /^.+$/;
    if (phonePattern.test(text)) {
      newText = text;
      this.setState({ phoneCorrect: text.length == 17 });
    } else {
      newText = text.substring(0, text.length - 1);
    }
    this.setState({ phone: newText });
    this.mask(newText)
  }

  onChangedName(text) {
    let newText = "";
    let namePattern = /^[a-z A-Zа-яА-Я]{1,64}$/;
    // console.log("text", text, namePattern.test(text));
    if (namePattern.test(text)) {
      newText = text;
      this.setState({ nameCorrect: text.length > 4 });
    } else {
      newText = text.substring(0, text.length - 1);
    }
    this.setState({ name: newText });
  }

  onChangedCode(text) {
    this.setState({ invalidCode: false });
    let newText = "";
    let codePattern = /^\d+$/;
    if (codePattern.test(text)) {
      newText = text;
      this.setState({ codeCorrect: text.length > 5 });
    } else {
      newText = text.substring(0, text.length - 1);
    }
    if (text.length > 5 && codePattern.test(text)) {
      this.setState({ acceptButton: true });
    }
    this.setState({ code: newText });
  }

  sendForm() {
    this.setFailedSignVisible(false);
    this.props.loaderState(true);
    Keyboard.dismiss();
    let bodyPhone = this.state.phone.replace(/\D/g, '')
    let body = {
      phone: "+" + bodyPhone
    };
    let promise = httpPost(urls.sign_up, JSON.stringify(body));
    promise.then(
      result => {
        this.setFailedSignVisible(false);
        console.log("Fulfilled sendForm: ", result);
        this.props.loaderState(false);
        this.setState({ step: 2, acceptButton: false });
      },
      error => {
        this.props.loaderState(false);
        let error_respons = handleError(error, this.constructor.name, "sendForm");
        this.setState({ errorText: error_respons.error_text });
        if (error_respons.error_code === 400) this.setState({ invalidCode: true });
        else if (error_respons.error_code === 409) this.setState({ numberExists: true });
        else this.setFailedSignVisible(error_respons.error_modal);
      }
    );
  }


  sendCode() {
    Keyboard.dismiss();
    this.setFailedConfirmVisible(false);
    this.props.loaderState(true);
    let bodyPhone = this.state.phone.replace(/\D/g, '')
    let body = {
      phone: "+" + bodyPhone,
      code: this.state.code,
      name: this.state.name
    };
    let promise = httpPost(urls.sign_up_confirm, JSON.stringify(body));
    promise.then(
      result => {
        this.setFailedConfirmVisible(false);
        console.log("Fulfilled sendCode: ", result);
        this.props.loaderState(false);
        let new_user = {
          name: this.state.name,
          phone: this.state.phone,
          balance: 0,
          sex: result.body.sex ? 1 : 0,
          birthDay: result.body.birthDay
        };
        this.props.saveUser(new_user);
        this.props.setToken(result.body.token);
        this.props.setBalance(0);
        this.setState({ step: 3, acceptButton: false });
        this.props.getPush(result.body.token)
        this.props.setGeoVirgin(true)
        this.props.setProfileVirgin(true)
      },
      error => {
        console.log('error', error)
        this.props.loaderState(false);
        let error_respons = handleError(error, this.constructor.name, "sendCode");
        this.setState({ errorText: error_respons.error_text });
        if (error_respons.error_code === 400) {
          this.setState({ invalidCode: true });
        } else {
          this.setFailedConfirmVisible(error_respons.error_modal);
        }
      }
    );
  }

  goToMap() {
    this.props.navigation.navigate("Main");
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.props.loaderState(false);
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow = () => {
    Animated.timing(this.state.signUpMargin, {
      duration: 100,
      toValue: 0,
    }).start();
  }

  _keyboardDidHide = () => {
    Animated.timing(this.state.signUpMargin, {
      duration: 100,
      toValue: 40,
    }).start();
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.registration_page}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled
      >
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.failedSignVisible}
          first_btn_handler={() => {
            this.sendForm();
          }}
          decline_btn_handler={() => {
            this.setFailedSignVisible(!this.state.failedSignVisible);
          }}
        />
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.failedConfirmVisible}
          first_btn_handler={() => {
            this.sendCode();
          }}
          decline_btn_handler={() => {
            this.setFailedConfirmVisible(!this.state.failedConfirmVisible);
          }}
        />
        <StatusBar
          barStyle="default"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <FastImage
          style={styles.bottom_image}
          source={{ uri: ICONS.COMMON.SIGN_UP_BACKGROUND }}
        />
        <LinearGradient
          colors={["#FC4866", "#FE51A2", "rgba(171,107,255,0.43)"]}
          start={{ x: 1.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          style={styles.grad}
        />
        <View style={styles.registration_page}>
          {this.state.step == 1 ? (
            <View style={styles.form}>
              <TextField
                label={RU.MOBILE_NUMBER}
                textColor={this.props.userColor.input}
                tintColor={this.props.userColor.input}
                baseColor={this.props.userColor.input}
                placeholder={RU.PHONE_MASK}
                placeholderTextColor={this.props.userColor.input_placeholder}
                labelPadding={16}
                inputContainerPadding={16}
                onChangeText={text => this.onChangedPhone(text)}
                value={this.state.phone}
                maxLength={17}
                keyboardType="numeric"
                prefix="+"
              />
              <Text
                style={
                  this.state.numberExists
                    ? styles.number_exists
                    : styles.disabled
                }
              >
                {RU.NUMBER_EXISTS}
              </Text>
              <TextField
                label={RU.FIRST_LAST_NAME}
                textColor={this.props.userColor.input}
                tintColor={this.props.userColor.input}
                baseColor={this.props.userColor.input}
                placeholder={RU.NAMES}
                placeholderTextColor={this.props.userColor.input_placeholder}
                value={this.state.name}
                labelPadding={16}
                inputContainerPadding={16}
                maxLength={64}
                onChangeText={text => this.onChangedName(text)}
              />
              <Animated.View style={[{ marginTop: this.state.signUpMargin }]}>
                <CustomButton
                  color={this.state.phoneCorrect && this.state.nameCorrect ? this.props.userColor.pink : this.props.userColor.white}
                  active={this.state.phoneCorrect && this.state.nameCorrect}
                  title={RU.SIGN_UP.toUpperCase()}
                  handler={() => this.sendForm()}
                />
              </Animated.View>
            </View>
          ) : this.state.step == 2 ? (
            <View style={styles.form}>
              <Text style={styles.code_sent}>{RU.CODE_SENT}</Text>
              <Text style={styles.enter_code}>{RU.ENTER_CODE}</Text>
              <TextField
                label=""
                style={styles.code_input}
                textColor={this.props.userColor.input}
                tintColor={this.props.userColor.input}
                baseColor={this.props.userColor.input}
                placeholder={RU.CODE_MASK}
                placeholderTextColor={this.props.userColor.input_placeholder}
                labelPadding={16}
                label=""
                inputContainerPadding={16}
                maxLength={6}
                value={this.state.code}
                keyboardType="numeric"
                onChangeText={text => this.onChangedCode(text)}
              />
              <Text
                style={
                  this.state.invalidCode ? styles.check_code : styles.disabled
                }
              >
                {RU.CHECK_CODE}
              </Text>
              <Animated.View style={[{ marginTop: this.state.signUpMargin }]}>
                <CustomButton
                  color={this.state.codeCorrect ? this.props.userColor.pink : this.props.userColor.white}
                  active={this.state.codeCorrect}
                  title={RU.ACCEPT.toUpperCase()}
                  handler={() => this.sendCode()}
                />
              </Animated.View>
            </View>
          ) : this.state.step == 3 ? (
            <View style={styles.form}>
              <Text style={styles.code_sent}>{RU.SING_UP_SUCCESS}</Text>
              <Text style={styles.enter_code}>{RU.USE_YOUR_PHONE}</Text>
              <Animated.View style={[{ marginTop: this.state.signUpMargin }]}>
                <CustomButton
                  color={this.props.userColor.pink}
                  active
                  title={RU.OK.toUpperCase()}
                  handler={() => this.goToMap()}
                />
              </Animated.View>
            </View>
          ) : null}
        </View>
        {this.props.loader && <ActivityIndicator />}
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  userColor: state.userColor,
  loader: state.loader
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setToken,
      setBalance,
      loaderState,
      getPush,
      saveUser,
      setProfileVirgin,
      setGeoVirgin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
