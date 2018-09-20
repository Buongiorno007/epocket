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
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import CustomPhoto from "../../containers/custom-photo/custom-photo";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import Blur from "../../containers/blur/blur";
import TimerModal from "../../containers/timer-modal/timer-modal";
//service
import NavigationService from "../../../services/route";
import InstagramLogin from 'react-native-instagram-login'

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
    instConnected:false
  };
  componentDidMount() { }

  LogOut = () => {
    AsyncStorage.setItem("user_info", "");
    AsyncStorage.setItem("balance", "");
    NavigationService.navigate("Start");
  };
  ToProfile = () =>{
    NavigationService.navigate("Main");
  }
  connectInsta = () => {
    this.setState({instConnected:true})
    this.refs.instagramLogin.show()
  }
  ToProfileEdit = () =>{
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      let async_storage_user = {
        user_name: object.name,
        user_phone: object.phone,
        user_photo_url: object.photo,
        user_sex: object.sex,
        user_birthDay: object.birthDay
      };
      NavigationService.navigate("ProfileEdit",{ async_storage_user });
    });
  }
  render() {
    return (
      <View style={styles.main_view}>
          <InstagramLogin
            ref='instagramLogin'
            clientId='7df789fc907d4ffbbad30b7e25ba3933'
            scopes={['basic', 'public_content', 'likes', 'follower_list', 'comments', 'relationships']}
            onLoginSuccess={(token) => console.log(token)}
            onLoginFailure={(data) => console.log(data)}
          />
          <View style={styles.header}>
            <Text style={[styles.header_text,styles.image_block_text_big]}>{RU.PROFILE_SETTINGS.SETTINGS}</Text>
            <Button
              transparent
              rounded
              style={styles.settings_btn}
              onPress={()=>{this.ToProfile()}}>
              <Image style={styles.close_img}
                source={{uri: ICONS.COMMON.CLOSE}} >
              </Image>
            </Button>
          </View>
          
          <View style={styles.info}>

            <View style={[styles.image_block_with_button, styles.image_block_with_border]}>
              <Button
                transparent
                style={styles.button}
                onPress={()=>{this.ToProfileEdit()}}>
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
                  title={this.state.instConnected?RU.PROFILE_SETTINGS.REMOVE:RU.PROFILE_SETTINGS.ADD}
                  color={colors.white}
                  handler={() => {this.connectInsta()}}
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
                onPress={()=>{this.LogOut()}}>
                <Image style={styles.settings_img}
                  source={require('../../../assets/img/logout.png')} >
                </Image>
                <View style={styles.image_block_text_button}>
                  <Text style={styles.image_block_text_big}>{RU.PROFILE_SETTINGS.EXIT}</Text>
                </View>
              </Button>
            </View>
          </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.profileState
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
