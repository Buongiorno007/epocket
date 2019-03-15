import React from "react";
import { View, Platform, StatusBar, FlatList, Animated, Easing, Dimensions, Text } from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ClusteredMapView from '../../../native_modules/react-native-maps-super-cluster'
import geolib from "geolib";
import { LinearTextGradient } from "react-native-text-gradient";
import LinearGradient from "react-native-linear-gradient";
import CookieManager from 'react-native-cookies';
//containers
import TrcInformation from "../../containers/trc-information/trc-information";
import UserMarker from "../../containers/user-marker/user-marker";
import TRCMarker from "../../containers/trc-marker/trc-marker";
import LocationDisabled from "../../containers/location-disabled/location-disabled";
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import CurrentGeolocation from "../../containers/current-geolocation/current-geolocation";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
import CardTask from "../../containers/map-card-task/map-card-task"
import CardCashout from "../../containers/map-card-shop/map-card-shop"
import CardFirst from "../../containers/map-card-first/map-card-first"
import TimerModal from "../../containers/timer-modal/timer-modal";
//constants
import { mapStyle } from "./mapCustomStyle";
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { urls } from "../../../constants/urls";
import { RU } from "./../../../locales/ru";
import { colors } from "./../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setNavigateToMall } from "../../../reducers/navigate-to-mall"
import { setLocation } from "../../../reducers/geolocation-coords";
import { setDistance } from "../../../reducers/distance";
import { updateMall } from "../../../reducers/selected-mall";
import { showDashboard } from "../../../reducers/show-dashboard";
import { loaderState } from "../../../reducers/loader";
import { setOutlets } from "../../../reducers/outlet-list";
import { setInitialOutlets } from "../../../reducers/initial-outlets"
import { setInfo } from "../../../reducers/info"
import { setInstaToken } from "../../../reducers/insta-token";
import { setFacebookToken } from "../../../reducers/facebook-token"
import { showTimer } from "../../../reducers/show-dashboard-timer"
import { timerStatus } from "../../../reducers/timer-status";
import { updateTimer } from "../../../reducers/timer";
import { reloadTimer } from "../../../reducers/timer-interval";
import { showDoneNotification } from "../../../reducers/main-task-done-notification";
import { showFailedNotification } from "../../../reducers/main-task-failed-notification";
import { setBalance } from "../../../reducers/user-balance";
import { setMainMissionCost } from "../../../reducers/main-task-cost"
//services
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";
import NavigationService from "../../../services/route";
import getCurrentGeolocation from "../../../services/get-location"
import { sendToTelegramm } from '../../../services/telegramm-notification'
import InstagramLogin from '../../../services/Instagram'
import FacebookLogin from '../../../services/Facebook'
import { orderBy } from 'lodash';
import moment from "moment-timezone";
import "../../../services/correcting-interval";

const { width, height } = Dimensions.get('window');

