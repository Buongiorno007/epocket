import React from "react";
import {
  View,
  StatusBar,
  Image,
  Text,
  Keyboard,
  AsyncStorage,
  Alert,
  Animated,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { TextField } from "react-native-material-textfield";
import LinearGradient from "react-native-linear-gradient";
//containers
import BackButton from "../../containers/back/back";
import CustomButton from "../../containers/custom-button/custom-button";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//redux
import { setToken } from "../../../reducers/token";
import { loaderState } from "../../../reducers/loader";
import { setBalance } from "../../../reducers/user-balance";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPush } from "../../../reducers/push";
//services
import NavigationService from "../../../services/route";
import { httpPost } from "../../../services/http";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
import { urls } from "../../../constants/urls";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
const keyboardVerticalOffset = Platform.OS === "ios" ? -50 : -100;

class SignIn extends React.Component {
  static navigationOptions = () => ({
    header: <BackButton title={RU.SIGN_IN_TITLE} route="Start" />
  });

  prefix = "+380";
  state = {
    signInMargin: new Animated.Value(40),
    phone: "",
    code: "",
    invalidCode: false,
    numberNotExists: false,
    codeCorrect: false,
    step: 1,
    failedSignVisible: false,
    failedConfirmVisible: false,
    errorText: "",
  };

  constructor(props) {
    super(props);
    Keyboard.dismiss();
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
    Animated.timing(this.state.signInMargin, {
      duration: 100,
      toValue: 0,
    }).start();
  }

  _keyboardDidHide = () => {
    Animated.timing(this.state.signInMargin, {
      duration: 100,
      toValue: 40,
    }).start();
  }
  setFailedSignVisible = visible => {
    this.setState({ failedSignVisible: visible });
  };
  setFailedConfirmVisible = visible => {
    this.setState({ failedConfirmVisible: visible });
  };
  onChangedPhone(text) {
    this.setState({ numberNotExists: false });
    let newText = "";
    let phonePattern = /^\d+$/;
    if (phonePattern.test(text)) {
      newText = text;
      this.setState({ acceptButton: newText.length == 9 });
    } else {
      this.setState({ acceptButton: false });
      newText = text.substring(0, text.length - 1);
    }
    this.setState({ phone: newText });
  }

  onChangedCode(text) {
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

  login = () => {
    Keyboard.dismiss();
    this.setFailedSignVisible(false);
    this.props.loaderState(true);
    let body = {
      phone: "+380" + this.state.phone
    };
    let promise = httpPost(urls.sing_in, JSON.stringify(body));
    promise.then(
      result => {
        this.setFailedSignVisible(false);
        this.props.loaderState(false);
        this.setState({ step: 2, acceptButton: false });
      },
      error => {
        console.log("Rejected: ", error);
        if (error.code === 503) {
          this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
          this.setFailedSignVisible(true);
        } else if (error.code === 400) {
          this.setState({ numberNotExists: true });
        } else if (error.code === 403) {
          this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
          this.setFailedSignVisible(true);
        } else if (error.code === 408) {
          this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
          this.setFailedSignVisible(true);
        }
        this.props.loaderState(false);
      }
    );
  };

  confirmLogin = () => {
    Keyboard.dismiss();
    this.setFailedConfirmVisible(false);
    this.props.loaderState(true);
    let body = {
      phone: "+380" + this.state.phone,
      code: this.state.code
    };
    let promise = httpPost(urls.sing_in_confirm, JSON.stringify(body));
    promise.then(
      result => {
        //console.log('result', result)
        this.setFailedConfirmVisible(false);
        this.props.loaderState(false);
        const user_info = JSON.stringify({
          token: result.body.token,
          name: result.body.user,
          phone: this.state.phone,
          photo: result.body.photo,
          sex: result.body.sex,
          birthDay: result.body.birthDay
        });
        this.props.getPush(result.body.token)
        AsyncStorage.setItem("user_info", user_info);
        AsyncStorage.setItem("balance", String(result.body.balance));
        this.props.setToken(result.body.token);
        this.props.setBalance(result.body.balance);
        NavigationService.navigate("Main");
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
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.main_view}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled
      >
        <View style={styles.main_view}>
          <CustomAlert
            title={this.state.errorText}
            first_btn_title={RU.REPEAT}
            visible={this.state.failedSignVisible}
            first_btn_handler={() => {
              this.login();
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
              this.confirmLogin();
            }}
            decline_btn_handler={() => {
              this.setFailedConfirmVisible(!this.state.failedConfirmVisible);
            }}
          />
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            backgroundColor={"transparent"}
          />
          <Image
            style={styles.bottom_image}
            source={{ uri: ICONS.COMMON.SIGN_IN_BACKGROUND }}
          />
          <LinearGradient
            colors={["#FEBF54", "#FB7375", "rgba(246,34,183,0.48)"]}
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            style={styles.grad}
          />
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
                onChangeText={text => {
                  this.onChangedPhone(text);
                }}
                value={this.state.phone}
                maxLength={9}
                keyboardType="numeric"
                prefix={this.prefix}
              />
              <Text
                style={
                  this.state.numberNotExists
                    ? styles.number_exists
                    : styles.disabled
                }
              >
                {RU.NUMBER_NOT_EXISTS}
              </Text>
              <Animated.View style={[{ marginTop: this.state.signInMargin }]}>
                <CustomButton
                  handler={() => {
                    this.login();
                  }}
                  active={this.state.acceptButton}
                  title={RU.SIGN_IN}
                />
              </Animated.View>
            </View>
          ) : this.state.step == 2 ? (
            <View style={styles.form}>
              <Text style={styles.code_sent}>{RU.CODE_SENT}</Text>
              <Text style={styles.enter_code}>{RU.ENTER_CODE_SIDN_IN}</Text>
              <TextField
                label={""}
                style={styles.code_input}
                textColor={colors.input}
                tintColor={colors.input}
                baseColor={colors.input}
                placeholder={RU.CODE_MASK}
                placeholderTextColor={colors.input_placeholder}
                labelPadding={16}
                inputContainerPadding={16}
                maxLength={6}
                keyboardType="numeric"
                onChangeText={text => this.onChangedCode(text)}
              />
              {this.state.invalidCode ? (
                <Text style={styles.check_code}>{RU.CHECK_CODE}</Text>
              ) : null}
              <Animated.View style={[{ marginTop: this.state.signInMargin }]}>
                <CustomButton
                  handler={() => {
                    this.confirmLogin();
                  }}
                  active={this.state.acceptButton}
                  title={RU.ACCEPT}
                />
              </Animated.View>
            </View>
          ) : null}
          {this.props.loader && <ActivityIndicator />}
        </View>
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
)(SignIn);
