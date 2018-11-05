import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  Image
} from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors";
//containers
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import CustomButton from "../../containers/custom-button/custom-button";
import CustomPhoto from "../../containers/custom-photo/custom-photo";
import Blur from "../../containers/blur/blur";
import TimerModal from "../../containers/timer-modal/timer-modal";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//service
import NavigationService from "../../../services/route";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: {
      username: this.props.user.user_name,
      photo: this.props.user.user_photo_url,
      phone: this.props.user.user_phone
    },
    modalVisible: false
  };
  componentDidMount() {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({
        user: {
          username: object.name,
          phone: object.phone,
          photo: object.photo,
          sex: object.sex,
          birthDay: object.birthDay
        }
      });
    });
  }

  ToEdit = () => {
    let async_storage_user = {
      user_name: this.state.user.username,
      user_phone: this.state.user.phone,
      user_photo_url: this.state.user.photo,
      user_sex: this.state.user.sex,
      user_birthDay: this.state.user.birthDay
    };
    NavigationService.navigate("ProfileEdit", { async_storage_user });
  };
  ToSettings = () => {
    NavigationService.navigate("ProfileSettings");
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  ExitProfile = () => {
    this.setModalVisible(true);
  };
  editProfile = () => {
    NavigationService.navigate("ProfileSettings");
  };
  connectInsta = () => {
    this.refs.instagramLogin.show()
  }
  render() {
    return (
      <View style={styles.main_view}>
        {this.state.modalVisible ? <Blur /> : null}
        <View style={styles.header}>
          <Button
            transparent
            rounded
            style={styles.settings_btn}
            onPress={() => { this.ToSettings() }}>
            <Image style={styles.settings_img}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../../assets/img/settings.png')} >
            </Image>
          </Button>
        </View>
        <View style={styles.info}>
          <View style={styles.photo_container}>
            <CustomPhoto src={this.state.user.photo} />
          </View>
          <View style={styles.text_container}>
            <View style={styles.text_item}>
              <Text style={styles.title}>{RU.NAMES}</Text>
              <Text style={styles.name}>{this.state.user.username}</Text>
            </View>
            <View style={styles.text_item}>
              <Text style={styles.title}>{RU.PROFILE_PAGE.PHONE}</Text>
              <Text style={styles.phone}>+ {this.state.user.phone}</Text>
            </View>
            {
              this.state.user.birthDay ?
                <View style={styles.text_item}>
                  <Text style={styles.title}>{RU.PROFILE_PAGE.BIRTHDAY}</Text>
                  <Text style={styles.phone}>{this.state.user.birthDay}</Text>
                </View>
                : null
            }
            {
              this.state.user.sex ?
                <View style={styles.text_item}>
                  <Text style={styles.title}>{RU.PROFILE_PAGE.SEX}</Text>
                  <Text style={styles.phone}>{this.state.user.sex == 0 && RU.PROFILE_PAGE.FEMALE}{this.state.user.sex == 1 && RU.PROFILE_PAGE.MALE}</Text>
                </View>
                : null
            }

          </View>
          {
            (!this.state.user.sex || !this.state.user.birthDay) &&
            <View style={styles.btn_container}>
              <CustomButton
                active
                short
                gradient
                title={RU.PROFILE_PAGE.ADD_DATA.toUpperCase()}
                color={colors.white}
                handler={() => this.ToEdit()}
              />
            </View>
          }

        </View>
        <TimerModal />
        <FooterNavigation />
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
)(Profile);
