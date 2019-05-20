import React from 'react';
import {
  View,
  Text,
  AppState,
  Platform,
  AsyncStorage
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'native-base';
import CookieManager from 'react-native-cookies';
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { urls } from '../../../constants/urls';
//services
import NavigationService from './../../../services/route';
import InstagramLogin from '../../../services/Instagram';
import { formatItem } from '../../../services/format-hastags';
import { httpPost } from '../../../services/http';
import { convertToBase64 } from '../../../services/convert-to-base64';
import { postToSocial } from '../../../services/post-to-social';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loaderState } from '../../../reducers/loader';
import { setInstaToken } from '../../../reducers/insta-token';
import { setAppState } from '../../../reducers/app-state';
import { setBalance } from '../../../reducers/user-balance';
import CustomButton from '../../containers/custom-button/custom-button';
import ActivityIndicator from '../../containers/activity-indicator/activity-indicator';
import CustomAlert from '../../containers/custom-alert/custom-alert';
import I18n from '@locales/I18n';

class EarnMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      modalVisible: false,
      errorVisible: false,
      userCount: 0,
      currency: ''
    };
  }
  componentDidMount = () => {
    this.props.loaderState(false);
    AppState.addEventListener('change', this._handleAppStateChange);
    AsyncStorage.getItem('user_info').then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency });
    });
  };
  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  skip = () => {
    this.props.loaderState(false);
    NavigationService.navigate('Main');
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
  connectInsta = instagram_token => {
    this.props.loaderState(true);
    let body = JSON.stringify({
      instagram_token: instagram_token
    });
    httpPost(urls.insta_login, body, this.props.token).then(
      result => {
        if (result.status === 200) {
          this.props.setInstaToken(String(instagram_token));
          this.shareToInsta();
        } else if (result.status == 201) {
          CookieManager.clearAll().then(res => {
            this.setModalVisible(true);
            this.setState({ userCount: result.body.subsc_needed });
          });
        } else {
          CookieManager.clearAll().then(res => {
            this.setErrorVisible(true);
          });
        }
        this.props.loaderState(false);
      },
      error => {
        CookieManager.clearAll().then(res => {
          this.props.loaderState(false);
        });
      }
    );
  };

  shareToInsta = () => {
    let new_insta_data = this.props.navigation.state.params.insta_data;
    this.props.loaderState(true);
    if (new_insta_data.video && Platform.OS === 'ios') {
      postToSocial(
        this.props.navigation.state.params.insta_data,
        'https://www.instagram.com/epocketapp/',
        this.confirmPost,
        new_insta_data.video
      );
    } else {
      convertToBase64(new_insta_data.img_url).then(result => {
        new_insta_data.base64 = 'data:image/jpg;base64,' + result;
        postToSocial(
          this.props.navigation.state.params.insta_data,
          'https://www.instagram.com/epocketapp/',
          this.confirmPost
        );
      });
    }
  };

  confirmPost = () => {
    this.props.loaderState(true);
    let body = JSON.stringify({
      id: this.props.navigation.state.params.insta_data.id
    });
    httpPost(urls.insta_getmedia, body, this.props.token).then(
      result => {
        this.props.setBalance(result.body.media.status.balance);
        this.skip();
      },
      error => {
        this.skip();
      }
    );
  };

  earnMore = () => {
    if (!this.props.insta_token) {
      this.refs.instagramLogin.show();
    } else {
      this.shareToInsta();
    }
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      Platform.OS === 'android' && this.confirmPost();
    }
    this.setState({ appState: nextAppState });
  };

  render = () => {
    return (
      <View style={styles.container}>
        {this.props.loader && <ActivityIndicator />}
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
          onLoginFailure={data => {}}
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
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image_template}
          source={{
            uri: this.props.navigation.state.params.insta_data.img_watermark
          }}
        />
        <View style={styles.success}>
          <Text style={[styles.more_money, styles.text_common]}>
            {I18n.t('MISSION.MORE_MONEY', { currency: this.state.currency })}
          </Text>
          <Text style={[styles.more_text, styles.text_common]}>
            {I18n.t('MISSION.MORE_TEXT')}
          </Text>
          <Text style={[styles.more_deck, styles.text_common]}>
            {I18n.t('MISSION.MORE_DESC')}
          </Text>
          <CustomButton
            style={styles.earn_more_btn}
            active
            short
            title={I18n.t('MISSION.EARN_MORE').toUpperCase()}
            color={this.props.userColor.pink_blue}
            handler={() => {
              this.earnMore();
            }}
          />
          <Button
            rounded
            transparent
            block
            style={styles.skip_button}
            androidRippleColor={this.props.userColor.card_shadow}
            onPress={() => {
              this.skip();
            }}
          >
            <Text style={styles.text}>{I18n.t('MISSION.SKIP')}</Text>
          </Button>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  loader: state.loader,
  token: state.token,
  insta_token: state.insta_token,
  userColor: state.userColor,
  insta_post: state.insta_post,
  appState: state.appState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState,
      setInstaToken,
      setAppState,
      setBalance
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EarnMore);
