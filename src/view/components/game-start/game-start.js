import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  AppState,
  AsyncStorage
} from "react-native";
import { LinearTextGradient } from "react-native-text-gradient";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import { Button } from "native-base";
import geolib from "geolib";
//redux
import { setBalance } from "../../../reducers/user-balance";
import { connect } from "react-redux";
import { setTabState } from "../../../reducers/tabs";
import { setNavigateToMall } from "../../../reducers/navigate-to-mall";
import { bindActionCreators } from "redux";
import { setGameStatus } from "../../../reducers/game-status";
import { loaderState } from "../../../reducers/loader";
import { getGameInfo } from "../../../reducers/game-info";
import { launchGameExpiredTimer } from "../../../reducers/game-expired-timer";
import { errorState } from "../../../reducers/game-error";
import { setLocation } from "../../../reducers/geolocation-coords";
import { setDistance } from "../../../reducers/distance";
import { updateMall } from "../../../reducers/selected-mall";
import { updateClosMall } from "../../../reducers/closestMall";
import { setOutlets } from "../../../reducers/outlet-list";
import { setInitialOutlets } from "../../../reducers/initial-outlets";
import { setWebSiteTimer } from "../../../reducers/website-timer";
import { setAppState } from "../../../reducers/app-state";
//constants
import styles from "./styles";
import { urls } from "../../../constants/urls";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";
//containers
import CustomButton from "../../containers/custom-button/custom-button";
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import TrcInformation from "../../containers/trc-information/trc-information";
import PartnerCard from "./../../containers/partner-card/partner-card";
import BrandWebsite from "../../containers/brand-website/brand-website";
//services
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";
import NavigationService from "./../../../services/route";
import "../../../services/correcting-interval";
import moment from "moment-timezone";
import I18n from "@locales/I18n";

class GameStart extends React.Component {
  state = {
    errorVisible: false,
    loader: true,
    website_visible: false,
    interval: null,
    errorText: "",
    brand_title: "",
    currency: ""
  };

