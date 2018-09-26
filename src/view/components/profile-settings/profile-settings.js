import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  Image
} from "react-native";
import { Button } from "native-base";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setBirthDay } from "../../../reducers/birthday";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import CustomAlert from "../../containers/custom-alert/custom-alert";
//service
import NavigationService from "../../../services/route";
import InstagramLogin from '../../../services/Instagram'

import { httpPost } from "../../../services/http";
import { urls } from "../../../constants/urls";

import { loaderState } from "../../../reducers/loader";
import { setInstaToken } from "../../../reducers/insta_token";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
    instConnected: false,
    userCount:0
  };
  componentDidMount() { }

  LogOut = () => {
    AsyncStorage.setItem("user_info", "");
    AsyncStorage.setItem("balance", "");
    AsyncStorage.setItem("insta_token", "");
    NavigationService.navigate("Start");
  };
  ToProfile = () => {
    NavigationService.navigate("Main");
  }
  disConnectInsta = () => {
    this.props.loaderState(true);
    this.props.setInstaToken("")
    let body = JSON.stringify({
      instagram_token : this.props.insta_token
    });
    let promise = httpPost(
      urls.insta_logout,
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
        if(result.status==200){
          this.setState({ instConnected: true })
        }
        else{
          this.setState({ instConnected: false })
          this.setModalVisible(true), 
          this.setState({userCount:result.body.subsc_needed})
        }
      },
      error => {
        this.props.loaderState(false);
        console.log("Rejected: ", error);
      }
    );
  }
  setModalVisible = visible => {
    this.setState({
      modalVisible: visible
    });
  };
  ToProfileEdit = () => {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      let async_storage_user = {
        user_name: object.name,
        user_phone: object.phone,
        user_photo_url: object.photo,
        user_sex: object.sex,
        user_birthDay: object.birthDay
      };
      if (object.birthDay && object.birthDay != "") {
        this.props.setBirthDay(object.birthDay);
      }
      NavigationService.navigate("ProfileEdit", { async_storage_user });
    });
  }
  render() {
    return (
      <View style={styles.main_view}>
        {this.props.loader && <ActivityIndicator />}
        <InstagramLogin
          ref='instagramLogin'
          clientId='c390ce3e630b4429bbe1fa33315cb888'
          scopes={['basic', 'public_content', 'likes', 'follower_list', 'comments', 'relationships']}
          onLoginSuccess={(token) => this.connectInsta(token)}
          onLoginFailure={(data) => {console.log(data)}}
        />
        <View style={styles.header}>
          <Text style={[styles.header_text, styles.image_block_text_big]}>{RU.PROFILE_SETTINGS.SETTINGS}</Text>
          <Button
            transparent
            rounded
            style={styles.settings_btn}
            onPress={() => { this.ToProfile() }}>
            <Image style={styles.close_img}
              source={{ uri: ICONS.COMMON.CLOSE }} >
            </Image>
          </Button>
        </View>

        <View style={styles.info}>

          <View style={[styles.image_block_with_button, styles.image_block_with_border]}>
            <Button
              transparent
              style={styles.button}
              onPress={() => { this.ToProfileEdit() }}>
              <Image style={styles.settings_img}
                source={require('../../../assets/img/writing.png')} >
              </Image>
              <View style={styles.image_block_text_button}>
                <Text style={styles.image_block_text_big}>{RU.PROFILE_SETTINGS.EDIT_PROFILE}</Text>
              </View>
            </Button>
          </View>


          <View style={[styles.image_block]}>
            <Image style={styles.settings_img}
              source={require('../../../assets/img/instagram-logo.png')} >
            </Image>
            <View style={styles.image_block_text}>
              <Text style={styles.image_block_text_big}>{RU.PROFILE_SETTINGS.INSTAGRAM}</Text>
              <Text style={styles.image_block_text_small}>{RU.PROFILE_SETTINGS.INSTAGRAM_ADDITIONAL}</Text>
            </View>
            <View style={styles.image_block_button}>
              <CustomButton
                active
                short
                extra_short
                gradient
                title={this.props.insta_token ? RU.PROFILE_SETTINGS.REMOVE : RU.PROFILE_SETTINGS.ADD}
                color={colors.white}
                handler={() => { !this.props.insta_token ? this.refs.instagramLogin.show() : this.disConnectInsta() }}
              />
            </View>
          </View>
          {/* <View style={[styles.image_block, styles.image_block_with_border]}>
              <Image style={styles.settings_img}
                source={require('../../../assets/img/facebook.png')} >
              </Image>
              <View style={styles.image_block_text}>
                <Text style={styles.image_block_text_big}>Facebook</Text>
              </View>
              <View style={styles.image_block_button}>
                <CustomButton
                  active
                  short
                  extra_short
                  gradient
                  title={{RU.PROFILE_SETTINGS.REMOVE}}
                  color={colors.white}
                  handler={() => {}}
                />
              </View>
            </View> */}
          <View style={[styles.image_block_with_button, styles.image_block_with_top_border]}>
            <Button
              transparent
              style={styles.button}
              onPress={() => { this.LogOut() }}>
              <Image style={styles.settings_img}
                source={require('../../../assets/img/logout.png')} >
              </Image>
              <View style={styles.image_block_text_button}>
                <Text style={styles.image_block_text_big}>{RU.PROFILE_SETTINGS.EXIT}</Text>
              </View>
            </Button>
          </View>
        </View>
        <CustomAlert
          title={RU.PROFILE_PAGE.NOT_ENOUGHT_SUB}
          subtitle={this.state.userCount+RU.PROFILE_PAGE.SUBS}
          first_btn_title={RU.OK}
          visible={this.state.modalVisible}
          first_btn_handler={() =>
            this.setModalVisible(!this.state.modalVisible)
          }
          decline_btn_handler={() =>
            this.setModalVisible(!this.state.modalVisible)
          }
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.profileState,
    token: state.token,
    insta_token: state.insta_token,
    loader: state.loader
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setBirthDay,
  loaderState
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
