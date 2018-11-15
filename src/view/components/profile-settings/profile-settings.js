import React from "react";
import {
    View,
    Text,
    AsyncStorage,
    Platform
} from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import CookieManager from 'react-native-cookies';
//redux
import { connect } from "react-redux";
import { setGameStatus } from "../../../reducers/game-status"
import { bindActionCreators } from "redux";
import { setInstaToken } from "../../../reducers/insta-token";
import { loaderState } from "../../../reducers/loader";
import { setBirthDay } from "../../../reducers/birthday";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { RU } from "../../../locales/ru";
import { urls } from "../../../constants/urls";
import { colors } from "../../../constants/colors";
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import CustomAlert from "../../containers/custom-alert/custom-alert";
//service
import NavigationService from "../../../services/route";
import InstagramLogin from '../../../services/Instagram'
import { httpPost } from "../../../services/http";

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        modalVisible: false,
        errorVisible: false,
        userCount: 0
    };
    componentDidMount() { }

    LogOut = () => {
        AsyncStorage.multiSet([["user_info", ""], ["balance", ""], ["token", ""], ["insta_token", ""]], () => {
            NavigationService.navigate("Start");
            this.props.setGameStatus("start");
            console.log(this.props.insta_token)
            this.props.setInstaToken("");
            CookieManager.clearAll();
        });
    };
    LoginFacebook = () => {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                console.log(result)
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    alert('Login was successful with permissions: '
                        + result.grantedPermissions.toString());
                }
            },
            function (error) {
                alert('Login failed with error: ' + error);
            }
        );
    }

    ToProfile = () => {
        NavigationService.navigate("Main");
    }


    disConnectInsta = () => {
        this.props.loaderState(true);
        this.props.setInstaToken("")
        let body = JSON.stringify({
            instagram_token: this.props.insta_token
        });
        let promise = httpPost(
            urls.insta_logout,
            body,
            this.props.token
        );
        promise.then(
            result => {
                this.props.loaderState(false);
            },
            error => {
                this.props.loaderState(false);
                console.log("Rejected: ", error);
            }
        );
    }
    connectInsta = (instagram_token) => {
        this.props.loaderState(true);
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
                if (result.status === 200) {
                    this.props.setInstaToken(String(instagram_token))
                    this.props.loaderState(false);

                }
                else if (result.status == 201) {
                    CookieManager.clearAll()
                        .then((res) => {
                            this.setModalVisible(true);
                            this.setState({ userCount: result.body.subsc_needed })
                            this.props.loaderState(false);
                        });
                }
                else {
                    CookieManager.clearAll()
                        .then((res) => {
                            this.setErrorVisible(true)
                            this.props.loaderState(false);
                        });
                }
            },
            error => {
                CookieManager.clearAll()
                    .then((res) => {
                        this.props.loaderState(false);
                        console.log("Rejected: ", error);
                    });
            }
        );
    }
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
                    onLoginFailure={(data) => { console.log(data) }}
                />
                <View style={styles.header}>
                    <Text style={[styles.header_text, styles.image_block_text_big]}>{RU.PROFILE_SETTINGS.SETTINGS}</Text>
                    <Button
                        transparent
                        rounded
                        style={styles.settings_btn}
                        onPress={() => { this.ToProfile() }}>
                        <FastImage style={styles.close_img}
                            resizeMode={FastImage.resizeMode.contain}
                            source={{ uri: ICONS.COMMON.CLOSE }} >
                        </FastImage>
                    </Button>
                </View>

                <View style={styles.info}>

                    <View style={[styles.image_block_with_button, styles.image_block_with_border]}>
                        <Button
                            transparent
                            style={styles.button}
                            onPress={() => { this.ToProfileEdit() }}>
                            <FastImage style={styles.settings_img}
                                resizeMode={FastImage.resizeMode.contain}
                                source={require('../../../assets/img/writing.png')} >
                            </FastImage>
                            <View style={styles.image_block_text_button}>
                                <Text style={styles.image_block_text_big}>{RU.PROFILE_SETTINGS.EDIT_PROFILE}</Text>
                            </View>
                        </Button>
                    </View>


                    <View style={[styles.image_block]}>
                        <FastImage style={styles.settings_img}
                            resizeMode={FastImage.resizeMode.contain}
                            source={require('../../../assets/img/instagram-logo.png')} >
                        </FastImage>
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
                    <View style={[styles.image_block, styles.image_block_with_border]}>
                        <FastImage style={styles.settings_img}
                            source={require('../../../assets/img/facebook.png')} >
                        </FastImage>
                        <View style={styles.image_block_text}>
                            <Text style={styles.image_block_text_big}>Facebook</Text>
                        </View>
                        <View style={styles.image_block_button}>
                            <CustomButton
                                active
                                short
                                extra_short
                                gradient
                                title={RU.PROFILE_SETTINGS.REMOVE}
                                color={colors.white}
                                handler={() => { this.LoginFacebook() }}
                            />
                        </View>
                    </View>
                    <View style={[styles.image_block_with_button, styles.image_block_with_top_border]}>
                        <Button
                            transparent
                            style={styles.button}
                            onPress={() => { this.LogOut() }}>
                            <FastImage style={styles.settings_img}
                                resizeMode={FastImage.resizeMode.contain}
                                source={require('../../../assets/img/logout.png')} >
                            </FastImage>
                            <View style={styles.image_block_text_button}>
                                <Text style={styles.image_block_text_big}>{RU.PROFILE_SETTINGS.EXIT}</Text>
                            </View>
                        </Button>
                    </View>
                </View>
                <CustomAlert
                    title={RU.PROFILE_PAGE.ALREADY_ACCOUNT}
                    first_btn_title={RU.OK}
                    visible={this.state.errorVisible}
                    first_btn_handler={() =>
                        this.setErrorVisible(!this.state.errorVisible)
                    }
                    decline_btn_handler={() =>
                        this.setErrorVisible(!this.state.errorVisible)
                    }
                />
                <CustomAlert
                    title={RU.PROFILE_PAGE.NOT_ENOUGHT_SUB}
                    subtitle={this.state.userCount + RU.PROFILE_PAGE.SUBS}
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
    loaderState,
    setGameStatus,
    setInstaToken
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSettings);
