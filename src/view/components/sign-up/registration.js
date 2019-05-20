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
import I18n from '@locales/I18n';
import SignForm from '@containers/signForm/signForm';
import TextInputMask from 'react-native-text-input-mask';

const base64Icon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

const data = [
  {
    icon:
      'data:image/png;base64,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',
    country: 'Ukraine',
    code: '+380',
    activity: false,
    id: '1'
  },
  {
    icon:
      'data:image/png;base64,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',
    country: 'USA',
    code: '+1',
    activity: false,
    id: '2'
  },
  {
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAHCklEQVR4Xu2dWWxUVRjH/41bZDTRkFBIHLT7VE1kKSgUCt2XB99l86koGveFF1+MoHGpLBqfTDQxspe3lk4LxCdfTEwIKm1hpgXkSQGbgIk0IeaO3Ns5NxnOcD3n3Hty/veFhDP9lv/3y3dn5nznTgV4Oa1AhdPZM3kQAMchIAAEwHEFHE+fHYAAOK6A4+mzAxAAxxVwPH12AALguAKOp88OQAAcV8Dx9NkBCIDjCjiePjsAAXBcAcfTZwcgAI4r4Hj67AAEwHEFHE+fHYAAOK6A4+mzAxAAxxVwPH12AALguAKOp88OQAAcV8Dx9NkBCIDjCjiePjsAAYikQBOA5wDcF+mv+Ue6FfgZwLcAbsocRekADwK4BMD7l1dyFdgC4DtZeFEAeBLAaZlhrseuwAyAh2RRKAGgoaFB5ofrBhSYmJgo9vI1gH6Z2ygAPAHgF9/wyZMn0draKvPDdQMKVFVVYXp62vf0OYC3ZG7/NwAnTpxAW1ubzA/XDShgCoDHAfzq50MADFS2TBfV1dWYmprS3gEEAI4fP4729vYyQ+TLdCoQAmAXgDdl/qLcAhoB/OYbHhsbQ0dHh8wP1w0oUFNTg3w+73vSBkAGwBkCYKCid+iitrYWuVzO/6vdAN6QmYjSAQQARkdH0dnZKfPDdQMKmALA+9A/7udDAAxUtkwXdXV1OHfunPYOIACQzWbR1dVVZoh8mU4FQgDsAfC6zF+UW0A9gOArJwIgk9jcen19Pc6ePes7NAPAyMgIuru7zWVJTyUVCAGwF8BrMrmidIA6AJO+4WPHjqGnp0fmh+sGFPD2ZCYng9JoA6AWQNBnCICBypbpIpPJoGhDyAwAw8PD6O3tLTNEvkynAiEAvgDwqsxflFtADYDgswYBkElsbr2xsRHj48EndDMADA0Noa+vz1yW9FRSAVMAVAMIvm8cGBjgXkBCoGxpacHMjDcIVLi+BPCKLLQotwABAJkDrsemgDcP6M0F3vaKAsAqAD/KDHM9dgW8bUHv/ZpyAIR5AJkDrsemgLdl743vKQdA2A18eG0/5tWukfnhugEFLn3zfLGXTwBsl7mNcgsQNoMWv3SUAMhUNrSe+2AZZq/+7nszBMC2QcyrW2soRbq5nQK5Hcsxe+Wi/5JPAbwrUyxKBxB2AxcTAJnGxtZjASC9bRApdgBjRb6DDvAZgHdkgUXpAMJuIAGQSWxuPbejCbNXLvgODQHw4hGk6lvMZUlPJRUIATAA4G2ZXFE6gLAdnCYAMo2NrccEwGGk6tcZS5KOSiuQ27kCs5fP+y/QdjZQ2A5Ov3AIqYb1rEsCFAgBoO1giLAZRAASUPlbIeR2rsTs5eB0sCEAth5EKsPj4UnAIASAtpNBVQCCA2hpApCE2hdiiAmAA0hl+HyAJFCQ//Bp3PgzOB6u7VzAYwACL+mtBCAJxfdiiAeA/v1INfL5AEmAIASAtrHwRwEEbzXTBCAJtS/EkP/oGdz4I3h7ZgaAR/r34YFGPiAiCRSEANA2Fr4YQPB1EwFIQun/iyEWACruugcVd9+bHBUcjuTmP9eLs9f2nMClALxn0fJKtgKnACyRhRhlN9B7UPRPMsNcj12BKwDmy6KIAoAwFbxyfhqtC6Tj57I4uK5AgY/P/FBs5SsAL8vMRgFAmAo+umYL1hMAmc5G1p8a2YWLf//l+zIzFTzYvAWtlewARioscbJkZBcuGABAmAo+0rwZbZXekBCvuBUIAaBtLFwYCiUAcZd9zv/S7G6cv37V/w8zABxu3ox2doBEUGAKAGEolAAkovaFIEIAaBsLFwA41LwJHZXeXYFX3Aosy+7G9NwtQBsAwlAoAYi77HP+YwHg4OpN6FzIDpAEDEIAaDsYIkwFH1i9EV0LvU+GvOJWYHl2D6aue98AFy5tAAhDoQQg7rLP+Q8BoO1giADA/tUb0c0OkAgKmkb3IH8t6ADaABCGQglAImpfCCIWAPat2oCeRfzhyCRgEAJA28kgYSj0+1Ub0EsAklB/rBjdi9y1y34s2gAQZgIJQCJqXwgiBIC2o2ECAOsWVKNvkTcjwituBbafGi4OQRsAaQDBc0jiTpr+SyqgDQDvJ8mDPUcWILEK7ATwniy6KCNhns33b/0s6f0yB1yPRYHTAJ4FEDw0sFQUUQGIJSs6Va8AAVCvqVUWCYBV5VIfLAFQr6lVFgmAVeVSHywBUK+pVRYJgFXlUh8sAVCvqVUWCYBV5VIfLAFQr6lVFgmAVeVSHywBUK+pVRYJgFXlUh8sAVCvqVUWCYBV5VIfLAFQr6lVFgmAVeVSHywBUK+pVRYJgFXlUh8sAVCvqVUWCYBV5VIfLAFQr6lVFgmAVeVSHywBUK+pVRYJgFXlUh8sAVCvqVUWCYBV5VIfLAFQr6lVFgmAVeVSH+y/nwbJkETWAfYAAAAASUVORK5CYII=',
    country: 'Russia',
    code: '+7',
    activity: false,
    id: '3'
  },
  {
    icon: base64Icon,
    country: 'IDK',
    code: '+48',
    activity: false,
    id: '4'
  },
  {
    icon: base64Icon,
    country: 'IDK2',
    code: '+483',
    activity: false,
    id: '5'
  },
  {
    icon: base64Icon,
    country: 'IDK3',
    code: '+56',
    activity: false,
    id: '5'
  }
];

