import React from "react";
import { View, Text, Image, StatusBar, Clipboard, AppState, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button, Toast } from "native-base";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { RU } from "./../../../locales/ru";
import { urls } from "../../../constants/urls";
//services
import NavigationService from "./../../../services/route";
import InstagramLogin from '../../../services/Instagram'
import { formatItem } from '../../../services/format-hastags'
import { httpPost } from "../../../services/http";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loaderState } from "../../../reducers/loader";
import { setInstaToken } from "../../../reducers/insta-token";
import { setAppState } from "../../../reducers/app-state"
import { setBalance } from "../../../reducers/user-balance";

import CustomButton from "../../containers/custom-button/custom-button";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";

import Share from 'react-native-share';


class EarnMore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }


  skip = () => {
    this.props.loaderState(false);
    NavigationService.navigate("Main");
  };

  connectInsta = (instagram_token) => {
    this.props.loaderState(true);
    this.props.setInstaToken(String(instagram_token))
    let body = JSON.stringify({
      instagram_token: instagram_token
    });
    let promise = httpPost(
      urls.insta_login,
      body,
      this.props.token
    );
    promise.then(
      result => {
        this.shareToInsta();
        this.props.loaderState(false);
      },
      error => {
        this.props.loaderState(false);
      }
    );
  }

  shareToInsta = () => {
    Clipboard.setString(formatItem(this.props.navigation.state.params.insta_data.hash_tag));
    Toast.show({
      text: RU.MISSION.HASHTAGS_MESSAGE,
      buttonText: "",
      duration: 3000
    })
    let shareImageBase64 = {
      title: formatItem(this.props.navigation.state.params.insta_data.hash_tag),
      url: 'data:image/jpg;base64,' + this.props.navigation.state.params.insta_data.base64,
    };
    setTimeout(() => {
      Platform.OS === 'ios' ? Share.open(shareImageBase64).then(
        result => {
          this.confirmPost()
        },
        error => {
        }
      ) : Share.open(shareImageBase64);
    }, 2000);

  }

  confirmPost = () => {
    this.props.loaderState(true);
    let body = JSON.stringify({
      id: this.props.navigation.state.params.insta_data.id
    });
    let promise = httpPost(
      urls.insta_getmedia,
      body,
      this.props.token
    );
    promise.then(
      result => {
        (result.code === 200) && Toast.show({
          text: RU.MISSION.POST_SUCCESS_MESSAGE,
          buttonText: "",
          duration: 3000
        })
        setTimeout(() => { this.skip(); }, 2000);
      },
      error => {
        (error.code === 400) && Toast.show({
          text: RU.MISSION.POST_ERROR_MESSAGE,
          buttonText: "",
          duration: 3000
        })
        setTimeout(() => { this.skip(); }, 2000);
      }
    );
  }

  earnMore = () => {
    if (!this.props.insta_token) {
      this.refs.instagramLogin.show()
    } else {
      this.shareToInsta();
    }
  };

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      Platform.OS === 'android' && this.confirmPost()
    }
    this.setState({ appState: nextAppState })
  }

  componentDidMount = () => {
    this.props.loaderState(false);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  render = () => {
    return (
      <View style={styles.container}>
        {this.props.loader && <ActivityIndicator />}
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          translucent={true}
        />
        <InstagramLogin
          ref='instagramLogin'
          clientId='c390ce3e630b4429bbe1fa33315cb888'
          redirectUrl='https://epocket.dev.splinestudio.com'
          scopes={['basic', 'public_content', 'likes', 'follower_list', 'comments', 'relationships']}
          onLoginSuccess={(token) => this.connectInsta(token)}
          onLoginFailure={(data) => console.log(data)}
        />
        <LinearGradient
          colors={[
            "#F7BB42",
            colors.orange,
            colors.pink,
            "rgba(214, 41, 197, 0.88)",
            "rgba(119, 12, 225, 0.69)"
          ]}
          start={{ x: 0.0, y: 1.4 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.grad}
        />
        <Image
          style={styles.image_background}
          source={require('../../../assets/img/EARN_MORE_BACK.png')}
        />
        <Image
          style={styles.image_template}
          source={{ uri: this.props.navigation.state.params.insta_data.img_watermark }}
        />
        <View style={styles.success}>
          <Text style={[styles.more_money, styles.text_common]}>{RU.MISSION.MORE_MONEY}</Text>
          <Text style={[styles.more_text, styles.text_common]}>{RU.MISSION.MORE_TEXT}</Text>
          <Text style={[styles.more_deck, styles.text_common]}>{RU.MISSION.MORE_DESC}</Text>
          <CustomButton
            style={styles.earn_more_btn}
            active
            short
            title={RU.MISSION.EARN_MORE.toUpperCase()}
            color={colors.pink}
            handler={() => { this.earnMore() }}
          />
          <Button
            rounded
            transparent
            block
            style={styles.skip_button}
            androidRippleColor={colors.card_shadow}
            onPress={() => { this.skip(); }}
          >
            <Text style={styles.text}>{RU.MISSION.SKIP}</Text>
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