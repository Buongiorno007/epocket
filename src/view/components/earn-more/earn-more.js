import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { RU } from "./../../../locales/ru";
import { urls } from "../../../constants/urls";
//services
import NavigationService from "./../../../services/route";
import InstagramLogin from '../../../services/Instagram'
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loaderState } from "../../../reducers/loader";
import { setInstaToken } from "../../../reducers/insta_token";

import { httpPost } from "../../../services/http";
import CustomButton from "../../containers/custom-button/custom-button";

class EarnMore extends React.Component {
  skip = () => {
    NavigationService.navigate("Main");
  };

  connectInsta = (instagram_token) => {
    this.props.loaderState(true);
    this.props.setInstaToken(String(instagram_token))
    let body = JSON.stringify({
      instagram_token
    });
    let promise = httpPost(
      urls.insta_login,
      body,
      this.props.token
    );
    promise.then(
      result => {
        this.props.loaderState(false);
        console.log('insta result', result)
      },
      error => {
        this.props.loaderState(false);
        console.log("Rejected: ", error);
      }
    );
  }

  shareToInsta = () => {
    
  }

  earnMore = () => {
    if (!this.props.insta_token) {
      this.refs.instagramLogin.show()
    } else {
      this.shareToInsta();
    }

  };

  componentDidMount = () => {
    this.props.loaderState(false)
  }

  render = () => {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          translucent={true}
        />
        <InstagramLogin
          ref='instagramLogin'
          clientId='7df789fc907d4ffbbad30b7e25ba3933'
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
          // source={{ uri: this.props.navigation.state.params.insta_data.img_watermark }}
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
  token: state.token,
  insta_token: state.insta_token,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState,
      setInstaToken
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EarnMore);