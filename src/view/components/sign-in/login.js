import React from 'react';
import {
  View,
  StatusBar,
  Text,
  Keyboard,
  Alert,
  ScrollView,
  Button,
  TextInput,
  Animated,
  Platform,
  KeyboardAvoidingView,
  NativeModules
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';
import { AccessToken } from 'react-native-fbsdk';
//containers
import BackButton from '../../containers/back/back';
import CustomButton from '../../containers/custom-button/custom-button';
import CustomAlert from '../../containers/custom-alert/custom-alert';
import ActivityIndicator from '../../containers/activity-indicator/activity-indicator';
//redux
import { setToken } from '../../../reducers/token';
import { loaderState } from '../../../reducers/loader';
import { setBalance } from '../../../reducers/user-balance';
import { connect } from 'react-redux';
import { setColor } from '../../../reducers/user-color';
import { bindActionCreators } from 'redux';
import { setInstaToken } from '../../../reducers/insta-token';
import { setFacebookToken } from '../../../reducers/facebook-token';
import { setProfileVirgin } from '../../../reducers/profile-virgin';
import { setGeoVirgin } from '../../../reducers/geo-virgin';
import { getPush } from '../../../reducers/push';
import { saveUser } from '../../../reducers/profile-state';
import {
  locationStateListener,
  locationState
} from '../../../reducers/geolocation-status';
import {
  locationCoordsListener,
  setLocation
} from '../../../reducers/geolocation-coords';
//services
import NavigationService from '../../../services/route';
import { httpPost } from '../../../services/http';
import { handleError } from '../../../services/http-error-handler';
import geo_config from '../start/geolocation-config';
import BackgroundGeolocationModule from '../../../services/background-geolocation-picker';
//constants
import styles from './style';
import { colors } from '../../../constants/colors';
import { urls } from '../../../constants/urls';
import { ICONS } from '../../../constants/icons';
///////////////
import { Dropdown } from 'react-native-material-dropdown';
import I18n from '@locales/I18n';

class Login extends React.Component {
  static navigationOptions = () => ({
    header: <BackButton title={I18n.t('BACK').toUpperCase()} route="Start" />
  });

  prefix = '+';
  state = {
    phoneNumber: '-- --- -- --',

    signInMargin: new Animated.Value(40),
    phone: '',
    code: '',
    invalidCode: false,
    numberNotExists: false,
    codeCorrect: false,
    step: 1,
    failedSignVisible: false,
    failedConfirmVisible: false,
    errorText: ''
  };

  constructor(props) {
    super(props);
    Keyboard.dismiss();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
    this.props.loaderState(false);
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow = () => {
    Animated.timing(this.state.signInMargin, {
      duration: 100,
      toValue: 0
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.timing(this.state.signInMargin, {
      duration: 100,
      toValue: 40
    }).start();
  };
  setFailedSignVisible = visible => {
    this.setState({ failedSignVisible: visible });
  };
  setFailedConfirmVisible = visible => {
    this.setState({ failedConfirmVisible: visible });
  };
  mask = text => {
    let phoneCopy = text;
    let maskedPhone = this.mphone(phoneCopy);
    if (phoneCopy != maskedPhone) {
      this.setState({ phone: maskedPhone });
    }
  };

  mphone = v => {
    let r = v.replace(/\D/g, '');
    r = r.replace(/^0/, '');
    if (r.length > 8) {
      // 11+ digits.
      r = r.replace(/^(\d{2})(\d{3})(\d{0,3})(\d{0,5}).*/, '$1 $2 $3 $4');
    } else if (r.length > 5) {
      // 6..10 digits. Format as 4+4
      r = r.replace(/^(\d{2})(\d{0,3})(\d{0,5}).*/, '$1 $2 $3');
    } else if (r.length > 2) {
      // 3..5 digits.
      r = r.replace(/^(\d{2})(\d{0,3})/, '$1 $2');
    } else {
      // 0..2 digits.
      r = r.replace(/^(\d*)/, '$1');
    }
    return r;
  };

  onChangedPhone(text) {
    this.setState({ numberNotExists: false });
    let newText = '';
    let phonePattern = /^.+$/;
    if (phonePattern.test(text)) {
      newText = text;
      this.setState({ acceptButton: newText.length >= 15 });
    } else {
      this.setState({ acceptButton: false });
      newText = text.substring(0, text.length - 1);
    }
    this.setState({ phone: newText });
    this.mask(newText);
  }

  onChangedCode(text) {
    let newText = '';
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
    let bodyPhone = this.state.phone.replace(/\D/g, '');
    let body = {
      phone: '+' + bodyPhone
    };
    httpPost(urls.sing_in, JSON.stringify(body)).then(
      result => {
        this.setFailedSignVisible(false);
        // this.props.loaderState(false); //DEPRECATED uncomment
        // this.setState({ step: 2, acceptButton: false });
        this.confirmLogin(); //DEPRECATED
      },
      error => {
        let error_respons = handleError(
          error,
          body,
          urls.sign_in,
          '',
          this.constructor.name,
          'login'
        );
        this.setState({ errorText: error_respons.error_text });
        if (error_respons.error_code == 400) {
          this.setState({ numberNotExists: true });
        } else {
          this.setFailedSignVisible(error_respons.error_modal);
        }
        this.props.loaderState(false);
      }
    );
  };

  confirmLogin = () => {
    Keyboard.dismiss();
    this.setFailedConfirmVisible(false);
    this.props.loaderState(true);
    let bodyPhone = this.state.phone.replace(/\D/g, '');
    let body = {
      phone: '+' + bodyPhone,
      code: this.state.code
    };
    httpPost(urls.sing_in_confirm, JSON.stringify(body)).then(
      result => {
        if (result.status === 200) {
          this.setFailedConfirmVisible(false);
          this.props.loaderState(false);
          const locale =
            Platform.OS === 'ios'
              ? NativeModules.SettingsManager.settings.AppleLocale.substring(
                  0,
                  2
                )
              : NativeModules.I18nManager.localeIdentifier.substring(0, 2);
          const user_info = {
            name: result.body.user,
            phone: this.state.phone,
            photo: result.body.photo,
            sex: result.body.sex ? 1 : 0,
            birthDay: result.body.birthDay,
            currency:
              locale === 'en'
                ? result.body.currency
                : result.body.currency_plural
          };

          this.props.getPush(result.body.token);
          this.props.saveUser(user_info);
          this.props.setColor(user_info.sex);
          this.props.setToken(result.body.token);
          this.props.setBalance(result.body.balance);
          this.props.setProfileVirgin(result.body.profile_virgin);
          this.props.setGeoVirgin(result.body.geo_virgin);
          // this.isFblogged(result.body.token);
          // this.isInstalogged(result.body.token);
          NavigationService.navigate('Main');
        }
      },
      error => {
        this.props.loaderState(false);
        let error_respons = handleError(
          error,
          body,
          urls.sing_in_confirm,
          '',
          this.constructor.name,
          'confirmLogin'
        );
        this.setState({ errorText: error_respons.error_text });
        this.setFailedConfirmVisible(error_respons.error_modal);
        if (error_respons.error_code === 400)
          this.setState({ invalidCode: true });
      }
    );
  };
  // <CustomAlert
  //           title={this.state.errorText}
  //           first_btn_title={I18n.t('REPEAT')}
  //           visible={this.state.failedSignVisible}
  //           first_btn_handler={() => {
  //             this.login();
  //           }}
  //           decline_btn_handler={() => {
  //             this.setFailedSignVisible(!this.state.failedSignVisible);
  //           }}
  //         />
  //         <CustomAlert
  //           title={this.state.errorText}
  //           first_btn_title={I18n.t('REPEAT')}
  //           visible={this.state.failedConfirmVisible}
  //           first_btn_handler={() => {
  //             this.confirmLogin();
  //           }}
  //           decline_btn_handler={() => {
  //             this.setFailedConfirmVisible(!this.state.failedConfirmVisible);
  //           }}
  //         />
  // <CustomButton
  //               color={
  //                 this.state.acceptButton
  //                   ? this.props.userColor.pink
  //                   : this.props.userColor.white
  //               }
  //               handler={() => {
  //                 this.login();
  //               }}
  //               active={this.state.acceptButton}
  //               title={I18n.t('SIGN_IN').toUpperCase()}
  //             />

  render() {
    let data = [
      {
        value: 'Banana'
      },
      {
        value: 'Mango'
      },
      {
        value: 'Pear'
      },
      {
        value: 'Mango'
      },
      {
        value: 'Pear'
      },
      {
        value: 'Mango'
      },
      {
        value: 'Pear'
      },
      {
        value: 'Mango'
      },
      {
        value: 'Pear'
      }
    ];
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <LinearGradient
          colors={['#FEBF54', '#FB7375', 'rgba(246,34,183,0.48)']}
          start={{ x: 1.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          style={styles.grad}
        >
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.avoiding}
            enabled
          >
            <ScrollView
              scrollEnabled={false}
              keyboardShouldPersistTaps={'handled'}
              //   style={styles.scrollView}
              contentContainerStyle={styles.scrollView}
            >
              <View style={styles.inputView}>
                <Dropdown
                  baseColor={'#fff'} // arrow and border
                  textColor={'#f00'} // PICKED COLOR
                  itemColor={'#707070'} // NOT PICKED DROPDOWN ITEM
                  selectedItemColor={'#00f'}
                  disabledItemColor={'yellow'}
                  // dropdownMargins={16}
                  // textColor={'#FFF'}
                  itemTextStyle={styles.itemTextStyle}
                  // itemPadding={15}
                  // dropdownOffset={{ top: -30, left: 0 }}
                  // itemColor={'#000'}
                  // itemPadding={0} // padding in dropDOwn elements
                  // style={styles.dropDown}

                  // textColor={'#000'}
                  // itemColor={'rgba(0, 0, 0, .54)'}
                  // containerStyle={styles.dropDown}
                  // overlayStyle={{ color: '#000' }}
                  data={data}
                />
                {/* <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={value => {}}
                  value={this.state.phoneNumber}
                  maxLength={`${this.state.phoneNumber}`.length}
                /> */}
              </View>

              {/* <TextField
                label={I18n.t('MOBILE_NUMBER')}
                textColor={'#000000'}
                tintColor={'#000000'}
                baseColor={'#000000'}
                placeholder={I18n.t('PHONE_MASK')}
                placeholderTextColor={'#000000'}
                labelPadding={16}
                inputContainerPadding={16}
                onChangeText={text => {
                  //
                }}
                value={this.state.phoneNumber}
                maxLength={`${this.state.phoneNumber}`.length}
                keyboardType="numeric"
                // prefix={this.prefix}
              /> */}
              <CustomButton
                color={
                  this.state.acceptButton
                    ? this.props.userColor.pink
                    : this.props.userColor.white
                }
                handler={() => {
                  this.login();
                }}
                active={this.state.acceptButton}
                title={I18n.t('SIGN_IN').toUpperCase()}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
        {this.props.loader && <ActivityIndicator />}
      </View>
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
      setInstaToken,
      setFacebookToken,
      setColor,
      getPush,
      saveUser,
      setProfileVirgin,
      setGeoVirgin,
      locationState,
      setLocation,
      locationStateListener,
      locationCoordsListener
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
