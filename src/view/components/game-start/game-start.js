import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import geolib from "geolib";
//redux
import { setBalance } from "../../../reducers/user-balance";
import { connect } from 'react-redux';
import { setTabState } from "../../../reducers/tabs";
import { setNavigateToMall } from "../../../reducers/navigate-to-mall"
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
import { loaderState } from "../../../reducers/loader";
import { getGameInfo } from "../../../reducers/game-info";
import { launchGameExpiredTimer } from "../../../reducers/game-expired-timer"
import { errorState } from "../../../reducers/game-error"
import { setLocation } from "../../../reducers/geolocation-coords";
import { setDistance } from "../../../reducers/distance";
import { updateMall } from "../../../reducers/selected-mall";
import { setOutlets } from "../../../reducers/outlet-list";
import { setInitialOutlets } from "../../../reducers/initial-outlets"
//constants
import styles from './styles';
import { urls } from "../../../constants/urls";
import { colors } from './../../../constants/colors';
import { ICONS } from "../../../constants/icons";
import { RU } from '../../../locales/ru';
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import TrcInformation from "../../containers/trc-information/trc-information";
//services
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";
import NavigationService from "./../../../services/route";
import "../../../services/correcting-interval";
import moment from "moment-timezone";

class GameStart extends React.Component {
    state = {
        errorVisible: false,
        loader: true,
        errorText: "",
    };
    updateGames = (id) => {
        this.props.loaderState(true);
        let body = {
            outlet_id: id,
            notInMall: (this.props.distance <= 0 && this.props.isLocation) ? false : true
        };
        let promise = httpPost(
            urls.missions,
            JSON.stringify(body),
            this.props.token
        );
        promise.then(
            result => {
                console.log(result)
                this.props.loaderState(false);
                this.props.getGameInfo(this.props.token, this.props.location.lat, this.props.location.lng)
            },
            error => {
                let error_respons = handleError(error, this.constructor.name, "updateGames");
                this.props.loaderState(false);
            }
        );
    }
    componentWillMount() {
        console.log(this.props.game_status)
        if (this.props.game_status != "lock" && this.props.game_status != "expired" && this.props.game_status != "failed" && this.props.game_status != "start") {
            this.props.setGameStatus("start")
        }
        if (this.props.game_status === "lock" && this.props.distance <= 0) {
            this.updateGames(this.props.selectedMall.id);
        }
    }
    componentDidMount() {
        if (this.props.dateAbuseStatus)
            this.loadTRC();
        setTimeout(() => {
            this.setState({ loader: false })
        }, 1000);
    }
    componentWillReceiveProps = (nextProps) => {
        if (this.props.game_status == "initial" && nextProps.game_status == "start") {
            this.props.getGameInfo(this.props.token, nextProps.location.lat, nextProps.location.lng)
        }
        else if (
            (nextProps.location.lat.toFixed(3) != this.props.location.lat.toFixed(3)) &&
            (nextProps.location.lng.toFixed(3) != this.props.location.lng.toFixed(3))
        ) {
            this.props.getGameInfo(this.props.token, nextProps.location.lat, nextProps.location.lng)
            if (this.props.dateAbuseStatus)
                this.loadTRC();
        }
    }
    setModalVisible = visible => {
        this.setState({ errorVisible: visible });
    };
    selectMark = (trc) => {
        this.setState({
            pickedMark: {
                latitude: Number(trc.lat).toFixed(3),
                longitude: Number(trc.lng).toFixed(5)
            }
        })
        let bounds = geolib.getBounds([
            { latitude: trc.lat, longitude: trc.lng },
            { latitude: this.props.location.lat, longitude: this.props.location.lng }
        ]);
        let center = geolib.getCenter([
            { latitude: trc.lat, longitude: trc.lng },
            { latitude: this.props.location.lat, longitude: this.props.location.lng }
        ]);
        let distance =
            geolib.getDistance(
                { latitude: trc.lat, longitude: trc.lng },
                {
                    latitude: this.props.location.lat,
                    longitude: this.props.location.lng
                }
            ) - trc.rad;
        let curr_trc = {
            active: true,
            name: trc.name,
            adress: trc.adress,
            lat: Number(trc.lat),
            lng: Number(trc.lng),
            distance: distance,
            id: trc.id,
            rad: trc.rad
        };
        console.log("curr_trc", curr_trc)
        this.props.updateMall(curr_trc);
        this.updateGames(curr_trc.id);
        this.props.setDistance(distance);
    };
    selectNearestMall = (my_location, mall_array, ANIMATE_MAP) => {
        let newArr = {};
        mall_array.forEach(item => {
            let newItem = {
                latitude: item.lat,
                longitude: item.lng
            };
            let name = item.id;
            if (item.formated.money > 0) {
                newArr[name] = newItem;
            }
        })
        let nearestMall = geolib.findNearest(my_location, newArr, 0);
        if (nearestMall) {
            let selectedTRC = mall_array.find(x => x.id === Number(nearestMall.key))
            try { this.selectMark(selectedTRC, ANIMATE_MAP, "task"); } catch (e) { }
        }
    };
    loadTRC = () => {
        this.setModalVisible(false);
        let promise = httpPost(urls.outlets, JSON.stringify({
            geolocation_status: this.props.location.lat != 0 && this.props.location.lng != 0,
            tzone: {
                timezone: moment.tz.guess(),
                timedelta: moment().format('Z')
            }
        }), this.props.token);
        promise.then(
            result => {
                result.body.outlets.forEach(elem => {
                    elem.location = {
                        latitude: elem.lat,
                        longitude: elem.lng
                    }
                });
                result.body.discounts.forEach(elem => {
                    elem.location = {
                        latitude: elem.lat,
                        longitude: elem.lng
                    }
                });
                result.body.cashouts.forEach(elem => {
                    elem.location = {
                        latitude: elem.lat,
                        longitude: elem.lng
                    }
                });
                this.setModalVisible(false);
                this.props.setOutlets(result.body.outlets)
                this.props.setInitialOutlets(result.body)
                this.props.setBalance(result.body.balance.amount)
                if (this.props.selectedMall.id) {
                    //this.selectMark(this.props.selectedMall, false, "task");
                } else {
                    this.props.isLocation &&
                        this.selectNearestMall(
                            {
                                latitude: this.props.location.lat,
                                longitude: this.props.location.lng
                            },
                            result.body.outlets, true
                        );
                }
            },
            error => {
                let error_respons = handleError(error, this.constructor.name, "loadTRC");
                this.setState({ errorText: error_respons.error_text });
                this.setModalVisible(error_respons.error_modal);
            }
        );
    };
    goToMap = () => {
        NavigationService.navigate("Main")
        this.props.setNavigateToMall(true)
        this.props.setTabState(1)
    }
    render() {
        return (
            <View style={styles.main_view}>
                {this.props.loader || this.state.loader && <ActivityIndicator />}
                <CustomAlert
                    title={this.state.errorText}
                    first_btn_title={RU.REPEAT}
                    visible={this.state.errorVisible}
                    first_btn_handler={() => {
                        if (this.props.dateAbuseStatus)
                            this.loadTRC();
                    }}
                    decline_btn_handler={() => {
                        this.setModalVisible(!this.state.errorVisible);
                    }}
                />
                <CustomAlert
                    title={this.props.game_error.error_text}
                    first_btn_title={RU.REPEAT}
                    visible={this.props.game_error.error_modal}
                    first_btn_handler={() => {
                        this.props.getGameInfo(this.props.token, this.props.location.lat, this.props.location.lng);
                        this.props.errorState({
                            error_text: this.props.game_error.error_text,
                            error_modal: !this.props.game_error.error_modal
                        })
                    }}
                    decline_btn_handler={() => {
                        this.props.errorState({
                            error_text: this.props.game_error.error_text,
                            error_modal: !this.props.game_error.error_modal
                        })
                    }}
                />
                {
                    this.props.game_info.no_more_games ?
                        null :
                        <View style={styles.game_title}>
                            <Text style={styles.game_title_text}>{this.props.game_info.available_game_len}/{this.props.game_info.total_game_len} {RU.GAME.GAMES_FOR_TODAY}</Text>
                        </View>
                }

                <View style={styles.container}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.zifi_cloud}
                        source={{ uri: this.props.game_info.no_more_games ? ICONS.ZIFI.CLOUD_1 : ICONS.ZIFI.CLOUD_2 }}
                    />
                    <Text style={styles.zifi_text}>{this.props.game_info.no_more_games ? RU.GAME.ZIFI.BORING : RU.GAME.ZIFI.PLAYFUL}</Text>
                    <Image
                        //resizeMode={FastImage.resizeMode.contain}
                        style={styles.zifi}
                        source={this.props.game_info.no_more_games ? require('../../../assets/img/zifi/bored.gif') : require('../../../assets/img/zifi/playful.gif')}
                    // source={{ uri: this.props.game_info.no_more_games ? ICONS.ZIFI.BORED : ICONS.ZIFI.PLAYFUL }}
                    />
                    {this.props.game_status === "lock" ?
                        this.props.selectedMall.active ? (
                            <Button
                                rounded
                                block
                                transparent
                                style={styles.go_to_signin}
                                onPress={() => this.goToMap()}>
                                <TrcInformation
                                    info={this.props.selectedMall}
                                    distance={this.props.distance}
                                />
                            </Button>
                        ) : null
                        :
                        <View style={styles.text_container}>
                            <Text style={styles.game_cost_text}>{this.props.game_info.no_more_games ? RU.GAME.SORRY_TODAY.toLocaleUpperCase() : ""} </Text>
                            <LinearTextGradient
                                style={styles.game_cost_text}
                                locations={[0, 1]}
                                colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {this.props.game_info.no_more_games == true ? RU.GAME.NO_GAMES.toLocaleUpperCase() : RU.GAME.COST_TEXT.toLocaleUpperCase() + " " + this.props.game_info.cost.toLocaleUpperCase() + " " + RU.EPC.toLocaleUpperCase()}
                            </LinearTextGradient>
                        </View>
                    }
                    <View style={styles.game_description}>
                        <Text style={this.props.game_info.no_more_games ? styles.game_description_text : styles.game_description_text_bold}>{this.props.game_status === "lock" ? RU.GAME.LOCK : this.props.game_info.no_more_games ? RU.GAME.GET_EPC : ""}</Text>
                        {/* this.props.game_info.description */}
                    </View>
                    {this.props.game_info.no_more_games || this.props.game_status === "lock" ?
                        null :
                        <View style={styles.btn_container}>
                            < CustomButton
                                active={this.props.game_error.error_text === "" ? true : false}
                                short
                                gradient
                                title={RU.GAME.START.toUpperCase()}
                                color={this.props.userColor.white}
                                handler={() => {
                                    this.props.loaderState(true)
                                    this.props.setGameStatus("game")
                                }}
                            />
                        </View>
                    }
                </View>
                <FooterNavigation />
            </View>
        );
    }
}
//
const mapStateToProps = (state) => {
    return {
        isLocation: state.isLocation,
        game_info: state.game_info,
        token: state.token,
        location: state.location,
        loader: state.loader,
        userColor: state.userColor,
        game_error: state.game_error,
        game_status: state.game_status,
        selectedMall: state.selectedMall,
        distance: state.distance,
        activeTab: state.activeTab,
        dateAbuseStatus: state.dateAbuseStatus
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getGameInfo,
    setGameStatus,
    errorState,
    setLocation,
    setInitialOutlets,
    setOutlets,
    setLocation,
    setDistance,
    updateMall,
    loaderState,
    setTabState,
    launchGameExpiredTimer,
    setNavigateToMall,
    setBalance
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