class Map extends React.Component {
  state = {
    mapKey: 0,
    modalVisible: false,
    userCount: 0,
    location_loader: false,
    errorVisible: false,
    errorLoginVisible: false,
    errorText: "",
    posts: [],
    region: {
      latitude: this.props.location.lat,
      longitude: this.props.location.lng,
      latitudeDelta: 0.04323,
      longitudeDelta: 0.04028
    },
    distance: 0,
    shopActive: false,
    taskActive: true,
    discountActive: false,
    focusedOnMark: false,
    firstCardData: null,
    cards: [],
    pickedMark: {
      latitude: 0,
      longitude: 0
    },
    mainMissionPrice: 0,
    topNavigationTranslateY: new Animated.Value(0)
  };
  timer(interval) {
    let countDownDate = new Date().getTime() + interval;
    clearCorrectingInterval(this.props.timer_interval);
    // Update the count down every 1 second
    let x = setCorrectingInterval(() => {
      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now an the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (hours >= 0 && minutes >= 0 && seconds >= 0) {
        let curr_time = {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        };
        this.props.updateTimer(curr_time);
      }
      // If the count down is finished, write some text
      if (distance <= 0) {
        clearCorrectingInterval(this.props.timer_interval);
        this.finishMainMission();
        this.setState({ finishMissionCalled: true })
      }
    }, 1000);
    this.props.reloadTimer(x);
  }
  finishMainMission() {
    if (this.state.finishMissionCalled) {
      console.log("finishMainMission called second time")
    } else {
      this.setErrorVisible(false);
      this.setState({ load_missions: true });
      let body = {
        outlet_id: this.props.selectedMall.id,
        mission_id: this.state.mainMissionId
      };
      let promise = httpPost(
        urls.finish_mission,
        JSON.stringify(body),
        this.props.token
      );
      promise.then(
        result => {
          this.setErrorVisible(false);
          this.props.timerStatus(false);
          this.props.showDoneNotification(true);
          this.props.setBalance(result.body.balance);
          this.setState({ load_missions: false });
        },
        error => {
          let error_respons = handleError(error, this.constructor.name, "finishMainMission");
          this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code });
          this.setErrorVisible(error_respons.error_modal);
          this.setState({ load_missions: false });
        }
      );
    }
  }
  showNearestOne = (my_location, mall_array, outlets) => {
    let newArr = {};
    mall_array.forEach(item => {
      let newItem = {
        latitude: item.lat,
        longitude: item.lng
      };
      let name = item.id;
      if (!outlets && newItem.latitude != "None" && newItem.longitude != "None") {
        newArr[name] = newItem;
      }
      else if (outlets && newItem.latitude != "None" && newItem.longitude != "None" && item.formated.money > 0) {
        newArr[name] = newItem;
      }
    })
    let nearestMall = geolib.findNearest(my_location, newArr, 0);
    if (nearestMall) {
      let latD = 0.00003212 * nearestMall.distance;
      let lngD = 0.00003381 * nearestMall.distance;
      if (latD > this.state.region.latitudeDelta && lngD > this.state.region.longitudeDelta) {
        setTimeout(() => {
          this.moveMapTo(
            Number(this.props.location.lat),
            Number(this.props.location.lng),
            latD,
            lngD
          );
        }, 1000);
      }
    }
  };
  toggleTab = (tab) => {
    this.setState({ mapKey: Math.random() })
    if (tab == "shop") {
      this.setState({ shopActive: true, taskActive: false, discountActive: false, focusedOnMark: false })
      let allShops = [...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]
      this.props.setOutlets(allShops);
      this.showNearestOne({
        latitude: this.props.location.lat,
        longitude: this.props.location.lng
      },
        allShops)
    }
    else if (tab == "task") {
      if (this.props.isLocation && this.props.distance < 0) {
        this.selectNearestMall(
          {
            latitude: this.props.location.lat,
            longitude: this.props.location.lng
          },
          this.props.initial_outlets.outlets, true
        );
      }
      else if (this.props.isLocation) {
        this.showNearestOne({
          latitude: this.props.location.lat,
          longitude: this.props.location.lng
        },
          this.props.initial_outlets.outlets, true)
      }
      this.setState({ shopActive: false, taskActive: true, discountActive: false, focusedOnMark: false })
      this.props.setOutlets(this.props.initial_outlets.outlets);
    }
    else if (tab == "discount") {
      this.setState({ shopActive: false, taskActive: false, discountActive: true, focusedOnMark: false })
      this.props.setOutlets(this.props.initial_outlets.discounts);
      this.showNearestOne({
        latitude: this.props.location.lat,
        longitude: this.props.location.lng
      },
        this.props.initial_outlets.discounts)
    }
  }
  LoginFacebook = () => {
    this.props.loaderState(true);
    let body = JSON.stringify({
    });
    let promise = httpPost(
      urls.facebook_login,
      body,
      this.props.token
    );
    promise.then(
      result => {
        this.props.loaderState(false);
        this.refs.facebookLogin.show(result.body.url)
      },
      error => {
        CookieManager.clearAll()
          .then((res) => {
            this.props.loaderState(false);
          });
      }
    );
  }
  connectFacebook = (token) => {
    this.props.setFacebookToken(String(token));
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
          });
      }
    );
  }
  setErrorVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  setErrorLoginVisible = visible => {
    this.setState({
      errorLoginVisible: visible
    });
  };
  setModalVisible = visible => {
    this.setState({
      modalVisible: visible
    });
  };
  moveMapTo = (lat, lng, latD, lngD, animation_time, timeout) => {
    setTimeout(() => {
      if (this.map)
        this.map.getMapRef().animateToRegion(
          {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: parseFloat(latD) || 0.04323,
            longitudeDelta: parseFloat(lngD) || 0.04028
          },
          animation_time || 450
        );
    }, timeout || 200);
  };
  componentWillReceiveProps = nextProps => {
    if (
      this.props.location.lat === 0 &&
      this.props.location.lng === 0 &&
      nextProps.location.lat !== 0 &&
      nextProps.location.lng !== 0
    ) {
      this.moveMapTo(nextProps.location.lat, nextProps.location.lng);
      this.setState({ location_loader: false });
    }
    if (nextProps.distance < 0 && nextProps.isLocation) {
      if (
        this.props.location.lat.toFixed(3) !== nextProps.location.lat.toFixed(3) &&
        this.props.location.lng.toFixed(3) !== nextProps.location.lng.toFixed(3)
      ) {
        this.selectNearestMall(
          {
            latitude: nextProps.location.lat,
            longitude: nextProps.location.lng
          },
          nextProps.outlets, false
        );
      }
    }
    if (nextProps.navigateToMall) {
      this.moveMapTo(nextProps.selectedMall.lat, nextProps.selectedMall.lng, 0.0058,
        0.0058);
      this.selectMark(this.props.selectedMall, false, "task");
      this.setState({ location_loader: false });
      this.props.setNavigateToMall(false)
    }
  };
  componentDidMount = () => {
      this.loadTRC();
    if (this.props.location.lat === 0 && this.props.location.lng === 0) {
      this.setState({ location_loader: true });
    } else {
      this.setState({ location_loader: false });
    }
  };

  loadTRC = () => {
    this.setModalVisible(false);
    this.props.loaderState(true);
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
        this.props.setBalance(result.body.balance.amount)
        this.setModalVisible(false);
        this.props.loaderState(false);
        this.props.setOutlets(result.body.outlets)
        this.props.setInitialOutlets(result.body)
        if (this.props.isLocation && this.props.distance < 0) {
          this.selectNearestMall(
            {
              latitude: this.props.location.lat,
              longitude: this.props.location.lng
            },
            result.body.outlets, true
          );
        }
        else if (this.props.isLocation) {
          this.showNearestOne({
            latitude: this.props.location.lat,
            longitude: this.props.location.lng
          },
            result.body.outlets, true)
        }
      },
      error => {
        let error_respons = handleError(error, this.constructor.name, "loadTRC");
        this.setState({ errorText: error_respons.error_text });
        this.setModalVisible(error_respons.error_modal);
        this.props.loaderState(false);
      }
    );
  };
  checkLat(lat) {
    return lat > -90 && lat < 90 ? true : false;
  }
  checkLng(lng) {
    return lng > -180 && lng < 180 ? true : false;
  }
  checkRange(outlets) {
    return outlets.filter(item => {
      return this.checkLat(Number(item.lat)) && this.checkLng(Number(item.lng));
    });
  }
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

  _renderItem = item => (
    item.item.adress ?
      <CardFirst
        item={item.item}
        onPressItem={this.openNext}
        taskActive={this.state.taskActive}
        shopActive={this.state.shopActive}
        btnText={
          this.state.taskActive ? RU.MAP.TASKS.toUpperCase() :
            this.state.shopActive ? RU.MAP.MAKE_PREORDER.toUpperCase() :
              RU.MAP.LIST_PRODUCTS.toUpperCase()
        }
      />
      :
      item.item.type === "instagram_connect" || item.item.type === "facebook_connect" ?
        <CardFirst
          type={item.item.type}
          item={item.item}
          taskActive={this.state.taskActive}
          onPressItem={() => {
            if (item.item.type === "facebook_connect") {
              this.LoginFacebook()
            }
            else if (item.item.type === "instagram_connect") {
              this.refs.instagramLogin.show()
            }
          }}
          btnText={
            RU.EXECUTE.toUpperCase()
          }
        />
        :
        this.state.taskActive ?
          //item.item.active && //uncomment this to show only active cards at map
          <CardTask
            item={item.item}
            onPressItem={this.openTaskDetails}
          />
          : this.state.shopActive ?
            <CardCashout
              item={item.item}
              onPressItem={this.openAccordion}
            />
            :
            <CardCashout
              item={item.item}
              onPressItem={this._showSelectedCard}
            />
  );
  openNext = selectedCard => {
    let copyOfCards = [...this.state.cards]
    copyOfCards.shift(); //remove card with outlet|cashout information
    if (this.state.taskActive) {
      NavigationService.navigate("Dashboard", { dashboard_data: copyOfCards, general_info: selectedCard, posts: this.state.posts });
    }
    else {
      NavigationService.navigate("Cashout", { cashout_data: copyOfCards, general_info: selectedCard });
    }
  }
  _showSelectedCard = selectedCard => {
  };
  openTaskDetails = selectedCard => {
    let selectedOutlet = this.state.cards[0];
    let copyOfCards = [...this.state.cards]
    copyOfCards.shift(); //remove card with outlet|cashout information
    if (this.state.taskActive) {
      NavigationService.navigate("Dashboard", { dashboard_data: copyOfCards, general_info: selectedOutlet, posts: this.state.posts, cardToOpen: selectedCard });
    }
  }
  openAccordion = selectedCard => {
    let selectedCashout = this.state.cards[0];
    let copyOfCards = [...this.state.cards]
    copyOfCards.shift(); //remove card with outlet|cashout information
    NavigationService.navigate("Cashout", { cashout_data: copyOfCards, general_info: selectedCashout, cardForAccordion: selectedCard });
  }
  getActiveMissions = (missions) => {
    missions.forEach((item) => {
      let currentTime = moment().format("HH:mm:ss");
      let startTime = moment(item.date_start).format("HH:mm:ss");
      let endTime = moment(item.date_end).format("HH:mm:ss")
      item.active = (currentTime > startTime && currentTime < endTime)
    });
    return orderBy(orderBy(missions, ['price'], ['desc']), ['active'], ['desc']);
  }
  loadTaskItems = (trc) => {
    this.setState({ cards: [], focusedOnMark: false });
    this.setModalVisible(false);
    let body = {
      outlet_id: trc.id,
      notInMall: (this.props.distance <= 0 && this.props.isLocation) ? false : true
    };
    let promise = httpPost(
      urls.missions,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setErrorVisible(false);
        if (result.status == 200) {
          this.setState({ posts: result.body.posts })
          let cards = this.getActiveMissions(result.body.missions);
          if (!this.props.insta_token) { //check for instagramm !this.props.insta_token
            cards.unshift({
              type: "instagram_connect",
              reward: result.body.networks.insta_reward,
              price: 0,
              formated: { money: 0 }
            })
          }
          if (!this.props.facebook_token) { //check for facebook !this.props.facebook_token
            cards.unshift({
              type: "facebook_connect",
              reward: result.body.networks.fb_reward,
              price: 0,
              formated: { money: 0 }
            })
          }
          cards.unshift(trc)
          this.setState({ cards, focusedOnMark: true })
          Animated.timing(this.state.topNavigationTranslateY,
            {
              toValue: -100,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.linear
            }).start();
        }
        this.props.loaderState(false);
      },
      error => {
        let error_respons = handleError(error, this.constructor.name, "getMissions");
        this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code });
        this.setErrorVisible(error_respons.error_modal);
        this.props.loaderState(false);
      }
    );
  }
  loadCashoutItems = (trc) => {
    this.props.loaderState(true);
    let body;
    if (trc.outlet) {
      body = {
        cashout_id: trc.id // clicked marked = cashout
      };
    }
    else {
      body = {
        outlet_id: trc.id // clicked marker = outlet
      };
    }
    let promise = httpPost(
      urls.get_outlet_products,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setModalVisible(false);
        this.props.loaderState(false);
        let cards = result.body.products;
        cards.unshift(trc)
        this.setState({ cards, focusedOnMark: true })
        Animated.timing(this.state.topNavigationTranslateY,
          {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear
          }).start();
        //this.props.setBalance(result.body.balance);
      },
      error => {
        this.props.loaderState(false);
        let error_respons = handleError(error, this.constructor.name, "loadData");
        this.setState({ errorText: error_respons.error_text });
        this.setModalVisible(error_respons.error_modal);
      }
    );
  }
  loadDiscountItems = (trc) => {
    this.props.loaderState(true);
    let body = {
      cashout_id: trc.id
    };
    let promise = httpPost(
      urls.get_outlet_products,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setModalVisible(false);
        this.props.loaderState(false);
        let cards = result.body.products;
        cards.unshift(trc)
        this.setState({ cards, focusedOnMark: true })
        Animated.timing(this.state.topNavigationTranslateY,
          {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear
          }).start();
        //this.props.setBalance(result.body.balance);
        //this.setState({ products: result.body.products });
      },
      error => {
        this.props.loaderState(false);
        let error_respons = handleError(error, this.constructor.name, "loadData");
        this.setState({ errorText: error_respons.error_text });
        this.setModalVisible(error_respons.error_modal);
      }
    );
  }
  onRegionChange = (region) => {
    if ((this.state.pickedMark.latitude == 0 && this.state.pickedMark.longitude == 0)
      ||
      (region.longitudeDelta && Number(region.latitude).toFixed(3) == this.state.pickedMark.latitude && Number(region.longitude).toFixed(5) == this.state.pickedMark.longitude)
      ||
      (region.nativeEvent && Number(region.nativeEvent.coordinate.latitude).toFixed(3) == this.state.pickedMark.latitude && Number(region.nativeEvent.coordinate.longitude).toFixed(5) == this.state.pickedMark.longitude)) {
    }
    else {
      this.setState({ focusedOnMark: false, cards: [] })
      Animated.timing(this.state.topNavigationTranslateY,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.linear
        }).start();
      if (this.state.shopActive) {
        this.props.setOutlets([...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]);
      } else if (this.state.taskActive) {
        this.props.setOutlets([...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]);
      } else {
        this.props.setOutlets(this.props.initial_outlets.discounts);
      }
    }
  }
  callTimer(id, distance) {
    let curr_time = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.props.updateTimer(curr_time);
    this.setErrorVisible(false);
    let body = {
      outlet_id: id ? id : this.props.selectedMall.id,
      notInMall: distance ? (distance <= 0 && this.props.isLocation) ? false : true
        :
        (this.props.distance <= 0 && this.props.isLocation) ? false : true
    }
    let promise = httpPost(
      urls.start_mission,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setErrorVisible(false);
        this.setState({ load_timer: false });
        this.props.setMainMissionCost(result.body.formated.amount);
        this.setState(
          {
            mainMissionId: result.body.id,
            mainMissionPrice: result.body.formated.amount
          },
          () => {
            if (result.body.failed) {
              this.props.showFailedNotification(true);
              this.props.timerStatus(false);
            } else {
              this.setState({ notInMall: false })
              if (result.body.interval <= 0) {
                this.props.timerStatus(false);
                this.finishMainMission();
              } else if (result.body.interval > 0) {
                //blocks second call on mount
                if (this.props.distance <= 0 && this.props.isLocation) {
                  this.props.timerStatus(true);
                  this.setState({ finishMissionCalled: false })
                  clearCorrectingInterval(this.props.timer_interval);
                  this.timer(result.body.interval * 1000);
                }
                else {
                  clearCorrectingInterval(this.props.timer_interval);
                  this.props.timerStatus(false);
                  this.setState({ notInMall: true })
                  let time = result.body.interval * 1000
                  let hours = Math.floor(
                    (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  );
                  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                  let seconds = Math.floor((time % (1000 * 60)) / 1000);
                  if (hours >= 0 && minutes >= 0 && seconds >= 0) {
                    let curr_time = {
                      hours: hours,
                      minutes: minutes,
                      seconds: seconds
                    };
                  }
                }
              }
            }
          }
        );
      },
      error => {
        this.setState({ load_timer: false });
        let error_respons = handleError(error, this.constructor.name, "callTimer");
        this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code });
        if (error.code != 416 && error.code != 418 && error.code != 415) {
          this.setErrorVisible(error_respons.error_modal);
        }
      }
    );
  }
  selectMark = (trc, ANIMATE_MAP, mark_type) => {
    ANIMATE_MAP &&
      this.moveMapTo(
        Number(trc.lat),
        Number(trc.lng),
        0.0058,
        0.0058,
      );
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
    this.props.updateMall(curr_trc);
    this.props.setDistance(distance);
    // use JSON.stringify because js copies array with link, so changes applied to the new array applies to the old one
    if (mark_type === "task") {
      this.props.loaderState(true);
      this.loadTaskItems(trc);
      this.props.setOutlets([...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]);
      let new_outlets = JSON.parse(JSON.stringify([...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]));
      let id = this.props.outlets.indexOf(trc);
      if (new_outlets[id]) {
        new_outlets[id].active = true;
        this.props.setOutlets(new_outlets);
      }
      if (distance <= 0 && this.props.isLocation) { //start timer 
        this.props.showTimer(false);
        if (!this.props.selectedMall.outlet) {
          this.callTimer(trc.id, distance)
        }
      }
    }
    else if (mark_type === "shop") {
      this.props.loaderState(true);
      this.props.setOutlets([...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]);
      this.loadCashoutItems(trc);
      let new_outlets = JSON.parse(JSON.stringify([...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]));
      let id = this.props.outlets.indexOf(trc);
      if (new_outlets[id]) {
        new_outlets[id].active = true;
        this.props.setOutlets(new_outlets);
      }
    }
    else {
      this.props.loaderState(true);
      this.props.setOutlets(this.props.initial_outlets.discounts);
      this.loadDiscountItems(trc);
      let new_outlets = JSON.parse(JSON.stringify(this.props.initial_outlets.discounts));
      let id = this.props.outlets.indexOf(trc);
      if (new_outlets[id]) {
        new_outlets[id].active = true;
        this.props.setOutlets(new_outlets);
      }
    }
  };
  _keyExtractor = (item, index) => {
    let key = item.id + "_" + item.name
    return key
  };
  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId
    const clusteringEngine = this.map.getClusteringEngine(),
      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)
    let clusterValue = 0;
    let maxDistance = 0;
    if (this.state.discountActive) {
      clusteredPoints.forEach(cluster => {
        let distanceToCenter = geolib.getDistance(
          cluster.properties.item.location,
          coordinate
        );
        if (distanceToCenter > maxDistance && cluster.properties.item.price != 0) {
          maxDistance = distanceToCenter
        }
        clusterValue = clusterValue + Number(cluster.properties.item.discount)
      });
    } else {
      clusteredPoints.forEach(cluster => {
        let distanceToCenter = geolib.getDistance(
          cluster.properties.item.location,
          coordinate
        );
        if (distanceToCenter > maxDistance && cluster.properties.item.price != 0) {
          maxDistance = distanceToCenter
        }
        if (isNaN(Number(cluster.properties.item.formated.money))) {
          clusterValue = clusterValue + Number(cluster.properties.item.formated.amount)
        } else {
          clusterValue = clusterValue + Number(cluster.properties.item.formated.money)
        }
      });
    }
    let marker;
    let markerData = {
      adress: "",
      city: "",
      id: clusterId,
      lat: coordinate.latitude,
      lng: coordinate.longitude,
      location: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
      name: "",
      photo: "",
      price: clusterValue,
      discount: clusterValue,
      formated: { money: clusterValue },
      rad: 0,
      time_weekdays: ""
    }
    if (clusterValue > 0 || this.state.shopActive) {
      marker =
        <TRCMarker
          marker={markerData}
          key={markerData.id + "_" + markerData.lat}
          selected={this.props.selectedMall.id}
          active={markerData.active}
          discountMarker={this.state.discountActive}
          cashoutMarker={this.state.shopActive}
          onPress={() => {
            this.moveMapTo(
              Number(coordinate.latitude),
              Number(coordinate.longitude),
              maxDistance * 0.00001167,
              maxDistance * 0.00005
            );
            clusteredPoints.forEach(cluster => {
              if (this.state.taskActive && cluster.properties.item.formated && ((clusterValue === Number(cluster.properties.item.formated.money)) || (clusterValue === Number(cluster.properties.item.formated.amount)))) {
                this.selectMark(cluster.properties.item, true, "task")
              }
            });
          }
          }
        />
    }
    else {
      marker = null
    }
    return (
      marker
    )
  }
  renderMarker = (marker) => {
    let markerComponent;
    if (marker.lat != "None" && marker.lng != "None") {
      markerComponent =
        <TRCMarker
          marker={marker}
          key={marker.id + "_" + marker.lat}
          selected={this.props.selectedMall.id}
          active={marker.active}
          discountMarker={this.state.discountActive}
          cashoutMarker={this.state.shopActive}
          onPress={() => {
            this.state.taskActive ?
              this.selectMark(marker, true, "task")
              :
              this.state.shopActive ?
                this.selectMark(marker, true, "shop") :
                this.selectMark(marker, true, "discount")
          }}
        />
    } else {
      markerComponent = null
    }
    return markerComponent
  }
  render() {
    return (
      <View style={styles.main_view}>
        <CustomAlert
          title={RU.PROFILE_PAGE.ALREADY_ACCOUNT}
          first_btn_title={RU.OK}
          visible={this.state.errorLoginVisible}
          first_btn_handler={() =>
            this.setLoginErrorVisible(!this.state.errorVisible)
          }
          decline_btn_handler={() =>
            this.setLoginErrorVisible(!this.state.errorVisible)
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
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
              this.loadTRC();
          }}
          decline_btn_handler={() => {
            this.setErrorVisible(!this.state.errorVisible);
          }}
        />
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
              this.loadTRC();
          }}
          decline_btn_handler={() => {
            this.setErrorVisible(!this.state.errorVisible);
          }}
        />
        <FacebookLogin
          ref='facebookLogin'
          scopes={['basic']}
          onLoginSuccess={(json) => this.connectFacebook(json.token)}
          onLoginFailure={(data) => {
            CookieManager.clearAll()
              .then((res) => {
                this.props.loaderState(false);
              });
            if (data.msg === "Not enough friends") {
              if (data.subsc_needed) {
                this.setState({ userCount: data.subsc_needed })
                this.setModalVisible(true)
              }
            } else {
              this.setErrorVisible(true)
            }

          }}
        />
        <InstagramLogin
          ref='instagramLogin'
          clientId='7df789fc907d4ffbbad30b7e25ba3933'
          scopes={['basic']}
          onLoginSuccess={(token) => this.connectInsta(token)}
          onLoginFailure={(data) => {
            CookieManager.clearAll()
              .then((res) => {
                this.props.loaderState(false);
              });
          }}
        />
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        {Platform.OS == "ios" ?
          this.state.location_loader && this.props.isLocation && <ActivityIndicator /> :
          this.state.location_loader && <ActivityIndicator />
        }
        <Animated.View style={[styles.state_change_block, {
          transform: [
            {
              translateY: this.state.topNavigationTranslateY
            }
          ]
        }]}>
          <Button style={[styles.state_change_block_btn, styles.state_change_block_btn_left]} transparent onPress={() => this.toggleTab("shop")}>
            {this.state.shopActive && <View style={[styles.state_change_block_btn, styles.state_change_block_btn_left, styles.blue_bg]}></View>}
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.state_change_block_geo}
              source={{ uri: this.state.shopActive ? ICONS.MAP_TABS.SHOP_ACTIVE : ICONS.MAP_TABS.SHOP_INACTIVE }}
            />
            <LinearTextGradient
              locations={[0, 1]}
              colors={[this.state.shopActive ? this.props.userColor.map_blue : this.props.userColor.gray, this.state.shopActive ? this.props.userColor.map_blue : this.props.userColor.gray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.state_change_block_text}>
              {RU.MAP_TABS.SHOP.toUpperCase()}
            </LinearTextGradient>
          </Button>
          <Button style={styles.state_change_block_btn} transparent onPress={() => this.toggleTab("task")}>
            {this.state.taskActive && <View style={[styles.state_change_block_btn, styles.pink_bg]}></View>}
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.state_change_block_geo}
              source={{ uri: this.state.taskActive ? ICONS.MAP_TABS.TASK_ACTIVE : ICONS.MAP_TABS.TASK_INACTIVE }}
            />
            <LinearTextGradient
              locations={[0, 1]}
              colors={[this.state.taskActive ? this.props.userColor.pink : this.props.userColor.gray, this.state.taskActive ? this.props.userColor.pink : this.props.userColor.gray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.state_change_block_text}>
              {RU.MAP_TABS.TASK.toUpperCase()}
            </LinearTextGradient>
          </Button>
          <Button style={[styles.state_change_block_btn, styles.state_change_block_btn_right]} transparent onPress={() => this.toggleTab("discount")}>
            {this.state.discountActive && <View style={[styles.state_change_block_btn, styles.state_change_block_btn_right, styles.violet_bg]}></View>}
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.state_change_block_geo}
              source={{ uri: this.state.discountActive ? ICONS.MAP_TABS.DISCOUNT_ACTIVE : ICONS.MAP_TABS.DISCOUNT_INACTIVE }}
            />
            <LinearTextGradient
              locations={[0, 1]}
              colors={[this.state.discountActive ? this.props.userColor.map_violet : this.props.userColor.gray, this.state.discountActive ? this.props.userColor.map_violet : this.props.userColor.gray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.state_change_block_text}>
              {RU.MAP_TABS.DISCOUNT.toUpperCase()}
            </LinearTextGradient>
          </Button>
        </Animated.View>
        {/* {this.props.isLocation ? (
          <View style={styles.trc_info}>
            <Button style={styles.img_geo_btn} transparent onPress={() => this.props.setInfo(true)}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.img_geo}
                source={{ uri: ICONS.MAP_INFO }}
              />
            </Button>
            {this.props.selectedMall.active ? (
              <TrcInformation
                info={this.props.selectedMall}
                distance={this.props.distance}
              />
            ) : null}
          </View>
        ) : null
        } */}
        {this.state.focusedOnMark &&
          <View style={[styles.cards_block, this.state.cards.length === 1 && { width: width * 0.69, alignSelf: "flex-start" }]}>
            <FlatList
              listKey={"cards"}
              scrollEnabled={this.state.cards.length != 1}
              contentContainerStyle={styles.horizontal_list_content}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.horizontal_list}
              data={this.state.cards}
              removeClippedSubviews={true}
              keyExtractor={(item, index) => item.id + "_" + index}
              renderItem={this._renderItem}>
            </FlatList>
          </View>
        }
        <ClusteredMapView
          key={this.state.mapKey}
          style={styles.map_view}
          data={this.props.outlets}
          initialRegion={this.state.region}
          provider={Platform.OS == "ios" ? PROVIDER_GOOGLE : null}
          ref={(r) => { this.map = r }}
          customMapStyle={mapStyle}
          showsCompass={false}
          animateClusters={false}
          showUserLocation
          followUserLocation
          loadingEnabled
          clusteringEnabled={this.state.discountActive ? false : true}
          onPress={
            this.onRegionChange
          }
          onRegionChangeComplete={
            this.onRegionChange
          }
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster} >
          <Marker
            coordinate={{
              latitude: parseFloat(this.props.location.lat),
              longitude: parseFloat(this.props.location.lng)
            }}
          >
            <UserMarker />
          </Marker>
        </ClusteredMapView>
        <TimerModal />
        <FooterNavigation />
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
    isLocation: state.isLocation,
    isConnected: state.isConnected,
    location: state.location,
    userColor: state.userColor,
    selectedMall: state.selectedMall,
    dashboard: state.dashboard,
    distance: state.distance,
    loader: state.loader,
    token: state.token,
    outlets: state.outlets,
    timer_status: state.timer_status,
    navigateToMall: state.navigateToMall,
    initial_outlets: state.initial_outlets,
    insta_token: state.insta_token,
    facebook_token: state.facebook_token,
    timer_interval: state.timer_interval,
    dateAbuseStatus: state.dateAbuseStatus
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMall,
      showDashboard,
      setInitialOutlets,
      setLocation,
      setDistance,
      loaderState,
      setOutlets,
      setNavigateToMall,
      setInfo,
      setInstaToken,
      setFacebookToken,
      loaderState,
      showTimer,
      showDoneNotification,
      showFailedNotification,
      timerStatus,
      setBalance,
      updateTimer,
      reloadTimer,
      setMainMissionCost
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
