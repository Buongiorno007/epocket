import React from "react";
import { View, Platform, StatusBar, FlatList } from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import geolib from "geolib";
import { LinearTextGradient } from "react-native-text-gradient";
import LinearGradient from "react-native-linear-gradient";
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
//services
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";
import NavigationService from "../../../services/route";
import getCurrentGeolocation from "../../../services/get-location"
import { sendToTelegramm } from '../../../services/telegramm-notification'

class Map extends React.Component {
  state = {
    location_loader: false,
    errorVisible: false,
    region: {
      latitude: this.props.location.lat,
      longitude: this.props.location.lng,
      latitudeDelta: 0.04323,
      longitudeDelta: 0.04028
    },
    errorText: "",
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
    }
  };
  toggleTab = (tab) => {
    console.log(this.map.__lastRegion)
    this.map.animateToRegion(
      {
        latitude: this.map.__lastRegion.latitude - 0.0008344042843,
        longitude: this.map.__lastRegion.longitude,
        latitudeDelta: 0.04323,
        longitudeDelta: 0.04028
      },
      450
    );
    if (tab == "shop") {
      this.setState({ shopActive: true, taskActive: false, discountActive: false, focusedOnMark: false })
      let allShops = [...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]
      this.props.setOutlets(allShops);
    }
    else if (tab == "task") {
      this.setState({ shopActive: false, taskActive: true, discountActive: false, focusedOnMark: false })
      this.props.setOutlets(this.props.initial_outlets.outlets);
    }
    else if (tab == "discount") {
      this.setState({ shopActive: false, taskActive: false, discountActive: true, focusedOnMark: false })
      this.props.setOutlets(this.props.initial_outlets.discounts);
    }
  }
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  moveMapTo = (lat, lng, latD, lngD, animation_time, timeout) => {
    setTimeout(() => {
      this.map.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: latD || 0.04323,
          longitudeDelta: lngD || 0.04028
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
    if (nextProps.distance > 0) {
      if (
        this.props.location.lat !== nextProps.location.lat &&
        this.props.location.lng !== nextProps.location.lng
      ) {
        this.props.isLocation && this.selectNearestMall(
          {
            latitude: this.props.location.lat,
            longitude: this.props.location.lng
          },
          this.props.outlets, false
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
    let promise = httpPost(urls.outlets, JSON.stringify({}), this.props.token);
    promise.then(
      result => {
        this.setModalVisible(false);
        this.props.loaderState(false);
        this.props.setOutlets(result.body.outlets)
        this.props.setInitialOutlets(result.body)
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
  getCurrentGeolocation = () => {
    this.props.loaderState(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.setLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        });
        if (!this.props.selectedMall.id) {
          this.moveMapTo(
            position.coords.latitude,
            position.coords.longitude
          );
        }
        if (this.props.selectedMall.id) {
          this.selectTRC(this.props.selectedMall);
        }
        this.props.loaderState(false);
      },
      error => {
        this.props.loaderState(false);
      }
    );
  };

  selectNearestMall = (my_location, mall_array, ANIMATE_MAP) => {
    let nearestMall = geolib.findNearest(my_location, mall_array, 0);
    try { this.selectTRC(mall_array[Number(nearestMall.key)], ANIMATE_MAP); } catch (e) { }
  };

  _renderItem = item => (
    item.item.adress ?
      <CardFirst
        item={item.item}
        key={item.item.id}
        onPressItem={this.openNext}
        btnText={
          this.state.taskActive ? RU.MAP.TASKS.toUpperCase() :
            this.state.shopActive ? RU.MAP.MAKE_PREORDER.toUpperCase() :
              RU.MAP.LIST_PRODUCTS.toUpperCase()
        }
      />
      :
      this.state.taskActive ?
        item.item.status &&
        <CardTask
          item={item.item}
          key={item.item.id}
          onPressItem={this._showSelectedCard}
        />
        : this.state.shopActive ?
          <CardCashout
            item={item.item}
            key={item.item.id}
            onPressItem={this._showSelectedCard}
          />
          :
          <CardCashout
            item={item.item}
            key={item.item.id}
            onPressItem={this._showSelectedCard}
          />
  );
  openNext = selectedCard => {
    console.log(selectedCard)
    console.log(this.state.cards)
    let copyOfCards = [...this.state.cards]
    copyOfCards.shift();
    if (this.state.taskActive) {
      NavigationService.navigate("Dashboard", { dashboard_data: copyOfCards });
    }
    else {
      NavigationService.navigate("Cashout", { cashout_data: copyOfCards });
    }
  }
  _showSelectedCard = selectedCard => {
    // this.props.setDashboardState(2);
    // this.props.setActiveCard(true);
    // this.props.selectMission(this._submissionOrder(selectedCard));
  };
  loadTaskItems = (trc) => {
    this.setModalVisible(false);
    let body = {
      outletId: trc.id
    };
    let promise = httpPost(
      urls.missions,
      JSON.stringify(body),
      this.props.token
    );
    promise.then(
      result => {
        this.setModalVisible(false);
        if (result.status == 200) {
          let cards = result.body.missions;
          cards.unshift(trc)
          this.setState({ cards, focusedOnMark: true })
          //this.props.setMissions(this.getActiveMissions(result.body.missions));
        }
        this.props.loaderState(false);
      },
      error => {
        let error_respons = handleError(error, this.constructor.name, "getMissions");
        this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code });
        this.setModalVisible(error_respons.error_modal);
        this.props.loaderState(false);
      }
    );
  }
  loadCashoutItems = (trc) => {
    this.props.loaderState(true);
    let body;
    if (trc.outlet) {
      body = {
        cashoutId: trc.id // clicked marked = cashout
      };
    }
    else {
      body = {
        outletId: trc.id // clicked marker = outlet
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
      cashoutId: trc.id
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
      (Number(region.latitude).toFixed(3) == this.state.pickedMark.latitude && Number(region.longitude).toFixed(5) == this.state.pickedMark.longitude)) {
      console.log(Number(region.latitude).toFixed(3), Number(region.longitude).toFixed(5))
      console.log(this.state.pickedMark.latitude, this.state.pickedMark.longitude)
    }
    else {
      this.setState({ focusedOnMark: false })
      if (this.state.shopActive) {
        this.props.setOutlets([...this.props.initial_outlets.cashouts, ...this.props.initial_outlets.outlets]);
      } else if (this.state.taskActive) {
        this.props.setOutlets(this.props.initial_outlets.outlets);
      } else {
        this.props.setOutlets(this.props.initial_outlets.discounts);
      }
    }
  }
  selectMark = (trc, ANIMATE_MAP, mark_type) => {
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

    if (distance <= 0 && this.props.isLocation) {
      let copyOfCards = [...this.state.cards]
      copyOfCards.shift();
      if (this.state.taskActive) {
        NavigationService.navigate("Dashboard", { dashboard_data: copyOfCards });
      }
    } else {
      ANIMATE_MAP &&
        this.moveMapTo(
          Number(trc.lat),
          Number(trc.lng),
          0.0058,
          0.0058,
          // Math.abs(bounds.maxLat - bounds.minLat) * 1.3,
          // Math.abs(bounds.maxLng - bounds.minLng) * 1.3
        );
      // use JSON.stringify because js copies array with link, so changes applied to the new array applies to the old one as well
      if (mark_type === "task") {
        this.props.loaderState(true);
        this.loadTaskItems(trc);
        this.props.setOutlets(this.props.initial_outlets.outlets);
        let new_outlets = JSON.parse(JSON.stringify(this.props.initial_outlets.outlets));
        let id = this.props.outlets.indexOf(trc);
        if (new_outlets[id]) {
          new_outlets[id].active = true;
          this.props.setOutlets(new_outlets);
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
    }
  };
  _keyExtractor = (item, index) => item.key;
  render() {
    return (
      <View style={styles.main_view}>
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
            this.loadTRC();
          }}
          decline_btn_handler={() => {
            this.setModalVisible(!this.state.errorVisible);
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
        <LinearGradient
          colors={[this.props.userColor.drag_panel_color, this.props.userColor.transparent]}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 0.0, y: 1 }}
          style={styles.state_change_block_gradient}
        />
        <View style={styles.state_change_block}>
          <Button style={styles.state_change_block_btn} transparent onPress={() => this.toggleTab("shop")}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.state_change_block_geo}
              source={{ uri: this.state.shopActive ? ICONS.MAP_TABS.SHOP_ACTIVE : ICONS.MAP_TABS.SHOP_INACTIVE }}
            />
            <LinearTextGradient
              locations={[0, 1]}
              colors={[this.state.shopActive ? this.props.userColor.first_gradient_color : this.props.userColor.gray, this.state.shopActive ? this.props.userColor.second_gradient_color : this.props.userColor.gray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.state_change_block_text}>
              {RU.MAP_TABS.SHOP}
            </LinearTextGradient>
          </Button>
          <Button style={styles.state_change_block_btn} transparent onPress={() => this.toggleTab("task")}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.state_change_block_geo}
              source={{ uri: this.state.taskActive ? ICONS.MAP_TABS.TASK_ACTIVE : ICONS.MAP_TABS.TASK_INACTIVE }}
            />
            <LinearTextGradient
              locations={[0, 1]}
              colors={[this.state.taskActive ? this.props.userColor.first_gradient_color : this.props.userColor.gray, this.state.taskActive ? this.props.userColor.second_gradient_color : this.props.userColor.gray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.state_change_block_text}>
              {RU.MAP_TABS.TASK}
            </LinearTextGradient>
          </Button>
          <Button style={styles.state_change_block_btn} transparent onPress={() => this.toggleTab("discount")}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={styles.state_change_block_geo}
              source={{ uri: this.state.discountActive ? ICONS.MAP_TABS.DISCOUNT_ACTIVE : ICONS.MAP_TABS.DISCOUNT_INACTIVE }}
            />
            <LinearTextGradient
              locations={[0, 1]}
              colors={[this.state.discountActive ? this.props.userColor.first_gradient_color : this.props.userColor.gray, this.state.discountActive ? this.props.userColor.second_gradient_color : this.props.userColor.gray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.state_change_block_text}>
              {RU.MAP_TABS.DISCOUNT}
            </LinearTextGradient>
          </Button>
        </View>
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
          <View style={styles.cards_block}>
            <FlatList
              listKey={"cards"}
              contentContainerStyle={styles.horizontal_list_content}
              horizontal={true}
              style={styles.horizontal_list}
              data={this.state.cards}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}>
            </FlatList>
          </View>
        }
        <MapView
          style={styles.map_view}
          initialRegion={this.state.region}
          ref={ref => (this.map = ref)}
          provider={Platform.OS == "ios" ? PROVIDER_GOOGLE : null}
          customMapStyle={mapStyle}
          showsCompass={false}
          showUserLocation
          followUserLocation
          loadingEnabled
          onRegionChangeComplete={
            this.onRegionChange
          }
        >
          <Marker
            coordinate={{
              latitude: this.props.location.lat,
              longitude: this.props.location.lng
            }}
          >
            <UserMarker />
          </Marker>
          {
            this.props.outlets.map(marker => (
              marker.lat != "None" && marker.lng != "None" ?
                <TRCMarker
                  marker={marker}
                  key={marker.id}
                  selected={this.props.selectedMall.id}
                  active={marker.active}
                  discountMarker={this.state.discountActive}
                  onPress={() => {
                    this.state.taskActive ?
                      this.selectMark(marker, true, "task")
                      :
                      this.state.shopActive ?
                        this.selectMark(marker, true, "shop") :
                        this.selectMark(marker, true, "discount")
                  }}
                /> :
                null
            ))
          }
        </MapView>
        {
          !this.props.isLocation ? (
            <LocationDisabled />
          ) : (null)
          // : (
          //     this.props.isConnected && (
          //       <CurrentGeolocation
          //         onPress={() => {
          //           this.getCurrentGeolocation();
          //         }}
          //       />
          //     )
          //   )
        }
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
    initial_outlets: state.initial_outlets
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
      setInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
