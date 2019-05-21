import React from 'react';
import {
  Platform,
  Text,
  View,
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';
import { Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import CustomPhoto from '../../containers/custom-photo/custom-photo';
import CustomAlert from '../../containers/custom-alert/custom-alert';
import Blur from '../../containers/blur/blur';
//constants
import styles from './styles';
import { colors } from '../../../constants/colors_men';
//redux
import { setBalance } from '../../../reducers/user-balance';
import { setColor } from '../../../reducers/user-color';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUser } from '../../../reducers/profile-state';
import { setProfileVirgin } from '../../../reducers/profile-virgin';
import { loaderState } from '../../../reducers/loader';
//service
import { httpPost } from '../../../services/http';
import { handleError } from '../../../services/http-error-handler';
import { serializeJSON } from '../../../services/serialize-json';
import { urls } from '../../../constants/urls';
import NavigationService from '../../../services/route';
import { TextField } from 'react-native-material-textfield';
import { LinearTextGradient } from 'react-native-text-gradient';
import I18n from '@locales/I18n';

const keyboardVerticalOffset = Platform.OS === 'ios' ? -20 : -10;
class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: {
      username: this.props.navigation.state.params.async_storage_user.user_name,
      photo: this.props.navigation.state.params.async_storage_user
        .user_photo_url,
      phone: this.props.navigation.state.params.async_storage_user.user_phone,
      birthDay: this.props.navigation.state.params.async_storage_user
        .user_birthDay,
      sex: this.props.navigation.state.params.async_storage_user.user_sex,
      currency: this.props.navigation.state.params.async_storage_user
        .user_currency
    },
    modalVisible: false,
    exitVisible: false,
    datePickerVisible: false,
    rejectedRequestModal: false,
    changed: false,
    errorText: 'error'
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
  setDatePickerVisible = visible => {
    this.setState({
      datePickerVisible: visible
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
    if (
      !this.state.user.username ||
      this.props.birthday === '' ||
      !this.state.user.photo
    ) {
      this.setModalVisible(true);
    } else {
      this.props.loaderState(true);
      this.setRejectVisible(false);
      let body = {
        name: this.state.user.username,
        sex: this.state.user.sex,
        birthDay: this.props.birthday,
        photo: 'data:image/jpeg;base64,' + this.state.user.photo
      };
      httpPost(
        urls.edit_profile_data,
        serializeJSON(body),
        this.props.token,
        true
      ).then(
        result => {
          this.props.setBalance(result.body.balance.amount);
          this.props.setProfileVirgin(false);
          this.setRejectVisible(false);
          let user = {
            name: this.state.user.username,
            photo: this.state.user.photo,
            sex: this.state.user.sex,
            birthDay: this.props.birthday,
            phone: this.state.user.phone,
            currency: this.state.user.currency
          };
          if (user.sex) {
            this.props.setColor(true);
          } else {
            this.props.setColor(false);
          }
          this.props.saveUser(user);
          NavigationService.navigate('Main');
        },
        error => {
          let error_respons = handleError(
            error,
            body,
            urls.edit_profile_data,
            this.props.token,
            this.constructor.name,
            'SubmitEdit'
          );
          this.setState({ errorText: error_respons.error_text });
          this.setRejectVisible(error_respons.error_modal);
          this.props.loaderState(false);
        }
      );
    }
  };
  ClearName = () => {
    let user = { ...this.state.user };
    user.username = '';
    this.setState({ user, changed: true });
  };
  ClearBirthDay = () => {
    let user = { ...this.state.user };
    user.birthDay = '';
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
      title: I18n.t('PROFILE_PAGE.CHOOSE_AVATAR'),
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      takePhotoButtonTitle: 'Сделать фото',
      chooseFromLibraryButtonTitle: 'Выбрать из галереи',
      cancelButtonTitle: 'Отмена',
      quality: Platform.OS === 'ios' ? 0.75 : 1
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let source = { uri: response.data };
        let user = { ...this.state.user };
        user.photo = source.uri;
        this.setState({ user, changed: true });
      }
    });
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.changed) {
        this.Exit();
      } else {
        NavigationService.navigate('Main');
      }
      return true;
    });
  }
  onDateSelected(date) {
    // do something
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container} />
        {(this.state.modalVisible ||
          this.state.exitVisible ||
          this.state.rejectedRequestModal) && <Blur />}
        <View style={styles.user_edit_header_container}>
          <CustomAlert
            datepicker
            first_btn_title={I18n.t('PROFILE_PAGE.ACCEPT')}
            visible={this.state.datePickerVisible}
            first_btn_handler={() =>
              this.setDatePickerVisible(!this.state.datePickerVisible)
            }
            decline_btn_handler={() =>
              this.setDatePickerVisible(!this.state.datePickerVisible)
            }
          />
          <CustomAlert
            title={I18n.t('PROFILE_PAGE.ALERT_NOT_SAVED_DATA')}
            first_btn_title={I18n.t('PROFILE_PAGE.YES')}
            second_btn_title={I18n.t('PROFILE_PAGE.NO')}
            visible={this.state.exitVisible}
            second_btn_handler={() =>
              this.setExitVisible(!this.state.exitVisible)
            }
            first_btn_handler={() => NavigationService.navigate('Main')}
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
                label={I18n.t('NAMES')}
                placeholder={I18n.t('ENTER_NAME')}
                tintColor={this.props.userColor.black41_09}
                baseColor={this.props.userColor.black41_09}
                textColor={this.props.userColor.black}
                fontSize={20}
                labelFontSize={12}
                onChangeText={text => {
                  this.ChangeUserName(text);
                }}
                value={this.state.user.username}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                onFocus={() => {
                  this.ClearName();
                }}
              />
              <Button
                transparent
                style={styles.datepicker_button}
                onPress={() => {
                  this.setDatePickerVisible(!this.state.datePickerVisible);
                }}
              >
                <Text style={styles.datepicker_button_title}>
                  {I18n.t('PROFILE_PAGE.BIRTHDAY')}
                </Text>
                <Text style={styles.datepicker_button_label}>
                  {this.props.birthday != ''
                    ? this.props.birthday
                    : I18n.t('PROFILE_PAGE.ENTER_BIRTHDAY')}
                </Text>
              </Button>

              <Text style={styles.title}>{I18n.t('PROFILE_PAGE.SEX')}</Text>
              <View style={styles.sex_picker}>
                <Button
                  transparent
                  block
                  rounded
                  style={styles.sex_btn}
                  onPress={() => {
                    this.ChangeUserSex(1);
                  }}
                >
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={
                      this.state.user.sex == 1
                        ? [
                            this.props.userColor.first_gradient_color,
                            this.props.userColor.second_gradient_color
                          ]
                        : [
                            this.props.userColor.black41_09,
                            this.props.userColor.black41_09
                          ]
                    }
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 0.7, y: 1.0 }}
                    style={styles.title}
                  >
                    {I18n.t('MALE_SEX')}
                  </LinearTextGradient>
                </Button>
                <LinearTextGradient
                  locations={[0, 1]}
                  colors={[
                    this.props.userColor.first_gradient_color,
                    this.props.userColor.second_gradient_color
                  ]}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 0.7, y: 1.0 }}
                  style={styles.title}
                >
                  {' '}
                  /{' '}
                </LinearTextGradient>
                <Button
                  transparent
                  block
                  rounded
                  style={styles.sex_btn}
                  onPress={() => {
                    this.ChangeUserSex(0);
                  }}
                >
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={
                      this.state.user.sex == 0
                        ? [
                            this.props.userColor.first_gradient_color,
                            this.props.userColor.second_gradient_color
                          ]
                        : [
                            this.props.userColor.black41_09,
                            this.props.userColor.black41_09
                          ]
                    }
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 0.7, y: 1.0 }}
                    style={styles.title}
                  >
                    {I18n.t('FEMALE_SEX')}
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
            title={I18n.t('PROFILE_PAGE.ACCEPT').toUpperCase()}
            color={this.props.userColor.white}
            handler={() => this.SubmitEdit()}
          />
          <CustomButton
            style={styles.btn}
            active
            short
            bordered
            title={I18n.t('PROFILE_PAGE.DECLINE_2').toUpperCase()}
            color={this.props.userColor.pink_blue}
            handler={() =>
              this.state.changed
                ? this.Exit()
                : NavigationService.navigate('Main')
            }
          />
        </View>
        <CustomAlert
          title={I18n.t('PROFILE_PAGE.ALERT_EMPTY')}
          first_btn_title={I18n.t('OK')}
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
          first_btn_title={I18n.t('REPEAT')}
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
  userColor: state.userColor,
  loader: state.loader,
  birthday: state.birthday
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveUser,
      loaderState,
      setColor,
      setProfileVirgin,
      setBalance
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);
