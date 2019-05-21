import React from 'react';
import { View, Text, AppState, Image, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import CookieManager from 'react-native-cookies';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from '../../../reducers/game-status';
import { setInstaToken } from '../../../reducers/insta-token';
import { loaderState } from '../../../reducers/loader';
import { setAppState } from '../../../reducers/app-state';
import { getGameInfo } from '../../../reducers/game-info';
import {
  setGameExpiredTimer,
  launchGameExpiredTimer,
  shutDownExpiredTimer
} from '../../../reducers/game-expired-timer';
import { errorState } from '../../../reducers/game-error';
import { checkForPostStatus } from '../../../reducers/post-status';
import { setWebSiteTimer } from '../../../reducers/website-timer';
//constants
import styles from './styles';
import { urls } from '../../../constants/urls';
//containers
import GameTimer from '../../containers/game-timer/game-timer';
import CustomButton from '../../containers/custom-button/custom-button';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
import CustomAlert from '../../containers/custom-alert/custom-alert';
import BrandWebsite from '../../containers/brand-website/brand-website';
//services
import '../../../services/correcting-interval';
import { toHHMMSS } from './../../../services/convert-time';
import InstagramLogin from '../../../services/Instagram';
import { httpPost } from '../../../services/http';
import { postToSocial } from '../../../services/post-to-social';
import I18n from '@locales/I18n';
// import console = require('console');

class GameStart extends React.Component {
  state = {
    interval: null,
    modalVisible: false,
    errorVisible: false,
    buttonActive: true,
    userCount: 0,
    website_visible: false,
    intervalWebsite: null,
    brand_title: ' '
  };
  setModalVisible = visible => {
    this.setState({
      modalVisible: visible
    });
  };
  setErrorVisible = visible => {
    this.setState({
      errorVisible: visible
    });
  };
  startTimer = () => {
    this.setState({
      interval: setCorrectingInterval(() => {
        if (this.props.game_expired_timer <= 1) {
          clearCorrectingInterval(this.state.interval);
          this.props.getGameInfo(
            this.props.token,
            this.props.location.lat,
            this.props.location.lng
          );
          this.props.setGameStatus('start');
        }
        this.props.setGameExpiredTimer(this.props.game_expired_timer - 1);
      }, 1000)
    });
  };



  _handleAppStateChange = nextAppState => {
    // if (nextAppState === 'background') {
    //   this.closeBrandWebSite();
    // }
    if (
      (this.props.appState === 'background' ||
        this.props.appState === 'inactive') &&
      nextAppState === 'active'
    ) {
      if (!this.props.game_expired_img.game_link) {
        clearCorrectingInterval(this.state.interval);
        this.props.launchGameExpiredTimer(this.props.token);
        this.startTimer();
      } else {
        this.closeBrandWebSite();
      }
    }
    this.props.setAppState(nextAppState);
  };





  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    if (!this.props.game_expired_img.game_link) {
      clearCorrectingInterval(this.state.interval);
      this.props.launchGameExpiredTimer(this.props.token);
      this.startTimer();
    }
  };
  componentWillUnmount = () => {
    clearCorrectingInterval(this.state.interval);
    AppState.removeEventListener('change', this._handleAppStateChange);
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
    if (this.props.game_expired_img.id) {
      setTimeout(() => {
        this.props.checkForPostStatus(
        this.props.game_expired_img.id,
        this.props.token,
        this.props.location.lat,
        this.props.location.lng,
        this.props.game_expired_timer)
      }, 5000 )
      if (this.props.postStatus)
        this.props.shutDownExpiredTimer(
          this.props.token,
          this.props.game_expired_img.id,
          this.props.location.lat,
          this.props.location.lng
        );
    }
  };
  shareToInsta = () => {
    this.props.loaderState(true);
    if (Platform.OS === 'ios') {
      postToSocial(
        this.props.game_expired_img,
        'https://www.instagram.com/epocketapp/',
        this.confirmPost,
        this.props.game_expired_img.video
      );
    } else {
      postToSocial(
        this.props.game_expired_img,
        'https://www.instagram.com/epocketapp/',
        this.confirmPost
      );
    }
  };
  startTimerWebsite = () => {
    this.setState({
      intervalWebsite: setCorrectingInterval(() => {
        if (this.props.game_info.wait_timer_in_sec <= 1) {
          clearCorrectingInterval(this.state.intervalWebsite);
        }
        this.props.setWebSiteTimer(this.props.game_info.wait_timer_in_sec);
      }, 1000)
    });
  };
  openWebSite = () => {
    this.startTimerWebsite();
  };
  closeBrandWebSite = () => {
    this.props.loaderState(true);
    setTimeout(() => {
      this.setState({ website_visible: false });
      clearCorrectingInterval(this.state.intervalWebsite);
      this.props.setWebSiteTimer(this.props.game_info.wait_timer_in_sec);
    }, 1500);
  };
  loadNextGame = () => {
    this.closeBrandWebSite();
    this.props.shutDownExpiredTimer(
      this.props.token,
      this.props.game_expired_img.id,
      this.props.location.lat,
      this.props.location.lng
    );
  };
  openPartnersInfoPage = () => {
    this.setState({
      website_visible: true,
      brand_title: this.props.game_expired_img.brand_name
        ? this.props.game_expired_img.brand_name
        : '',
      brand_link: this.props.game_expired_img.game_link
        ? this.props.game_expired_img.game_link
        : 'http://epocket.dev.splinestudio.com/'
    });
  };
  render() {
    return (
      <View style={styles.main_view}>
        <BrandWebsite
          visible={this.state.website_visible}
          brand_title={this.state.brand_title}
          brand_link={this.state.brand_link}
          closeBrandWebSite={() => this.closeBrandWebSite()}
          startTimer={() => this.openWebSite()}
          continue={() => {
            this.loadNextGame();
          }}
        />
        <CustomAlert
          title={I18n.t('PROFILE_PAGE.ALREADY_ACCOUNT')}
          first_btn_title={I18n.t('OK')}
          visible={this.state.errorVisible}
          first_btn_handler={() => this.connectInsta(this.props.insta_token)}
          decline_btn_handler={() =>
            this.setErrorVisible(!this.state.errorVisible)
          }
        />
        <CustomAlert
          title={I18n.t('PROFILE_PAGE.NOT_ENOUGHT_SUB')}
          subtitle={this.state.userCount + I18n.t('PROFILE_PAGE.SUBS')}
          first_btn_title={I18n.t('OK')}
          visible={this.state.modalVisible}
          first_btn_handler={() => this.connectInsta(this.props.insta_token)}
          decline_btn_handler={() =>
            this.setModalVisible(!this.state.modalVisible)
          }
        />
        <CustomAlert
          title={this.props.game_error.error_text}
          first_btn_title={I18n.t('REPEAT')}
          visible={this.props.game_error.error_modal}
          first_btn_handler={() => {
            this.props.launchGameExpiredTimer(this.props.token);
            this.props.errorState({
              error_text: this.props.game_error.error_text,
              error_modal: !this.props.game_error.error_modal
            });
            this.startTimer();
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
          onLoginSuccess={token => this.connectInsta(token)}
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
        {this.props.game_expired_img.game_link ? (
          <View style={[styles.main_view_secondary, { paddingBottom: 80 }]}>
            <View style={styles.background_grey} />
            <View style={styles.container_zifi_lock}>
              <Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.FAILED')}</Text>
              <Image
                style={styles.zifi}
                source={require('../../../assets/img/zifi/grimaces.gif')}
              />
            </View>
            <View style={styles.image_to_post_container}>
              <FastImage
                style={styles.image_to_post}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: this.props.game_expired_img.img
                }}
              />
            </View>
            <View style={styles.button_container}>
              <CustomButton
                active={
                  this.props.game_error.error_text === '' &&
                  this.props.game_expired_img.id &&
                  this.state.buttonActive
                    ? true
                    : false
                }
                gradient
                instaLogo={true}
                title={I18n.t('GAME.RESULT.PUBLISH_AND_CONTINUE').toUpperCase()}
                color={this.props.userColor.white}
                handler={() => {
                  this.goInst();
                }}
              />
              <CustomButton
                style={styles.visit_site_btn}
                active={
                  this.props.game_error.error_text === '' &&
                  this.props.game_expired_img.id &&
                  this.state.buttonActive
                    ? true
                    : false
                }
                title={I18n.t('GAME.RESULT.VISIT_WEBSITE').toUpperCase()}
                color={this.props.userColor.black}
                border
                transparent
                handler={() => {
                  this.openPartnersInfoPage();
                }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.main_view_secondary}>
            <View style={styles.background_grey} />
            <View style={styles.container_zifi_lock}>
              <Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.WAIT')}</Text>
              <Image
                style={styles.zifi}
                source={require('../../../assets/img/zifi/surprised.gif')}
              />
            </View>
            <GameTimer
              minutes={toHHMMSS(this.props.game_expired_timer).split(':')[0]}
              seconds={toHHMMSS(this.props.game_expired_timer).split(':')[1]}
            />
            <View style={styles.image_to_post_container}>
              <FastImage
                style={styles.image_to_post}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: this.props.game_expired_img.img
                }}
              />
            </View>
            <View style={styles.btn_container}>
              <CustomButton
                active={
                  this.props.game_error.error_text === '' &&
                  this.props.game_expired_img.id &&
                  this.state.buttonActive
                    ? true
                    : false
                }
                gradient
                instaLogo={true}
                title={I18n.t('GAME.RESULT.PUBLISH_AND_CONTINUE').toUpperCase()}
                color={this.props.userColor.white}
                handler={() => {
                  this.goInst();
                }}
              />
            </View>
          </View>
        )}
        <FooterNavigation />
      </View>
    );
  }
}
//
const mapStateToProps = state => {
  return {
    game_info: state.game_info,
    game_expired_timer: state.game_expired_timer,
    userColor: state.userColor,
    token: state.token,
    appState: state.appState,
    loader: state.loader,
    location: state.location,
    insta_token: state.insta_token,
    game_error: state.game_error,
    game_expired_img: state.game_expired_img,
    postStatus: state.postStatus,
    website_timer: state.website_timer
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setGameStatus,
      setGameExpiredTimer,
      launchGameExpiredTimer,
      setAppState,
      setWebSiteTimer,
      shutDownExpiredTimer,
      loaderState,
      errorState,
      setInstaToken,
      getGameInfo,
      checkForPostStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStart);