  componentDidMount() {
    this.loadTRC();
    AppState.addEventListener("change", this._handleAppStateChange);
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1000);
    if (
      this.props.game_status != "lock" &&
      this.props.game_status != "expired" &&
      this.props.game_status != "failed" &&
      this.props.game_status != "start"
    ) {
      this.props.setGameStatus("start");
    }
    if (
      this.props.game_status === "lock" &&
      this.props.distance <= 0 &&
      this.props.selectedMall.id
    ) {
      this.updateGames(this.props.selectedMall.id);
    }
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({ currency: object.currency });
    });
  }
  updateGames = id => {
    this.props.loaderState(true);
    let body = {
      outlet_id: id,
      notInMall:
        this.props.distance != null &&
        this.props.distance <= 0 &&
        this.props.isLocation
          ? false
          : true
    };
    httpPost(urls.missions, JSON.stringify(body), this.props.token).then(
      result => {
        this.props.loaderState(false);
        this.props.getGameInfo(
          this.props.token,
          this.props.location.lat,
          this.props.location.lng
        );
      },
      error => {
        let error_respons = handleError(
          error,
          body,
          urls.missions,
          this.props.token,
          this.constructor.name,
          "updateGames"
        );
        this.props.loaderState(false);
      }
    );
  };

  componentWillUnmount = () => {
    AppState.removeEventListener("change", this._handleAppStateChange);
  };
  componentWillReceiveProps = nextProps => {
    if (
      this.props.game_status == "initial" &&
      nextProps.game_status == "start"
    ) {
      this.props.getGameInfo(
        this.props.token,
        nextProps.location.lat,
        nextProps.location.lng
      );
    } else if (
      nextProps.location.lat.toFixed(3) != this.props.location.lat.toFixed(3) &&
      nextProps.location.lng.toFixed(3) != this.props.location.lng.toFixed(3) &&
      nextProps.appState === "active"
    ) {
      this.props.getGameInfo(
        this.props.token,
        nextProps.location.lat,
        nextProps.location.lng
      );
      this.loadTRC();
    }
  };
  _handleAppStateChange = nextAppState => {
    this.props.setAppState(nextAppState);
  };
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  selectMark = trc => {
    this.setState({
      pickedMark: {
        latitude: Number(trc.lat).toFixed(3),
        longitude: Number(trc.lng).toFixed(5)
      }
    });
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
    console.log("curr_trc", curr_trc);
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
    });
    let nearestMall = geolib.findNearest(my_location, newArr, 0);
    if (nearestMall) {
      let selectedTRC = mall_array.find(x => x.id === Number(nearestMall.key));
      let distance =
        geolib.getDistance(
          { latitude: selectedTRC.lat, longitude: selectedTRC.lng },
          {
            latitude: this.props.location.lat,
            longitude: this.props.location.lng
          }
        ) - selectedTRC.rad;
      let curr_trc = {
        active: true,
        name: selectedTRC.name,
        adress: selectedTRC.adress,
        lat: Number(selectedTRC.lat),
        lng: Number(selectedTRC.lng),
        distance: distance,
        id: selectedTRC.id,
        rad: selectedTRC.rad
      };
      this.props.updateClosMall(curr_trc);
      try {
        this.selectMark(selectedTRC, ANIMATE_MAP, "task");
      } catch (e) {}
    }
  };
  loadTRC = () => {
    this.setModalVisible(false);
    let promise = httpPost(
      urls.outlets,
      JSON.stringify({
        geolocation_status:
          this.props.location.lat != 0 && this.props.location.lng != 0,
        tzone: {
          timezone: moment.tz.guess(),
          timedelta: moment().format("Z")
        }
      }),
      this.props.token
    );
    promise.then(
      result => {
        result.body.outlets.forEach(elem => {
          elem.location = {
            latitude: elem.lat,
            longitude: elem.lng
          };
        });
        result.body.discounts.forEach(elem => {
          elem.location = {
            latitude: elem.lat,
            longitude: elem.lng
          };
        });
        result.body.cashouts.forEach(elem => {
          elem.location = {
            latitude: elem.lat,
            longitude: elem.lng
          };
        });
        this.setModalVisible(false);
        this.props.setOutlets(result.body.outlets);
        this.props.setInitialOutlets(result.body);
        this.props.setBalance(result.body.balance.amount);
        if (this.props.selectedMall.id) {
          //this.selectMark(this.props.selectedMall, false, "task");
        } else {
          this.props.isLocation &&
            this.selectNearestMall(
              {
                latitude: this.props.location.lat,
                longitude: this.props.location.lng
              },
              result.body.outlets,
              true
            );
        }
      },
      error => {
        let error_respons = handleError(
          error,
          {
            geolocation_status:
              this.props.location.lat != 0 && this.props.location.lng != 0,
            tzone: {
              timezone: moment.tz.guess(),
              timedelta: moment().format("Z")
            }
          },
          urls.outlets,
          this.props.token,
          this.constructor.name,
          "loadTRC"
        );
        this.setState({ errorText: error_respons.error_text });
        this.setModalVisible(error_respons.error_modal);
      }
    );
  };
  goToMap = () => {
    NavigationService.navigate("Main");
    this.props.setNavigateToMall(true);
    this.props.setTabState(1);
  };
  startTimer = () => {
    this.setState({
      interval: setCorrectingInterval(() => {
        if (this.props.game_info.wait_timer_in_sec <= 1) {
          clearCorrectingInterval(this.state.interval);
        }
        this.props.setWebSiteTimer(this.props.game_info.wait_timer_in_sec);
      }, 1000)
    });
  };
  openWebSite = () => {
    this.startTimer();
  };
  closeBrandWebSite = () => {
    this.setState({ website_visible: false });
    clearCorrectingInterval(this.state.interval);
    this.props.setWebSiteTimer(this.props.game_info.wait_timer_in_sec);
  };
  forceRemoveTicker = () => {
    this.props.loaderState(true);
    httpPost(
      urls.force_remove_ticker,
      JSON.stringify({}),
      this.props.token
    ).then(
      result => {
        this.setState({ website_visible: false });
        this.props.loaderState(false);
        this.props.getGameInfo(
          this.props.token,
          this.props.location.lat,
          this.props.location.lng
        );
        this.closeBrandWebSite();
      },
      error => {
        let error_respons = handleError(
          error,
          {},
          urls.force_remove_ticker,
          this.props.token,
          this.constructor.name,
          "forceRemoveTicker"
        );
        this.props.loaderState(false);
      }
    );
  };
  _renderPartnerCard = ({ item, index }) => {
    return (
      <PartnerCard
        picked_shops={true}
        index={index}
        item={item}
        openBarcode={() => {}}
        openLink={() => {
          this.setState({
            website_visible: true,
            brand_title: item.name,
            brand_link: item.link
          });
        }}
      />
    );
  };
  keyExtractor = (item, index) => {
    return index;
  };
  render() {
    return (
      <View style={styles.main_view}>
        {this.state.website_visible ? (
          <BrandWebsite
            visible={this.state.website_visible}
            brand_title={this.state.brand_title}
            brand_link={this.state.brand_link}
            closeBrandWebSite={() => this.closeBrandWebSite()}
            startTimer={() => this.openWebSite()}
            continue={() => {
              this.forceRemoveTicker();
            }}
          />
        ) : null}
        {this.props.loader || (this.state.loader && <ActivityIndicator />)}
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={I18n.t("REPEAT")}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
            if (this.props.dateAbuseStatus) this.loadTRC();
          }}
          decline_btn_handler={() => {
            this.setModalVisible(!this.state.errorVisible);
          }}
        />
        <CustomAlert
          title={this.props.game_error.error_text}
          first_btn_title={I18n.t("REPEAT")}
          visible={this.props.game_error.error_modal}
          first_btn_handler={() => {
            this.props.getGameInfo(
              this.props.token,
              this.props.location.lat,
              this.props.location.lng
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
        {this.props.game_info.no_more_games ? null : (
          <View style={styles.game_title}>
            <Text style={styles.game_title_text}>
              {this.props.game_info.available_game_len}/
              {this.props.game_info.total_game_len}{" "}
              {I18n.t("GAME.GAMES_FOR_TODAY")}
            </Text>
          </View>
        )}
        {this.props.game_status === "lock" ? (
          <View style={styles.lock_container}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.image_background}
              source={require("../../../assets/img/ANIMATED_EARN_MORE.gif")}
            />
            <LinearGradient
              colors={this.props.userColor.earn_more}
              start={{ x: 0.0, y: 1.4 }}
              end={{ x: 1.0, y: 0.0 }}
              style={styles.grad}
            />
            <Text style={[styles.zifi_text, styles.white_text]}>
              {I18n.t("GAME.ZIFI.MORE_GAMES")}
            </Text>
            <Image
              style={[styles.zifi, styles.open_more_game_zifi]}
              source={require("../../../assets/img/zifi/playful.gif")}
            />
            <Button
              rounded
              active={false}
              block
              transparent
              style={styles.go_to_signin}
              onPress={() => {}}
            >
              <Text style={styles.lock_visit_text}>
                {I18n.t("GAME.VISIT_PARTNERS")}
              </Text>
            </Button>
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              style={styles.visit_website_partners}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={{ flexWrap: "wrap" }}
              removeClippedSubviews={true}
              keyExtractor={this.keyExtractor}
              data={this.props.game_ticker_data.brand_partners}
              renderItem={this._renderPartnerCard}
              removeClippedSubviews={true}
            />
            {this.props.selectedMall.active ? (
              <Button
                rounded
                block
                transparent
                style={styles.go_to_map}
                onPress={() => this.goToMap()}
              >
                <Text style={styles.lock_visit_text}>
                  {I18n.t("GAME.VISIT_NEAREST_ONE")}
                </Text>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.icon_arrow}
                  source={{ uri: ICONS.COMMON.NAVIGATE_BACK }}
                />
              </Button>
            ) : null}
          </View>
        ) : (
          <View style={styles.container}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.zifi_cloud}
              source={{
                uri: this.props.game_info.no_more_games
                  ? ICONS.ZIFI.CLOUD_1
                  : ICONS.ZIFI.CLOUD_2
              }}
            />
            <Text style={styles.zifi_text}>
              {this.props.game_info.no_more_games
                ? I18n.t("GAME.ZIFI.BORING")
                : I18n.t("GAME.ZIFI.PLAYFUL")}
            </Text>
            <Image
              style={styles.zifi}
              source={
                this.props.game_info.no_more_games
                  ? require("../../../assets/img/zifi/bored.gif")
                  : require("../../../assets/img/zifi/playful.gif")
              }
            />
            <View style={styles.text_container}>
              {/* <Text style={styles.game_cost_text}>
                {this.props.game_info.no_more_games
                  ? I18n.t("GAME.SORRY_TODAY").toLocaleUpperCase()
                  : ""}{" "}
              </Text>
              <LinearTextGradient
                style={styles.game_cost_text}
                locations={[0, 1]}
                colors={[
                  this.props.userColor.first_gradient_color,
                  this.props.userColor.second_gradient_color
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {this.props.game_info.no_more_games == true
                  ? I18n.t("GAME.NO_GAMES").toLocaleUpperCase()
                  : I18n.t("GAME.COST_TEXT").toLocaleUpperCase() +
                    " " +
                    this.props.game_info.cost.toLocaleUpperCase() +
                    " " +
                    I18n.t("EPC", {
                      currency: this.state.currency
                    }).toLocaleUpperCase()}
              </LinearTextGradient> */}
            </View>

            <View style={styles.game_description}>
              <Text
                style={
                  this.props.game_info.no_more_games
                    ? styles.game_description_text
                    : styles.game_description_text_bold
                }
              >
                {this.props.game_info.no_more_games
                  ? I18n.t("GAME.GET_EPC", { currency: this.state.currency })
                  : ""}
              </Text>
              {/* this.props.game_info.description */}
            </View>
            {this.props.game_info.no_more_games ? null : (
              <View style={styles.btn_container}>
                <CustomButton
                  active={
                    this.props.game_error.error_text === "" ? true : false
                  }
                  short
                  gradient
                  title={I18n.t("GAME.START").toUpperCase()}
                  color={this.props.userColor.white}
                  handler={() => {
                    this.props.loaderState(true);
                    this.props.setGameStatus("game");
                  }}
                />
              </View>
            )}
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
    appState: state.appState,
    dateAbuseStatus: state.dateAbuseStatus,
    website_timer: state.website_timer,
    game_ticker_data: state.game_ticker_data
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGameInfo,
      setGameStatus,
      errorState,
      setLocation,
      setAppState,
      setInitialOutlets,
      setOutlets,
      setLocation,
      setDistance,
      setWebSiteTimer,
      updateMall,
      updateClosMall,
      loaderState,
      setTabState,
      launchGameExpiredTimer,
      setNavigateToMall,
      setBalance
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameStart);