class Registration extends React.Component {
  static navigationOptions = () => ({
    header: <BackButton title={I18n.t('BACK')} route="Start" />
  });

  state = {
    phoneNumber: '',
    phone: '',
    invalidCode: false,
    numberNotExists: false,
    step: 1,
    failedSignVisible: false,
    failedConfirmVisible: false,
    errorText: '',
    code: '',
    name: '',
    age: ''
  };

  componentDidMount() {
    this.props.loaderState(false);
  }

  setFailedSignVisible = visible => {
    this.setState({ failedSignVisible: visible });
  };
  setFailedConfirmVisible = visible => {
    this.setState({ failedConfirmVisible: visible });
  };

  login = () => {
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

  setPhone(value) {
    this.setState({ phoneNumber: value });
    this.state.code && value.length === 12
      ? this.setState({ acceptButton: true })
      : this.setState({ acceptButton: false });
  }
  setCode(value) {
    this.setState({ code: value });
    value && this.state.phoneNumber.length === 12
      ? this.setState({ acceptButton: true })
      : this.setState({ acceptButton: false });
  }

  render() {
    return (
      <LinearGradient
        colors={['#FEBF54', '#FB7375', 'rgba(246,34,183,0.48)']}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        style={styles.container}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true}
        />

        <KeyboardAvoidingView behavior="padding" style={styles.grad}>
          <ScrollView
            // scrollEnabled={false}
            contentContainerStyle={styles.scrollView}
          >
            <View>
              <Text>Введите ваш номер телефона</Text>
            </View>
            <SignForm
              data={data}
              value={this.state.phoneNumber}
              setPhoneNumber={value => this.setPhone(value)}
              setCode={value => this.setCode(value)}
            />
            <View>
              <Text>Данный номер уже зарегистрирован</Text>
            </View>
            <View>
              <Text>Давайте познакомимся </Text>
            </View>
            <TextInput
              value={this.state.name}
              onChangeText={value => this.setState({ name: value })}
              placeholder={'name'}
              style={styles.textInput}
            />
            <View>
              <Text>Введите корректное Имя</Text>
            </View>
            <TextInputMask
              style={styles.textInput}
              placeholder={'age'}
              value={this.state.age}
              keyboardType={'numeric'}
              onChangeText={value => this.setState({ age: value })}
              mask={'[00]'}
            />
            <View>
              <Text>Что б я столько жил. Введите настоящий возраст</Text>
            </View>
            <View>
              <Text>HERE WILL BE TWO BUTTONS</Text>
              <Text>HERE WILL BE TWO BUTTONS</Text>
              <Text>HERE WILL BE TWO BUTTONS</Text>
              <Text>HERE WILL BE TWO BUTTONS</Text>
              <Text>HERE WILL BE TWO BUTTONS</Text>
              <Text>HERE WILL BE TWO BUTTONS</Text>
            </View>
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
        {this.props.loader && <ActivityIndicator />}
      </LinearGradient>
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
)(Registration);
