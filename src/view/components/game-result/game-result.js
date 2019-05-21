import React from 'react';
import {
  View,
  Text,
  Platform,
  AppState,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'native-base';
import CookieManager from 'react-native-cookies';
import RNFS from 'react-native-fs';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from '../../../reducers/game-status';
import { loaderState } from '../../../reducers/loader';
import { setInstaToken } from '../../../reducers/insta-token';
import { setAppState } from '../../../reducers/app-state';
import { launchGameExpiredTimer } from '../../../reducers/game-expired-timer';
import { errorState } from '../../../reducers/game-error';
import { setFixedTime } from '../../../reducers/fixedTime';
import { setTempTime } from '../../../reducers/tempTime';
import { setGameInfo, getGameInfo } from '../../../reducers/game-info';
import { checkForPostStatus } from '../../../reducers/post-status';
import { setWebSiteTimer } from '../../../reducers/website-timer';
//constants
import styles from './styles';
import { colors } from '../../../constants/colors';
import { ICONS } from '../../../constants/icons';
import { urls } from '../../../constants/urls';
//services
import '../../../services/correcting-interval';
import NavigationService from './../../../services/route';
import { convertToBase64 } from './../../../services/convert-to-base64';
import InstagramLogin from '../../../services/Instagram';
import { httpPost, httpGet } from '../../../services/http';
import { handleError } from '../../../services/http-error-handler';
import { postToSocial } from '../../../services/post-to-social';
//containers
import CustomAlert from '../../containers/custom-alert/custom-alert';
import CustomButton from '../../containers/custom-button/custom-button';
import ActivityIndicator from '../../containers/activity-indicator/activity-indicator';
import BrandWebsite from '../../containers/brand-website/brand-website';
import { PermissionsAndroid } from 'react-native';
import I18n from '@locales/I18n';
// import console = require('console');

class GameResult extends React.Component {
  state = {
    modalVisible: false,
    errorVisible: false,
    website_visible: false,
    cantPostToInsta: false,
    userCount: 0,
    buttonActive: true,
    interval: null,
    filePath: '',
    currency: '',
    wait_timer_in_sec: 0
  };
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.setGameStatus(this.props.navigation.state.params.status);
    AsyncStorage.getItem('user_info').then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency });
    });
  };
  startTimer = () => {
    this.props.setWebSiteTimer(this.props.game_info.wait_timer_in_sec);
    const interval = setCorrectingInterval(() => {
      if (this.props.website_timer <= 0) {
        clearCorrectingInterval(this.state.interval);
      } else {
        if (this.props.game_info.wait_timer_in_sec > 0) {
          this.props.setWebSiteTimer(this.props.game_info.wait_timer_in_sec--);
        }
      }
    }, 1000);

    this.setState({ interval: interval });
  };
  setErrorVisible = visible => {
    this.setState({
      errorVisible: visible
    });
  };
  setModalVisible = visible => {
    this.setState({
      modalVisible: visible
    });
  };
  checkForGames = next_navigation => {
    this.props.loaderState(true);
    httpGet(
      urls.game_get +
        '?coords=' +
        this.props.location.lat +
        '%2C' +
        this.props.location.lng,
      this.props.token
    ).then(
      result => {
        let game = result.body;
        if (game.ticker === false && !game.game_set) {
          //this.goLock();
          this.props.getGameInfo(
            this.props.token,
            this.props.location.lat,
            this.props.location.lng
          );
        } else {
          switch (next_navigation) {
            case 'insta':
              this.goInst();
              this.props.loaderState(true);
              break;
            case 'home':
              this.goHome();
              // this.props.loaderState(false);
              break;
            case 'visit_website':
              this.openWebSiteInfo();
              this.props.loaderState(false);
              break;
            case 'wait':
              this.goWait();
              this.props.loaderState(false);
              break;
            default:
              this.props.loaderState(false);
              break;
          }
        }
      },
      error => {
        if (error.code === 400) {
          let info = {
            description: '...',
            cost: '0',
            title: '',
            success_image: ICONS.FILLER,
            no_more_games: true,
            time: 0,
            available_game_len: 0,
            total_game_len: 0,
            true_answer: [],
            video: false,
            wait_timer: 0,
            brand_title: '',
            insta_data: {}
          };
          this.props.setGameInfo(info);
          this.props.loaderState(false);
          NavigationService.navigate('Main');
          this.props.setGameStatus('start');
        } else {
          let error_response = handleError(
            error,
            {},
            urls.game_get +
              '?coords=' +
              this.props.location.lat +
              '%2C' +
              this.props.location.lng,
            this.props.token,
            this.component.name,
            'checkForGames'
          );
          this.props.errorState(error_response);
          this.props.loaderState(false);
        }
      }
    );
  };
  goInst = () => {
    this.setState({ buttonActive: false });
    if (!this.props.insta_token) {
      this.refs.instagramLogin.show();
    } else {
      this.shareToInsta();
    }
    setTimeout(() => {
      this.setState({ buttonActive: true });
    }, 5000);
  };

  goLock = () => {
    NavigationService.navigate('Main');
    setTimeout(() => {
      this.props.setGameStatus('lock');
    }, 0);
  };
  openWebSiteInfo = () => {
    this.setState({ website_visible: true });
  };
  openWebSite = () => {
    this.startTimer();
  };
  closeBrandWebSite = () => {
    this.props.loaderState(true);
    setTimeout(() => {
      this.setState({ website_visible: false });
      clearCorrectingInterval(this.state.interval);
      this.props.setWebSiteTimer(this.props.game_info.wait_timer_in_sec);
    }, 1500);
  };
  goWait = () => {
    NavigationService.navigate('Main');
    if (this.props.game_info.id) {
      this.props.launchGameExpiredTimer(
        this.props.token,
        this.props.game_info.id
      );
      setTimeout(() => {
        this.props.setGameStatus('expired');
      }, 0);
    } else {
      this.setErrorVisible(true);
    }
  };
  goHome = () => {
    this.props.getGameInfo(
      this.props.token,
      this.props.location.lat,
      this.props.location.lng
    );
    setTimeout(() => {
      NavigationService.navigate('Main');
      this.props.setGameStatus('start');
    }, 500);
  };
  connectInsta = instagram_token => {
    this.props.loaderState(true);
    let body = JSON.stringify({
      instagram_token: instagram_token
    });
    httpPost(urls.insta_login, body, this.props.token).then(
      result => {
        if (result.status === 200) {
          this.props.setInstaToken(String(instagram_token));
          this.props.loaderState(false);
          this.shareToInsta();
        } else if (result.status == 201) {
          CookieManager.clearAll().then(res => {
            this.setModalVisible(true);
            this.props.loaderState(false);
            this.setState({ userCount: result.body.subsc_needed });
          });
        } else {
          CookieManager.clearAll().then(res => {
            this.setErrorVisible(true);
            this.props.loaderState(false);
          });
        }
      },
      error => {
        CookieManager.clearAll().then(res => {
          this.props.loaderState(false);
        });
      }
    );
  };
  confirmPost = () => {
    setTimeout(() => {
      this.props.checkForPostStatus(
      this.props.game_info.id,
      this.props.token,
      this.props.location.lat,
      this.props.location.lng)
    }, 5000)
    this.setState({ buttonActive: true });
  };

  shareToInsta = () => {
    this.props.loaderState(true);
    if (Platform.OS === 'ios') {
      postToSocial(
        this.props.navigation.state.params.insta_data,
        'https://www.instagram.com/epocketapp/',
        this.confirmPost,
        this.props.navigation.state.params.insta_data.video
      );
    } else {
      requestWriteExternalStoragePermission().then(granted => {
        if (granted) {
          postToSocial(
            this.props.navigation.state.params.insta_data,
            'https://www.instagram.com/epocketapp/',
            this.confirmPost
          );
        } else {
          this.setState({
            cantPostToInsta: true
          });
        }
      });
    }
  };




  _handleAppStateChange = nextAppState => {
    // if (nextAppState === 'background') {
    //   this.closeBrandWebSite();
    //   console.log("this.state.wait_timer_in_sec")
    // }

    if (this.props.navigation.state.params.status != 'success') {
      this.goWait();
    }

    this.props.setAppState(nextAppState);
  };






  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  chooseZifiText = status => {
    let text;
    if (status === 'success') {
      text = I18n.t('GAME.ZIFI.SHOCKED');
    } else if (status === 'failed') {
      text = I18n.t('GAME.ZIFI.FAILED');
    } else if (status === 'expired') {
      text = I18n.t('GAME.ZIFI.TOO_LONG');
    } else {
      text = '';
    }
    return text;
  };
  chooseZifi = status => {
    let zifi;
    if (status === 'success') {
      zifi = require('../../../assets/img/zifi/shocked.gif');
    } else if (status === 'failed') {
      zifi = require('../../../assets/img/zifi/grimaces.gif');
    } else if (status === 'expired') {
      zifi = require('../../../assets/img/zifi/bored.gif');
    } else {
      zifi = require('../../../assets/img/zifi/shocked.gif');
    }
    return zifi;
  };
  chooseZifiCloud = status => {
    let zifiCloud, style;
    if (status === 'success') {
      zifiCloud = ICONS.ZIFI.CLOUD_1_TRANSPARENT;
      style = styles.zifi_cloud_success;
    } else if (status === 'failed') {
      zifiCloud = ICONS.ZIFI.CLOUD_2_TRANSPARENT;
      style = styles.zifi_cloud_failed;
    } else if (status === 'expired') {
      zifiCloud = ICONS.ZIFI.CLOUD_2_TRANSPARENT;
      style = styles.zifi_cloud_failed;
    } else {
      zifiCloud = ICONS.ZIFI.CLOUD_1_TRANSPARENT;
      style = styles.zifi_cloud_success;
    }
    return { zifiCloud, style };
  };
  chooseResultText = status => {
    let text;
    let style;
    if (status === 'success') {
      text =
        I18n.t('GAME.RESULT.CONGRATS') +
        '\n' +
        I18n.t('GAME.RESULT.YOU_WON') +
        ' ' +
        this.props.game_info.cost +
        ' ' +
        I18n.t('EPC', { currency: this.state.currency }).toUpperCase();
      style = styles.congratulation;
    } else if (status === 'failed' || status === 'expired') {
      text = '';
      style = styles.fail_text;
    } else {
      text = '';
      style = styles.congratulation;
    }
    return { text, style };
  };
  chooseButtonText = status => {
    let text;
    if (status === 'success') {
      text = I18n.t('GAME.RESULT.CONTINUE').toLocaleUpperCase();
    } else if (status === 'failed' || status === 'expired') {
      text = I18n.t('GAME.RESULT.PUBLISH_AND_CONTINUE').toLocaleUpperCase();
    } else {
      text = '';
    }
    return text;
  };
  chooseBackground = status => {
    let img, style;
    if (status === 'success') {
      img = require('../../../assets/img/ANIMATED_EARN_MORE.gif');
      style = styles.image;
    } else {
      img = {
        uri: this.props.navigation.state.params.insta_data.success_image,
        priority: FastImage.priority.high
      };
      style = styles.image_failed;
    }
    return { img, style };
  };

  render() {
    return (
      <View style={styles.container}>
        <BrandWebsite
          visible={this.state.website_visible}
          brand_title={this.props.game_info.brand_title}
          closeBrandWebSite={() => this.closeBrandWebSite()}
          interval={this.state.interval}
          startTimer={() => this.openWebSite()}
          continue={() => {
            this.closeBrandWebSite();
            this.checkForGames('home');
          }}
          stopTimer={() => {
            clearCorrectingInterval(this.state.interval);
          }}
        />
        {this.props.loader && <ActivityIndicator />}
        <CustomAlert
          title={I18n.t('GAME.RESULT.CANT_POST')}
          first_btn_title={I18n.t('OK')}
          visible={this.state.cantPostToInsta}
          first_btn_handler={() =>
            this.setErrorVisible(!this.state.cantPostToInsta)
          }
          decline_btn_handler={() =>
            this.setErrorVisible(!this.state.cantPostToInsta)
          }
        />
        <CustomAlert
          title={I18n.t('PROFILE_PAGE.ALREADY_ACCOUNT')}
          first_btn_title={I18n.t('OK')}
          visible={this.state.errorVisible}
          first_btn_handler={() =>
            this.setErrorVisible(!this.state.errorVisible)
          }
          decline_btn_handler={() =>
            this.setErrorVisible(!this.state.errorVisible)
          }
        />
        <CustomAlert
          title={I18n.t('PROFILE_PAGE.NOT_ENOUGHT_SUB')}
          subtitle={this.state.userCount + I18n.t('PROFILE_PAGE.SUBS')}
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
          title={this.props.game_error.error_text}
          first_btn_title={I18n.t('REPEAT')}
          visible={this.props.game_error.error_modal}
          first_btn_handler={() => {
            this.props.launchGameExpiredTimer(
              this.props.token,
              this.props.game_info.id
            );
            this.props.errorState({
              error_text: this.props.game_error.error_text,
              error_modal: !this.props.game_error.error_modal
            });
          }}
          decline_btn_handler={() => {
            this.props.errorState({
              error_text: this.props.game_error.error_text,
              error_modal: !this.props.game_error.error_modal
            });
          }}
        />
        <InstagramLogin
          ref="instagramLogin"
          clientId="7df789fc907d4ffbbad30b7e25ba3933"
          redirectUrl="https://epocket.dev.splinestudio.com"
          scopes={[
            'basic',
            'public_content',
            'likes',
            'follower_list',
            'comments',
            'relationships'
          ]}
          onLoginSuccess={token => {
            this.connectInsta(token);
          }}
          onLoginFailure={data => {
            let token = data.next.split('#access_token=')[1];
            this.connectInsta(token);
          }}
        />
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image_background}
          source={require('../../../assets/img/ANIMATED_EARN_MORE.gif')}
        />
        <LinearGradient
          colors={this.props.userColor.earn_more}
          start={{ x: 0.0, y: 1.4 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.grad}
        />
        {this.props.navigation.state.params.status !== 'success' ? (
          <View style={styles.background_grey} />
        ) : null}
        <View
          style={
            this.props.navigation.state.params.status === 'success'
              ? styles.success
              : styles.failed
          }
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={
              this.chooseZifiCloud(this.props.navigation.state.params.status)
                .style
            }
            source={{
              uri: this.chooseZifiCloud(
                this.props.navigation.state.params.status
              ).zifiCloud
            }}
          />
          <Text style={styles.zifi_text}>
            {this.chooseZifiText(this.props.navigation.state.params.status)}
          </Text>
          <Image
            //resizeMode={FastImage.resizeMode.contain}
            style={styles.zifi}
            source={this.chooseZifi(this.props.navigation.state.params.status)}
          />
          <Text
            style={
              this.chooseResultText(this.props.navigation.state.params.status)
                .style
            }
          >
            {
              this.chooseResultText(this.props.navigation.state.params.status)
                .text
            }
          </Text>
          {this.props.navigation.state.params.status !== 'success' ? (
            <View style={styles.image_to_post_container}>
              <FastImage
                style={styles.image_to_post}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: this.props.navigation.state.params.insta_data
                    .success_image
                }}
              />
            </View>
          ) : null}
          {this.props.navigation.state.params.status !== 'success' ? (
            <CustomButton
              gradient
              instaLogo={true}
              long_75
              active
              title={this.chooseButtonText(
                this.props.navigation.state.params.status
              )}
              color={this.props.userColor.white}
              style={[
                this.props.navigation.state.params.status === 'success'
                  ? styles.button_short
                  : styles.button
              ]}
              handler={() => {
                this.props.navigation.state.params.status === 'success'
                  ? this.checkForGames('home')
                  : this.checkForGames('insta');
              }}
            />
          ) : (
            <Button
              rounded
              transparent
              block
              style={[
                this.props.navigation.state.params.status === 'success'
                  ? styles.button_short
                  : styles.button
              ]}
              androidRippleColor={this.props.userColor.card_shadow}
              onPress={() => {
                this.props.navigation.state.params.status === 'success'
                  ? this.checkForGames('home')
                  : this.checkForGames('insta');
              }}
            >
              {this.props.navigation.state.params.status != 'success' && (
                <FastImage
                  style={styles.insta_logo}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{
                    uri: ICONS.INSTAGRAM_COLOR_FILLED
                  }}
                />
              )}
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.navigation.state.params.status != 'success'
                        ? this.props.userColor.white
                        : this.props.userColor.pink_blue
                  }
                ]}
              >
                {this.chooseButtonText(
                  this.props.navigation.state.params.status
                )}
              </Text>
            </Button>
          )}
          <Button
            rounded
            transparent
            block
            androidRippleColor={this.props.userColor.card_shadow}
            style={[
              styles.wait_button,
              this.props.navigation.state.params.status == 'success' && {
                display: 'none'
              }
            ]}
            onPress={() => {
              this.props.game_info.website_link
                ? this.checkForGames('visit_website')
                : this.checkForGames('wait');
            }}
          >
            <Text style={styles.fail}>
              {this.props.game_info.website_link
                ? I18n.t('GAME.RESULT.VISIT_WEBSITE').toUpperCase()
                : this.props.game_info.wait_timer_in_sec < 60
                ? // show time in seconds
                  I18n.t('GAME.RESULT.WAIT_').toUpperCase() +
                  this.props.game_info.wait_timer_in_sec +
                  I18n.t('GAME.RESULT.SEC').toUpperCase()
                : // show time in minutes
                  I18n.t('GAME.RESULT.WAIT_').toUpperCase() +
                  this.props.game_info.wait_timer +
                  I18n.t('GAME.RESULT.MIN').toUpperCase()}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

async function requestWriteExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      const writeRequest = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (writeRequest === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}

const mapStateToProps = state => {
  return {
    game_info: state.game_info,
    game_status: state.game_status,
    token: state.token,
    userColor: state.userColor,
    game_error: state.game_error,
    appState: state.appState,
    insta_token: state.insta_token,
    loader: state.loader,
    location: state.location,
    postStatus: state.postStatus,
    website_timer: state.website_timer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setGameStatus,
      launchGameExpiredTimer,
      loaderState,
      setFixedTime,
      setGameInfo,
      setTempTime,
      setWebSiteTimer,
      errorState,
      setAppState,
      setInstaToken,
      getGameInfo,
      checkForPostStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameResult);
