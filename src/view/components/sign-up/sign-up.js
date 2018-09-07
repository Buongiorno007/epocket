import React from "react";
import {
  View,
  StatusBar,
  Text,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  Animated
} from "react-native";
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
import { getPush } from "../../../reducers/push";
//services
import { httpPost } from "../../../services/http";

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
  onChangedPhone(text) {
    this.setState({ numberExists: false });
    let newText = "";
    let phonePattern = /^\d+$/;
    // console.log("text", text, phonePattern.test(text));
    if (phonePattern.test(text)) {
      newText = text;
      //   console.log("phonePattern.length", text.length);
      this.setState({ phoneCorrect: text.length > 8 });
    } else {
      newText = text.substring(0, text.length - 1);
    }
    this.setState({ phone: newText });
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
    let body = {
      phone: "+380" + this.state.phone
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
        console.log("Rejected: ", error);
        this.props.loaderState(false);
        if (error.code === 503) {
          this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
          this.setFailedSignVisible(true);
        } else if (error.code === 400) {
          this.setState({ invalidCode: true });
          this.setState({ errorText: RU.HTTP_ERRORS.NOT_FOUND });
        } else if (error.code === 403) {
          this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
          this.setFailedSignVisible(true);
        } else if (error.code === 408) {
          this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
          this.setFailedSignVisible(true);
        } else if (error.code === 409) {
          this.setState({ numberExists: true });
        }
      }
    );
  }



  sendCode() {
    Keyboard.dismiss();
    this.setFailedConfirmVisible(false);
    this.props.loaderState(true);
    let body = {
      phone: "+380" + this.state.phone,
      code: this.state.code,
      name: this.state.name
    };
    let promise = httpPost(urls.sign_up_confirm, JSON.stringify(body));
    promise.then(
      result => {
        this.setFailedConfirmVisible(false);
        console.log("Fulfilled sendCode: ", result);
        this.props.loaderState(false);
        let new_user = JSON.stringify({
          name: this.state.name,
          token: result.body.token,
          phone: this.state.phone,
          balance: 0
        });
        AsyncStorage.setItem("user_info", new_user);
        AsyncStorage.setItem("balance", 0);
        this.props.setToken(result.body.token);
        this.props.setBalance(0);
        this.setState({ step: 3, acceptButton: false });
        this.props.getPush(result.body.token)
      },
      error => {
        console.log("Rejected: ", error);
        this.props.loaderState(false);
        if (error.code === 503) {
          this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
          this.setFailedConfirmVisible(true);
        } else if (error.code === 400) {
          this.setState({ invalidCode: true });
          this.setState({ errorText: RU.HTTP_ERRORS.NOT_FOUND });
        } else if (error.code === 403) {
          this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
          this.setFailedConfirmVisible(true);
        } else if (error.code === 408) {
          this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
          this.setFailedConfirmVisible(true);
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
  _keyboardDidShow = () =>{
    Animated.timing(this.state.signUpMargin, {
      duration: 100,
      toValue: 0,
    }).start();
  }

  _keyboardDidHide = () =>{
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
        <Image
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
                textColor={colors.input}
                tintColor={colors.input}
                baseColor={colors.input}
                placeholder={RU.PHONE_MASK}
                placeholderTextColor={colors.input_placeholder}
                labelPadding={16}
                inputContainerPadding={16}
                onChangeText={text => this.onChangedPhone(text)}
                value={this.state.phone}
                maxLength={9}
                keyboardType="numeric"
                prefix="+380"
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
                textColor={colors.input}
                tintColor={colors.input}
                baseColor={colors.input}
                placeholder={RU.NAMES}
                placeholderTextColor={colors.input_placeholder}
                value={this.state.name}
                labelPadding={16}
                inputContainerPadding={16}
                maxLength={64}
                onChangeText={text => this.onChangedName(text)}
              />
               <Animated.View style={[{marginTop:this.state.signUpMargin}]}>
                <CustomButton
                  active={this.state.phoneCorrect && this.state.nameCorrect}
                  title={RU.SIGN_UP}
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
                textColor={colors.input}
                tintColor={colors.input}
                baseColor={colors.input}
                placeholder={RU.CODE_MASK}
                placeholderTextColor={colors.input_placeholder}
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
              <Animated.View style={[{marginTop:this.state.signUpMargin}]}>
                <CustomButton
                  active={this.state.codeCorrect}
                  title={RU.ACCEPT}
                  handler={() => this.sendCode()}
                />
              </Animated.View>
            </View>
          ) : this.state.step == 3 ? (
            <View style={styles.form}>
              <Text style={styles.code_sent}>{RU.SING_UP_SUCCESS}</Text>
              <Text style={styles.enter_code}>{RU.USE_YOUR_PHONE}</Text>
              <Animated.View style={[{marginTop:this.state.signUpMargin}]}>
                <CustomButton
                  active
                  title={RU.OK}
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
  loader: state.loader
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setToken,
      setBalance,
      loaderState,
      getPush
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
