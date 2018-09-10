import React from "react";
import { View, Image, Platform, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import geolib from "geolib";
//containers
import TrcInformation from "../../containers/trc-information/trc-information";
import UserMarker from "../../containers/user-marker/user-marker";
import TRCMarker from "../../containers/trc-marker/trc-marker";
import LocationDisabled from "../../containers/location-disabled/location-disabled";
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import CurrentGeolocation from "../../containers/current-geolocation/current-geolocation";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//constants
import { mapStyle } from "./mapCustomStyle";
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
import { urls } from "../../../constants/urls";
import { RU } from "./../../../locales/ru";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setLocation } from "../../../reducers/geolocation-coords";
import { setDistance } from "../../../reducers/distance";
import { updateMall } from "../../../reducers/selected-mall";
import { showDashboard } from "../../../reducers/show-dashboard";
import { loaderState } from "../../../reducers/loader";
import { setOutlets } from "../../../reducers/outlet-list";
//services
import { httpPost } from "../../../services/http";
import {sendToTelegramm }from '../../../services/telegramm-notification'

class Map extends React.Component {
  state = {
    location_loader: false,
    errorVisible: false,
    region: {
      latitude: this.props.location.lat,
      longitude: this.props.location.lng,
      latitudeDelta: 0.3,
      longitudeDelta: 0.25
    },
    errorText: "",
    distance: 0
  };
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  moveMapTo = (lat, lng, latD, lngD) => {
    this.map.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: latD || 0.089,
        longitudeDelta: lngD || 0.089
      },
      350
    );
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

        if (this.props.selectedMall.id) {
          this.selectTRC(this.props.selectedMall);
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
        if (error.code === 503) {
          this.setState({ errorText: RU.HTTP_ERRORS.SERVER_ERROR });
        } else if (error.code === 400) {
          this.setState({ errorText: RU.HTTP_ERRORS.NOT_FOUND });
        } else if (error.code === 403) {
          this.setState({ errorText: RU.HTTP_ERRORS.SMTH_WENT_WRONG });
        } else if (error.code === 408) {
          this.setState({ errorText: RU.HTTP_ERRORS.RUNTIME });
        } else {
          this.setState({ errorText: 'code : 500. Internal Server Error' });
        }
        this.props.loaderState(false);
        this.setModalVisible(true);
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
            position.coords.longitude,
            0.0008,
            0.0008
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
  
  selectNearestMall = (my_location, mall_array,ANIMATE_MAP) => {
    let nearestMall = geolib.findNearest(my_location, mall_array, 0);
    try {this.selectTRC(mall_array[Number(nearestMall.key)],ANIMATE_MAP);} catch(e) {}
  };


  selectTRC = (trc,ANIMATE_MAP) => {
    // if (trc.id !== this.props.selectedMall.id) {
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
      this.props.showDashboard(true);
    } else {
      this.props.showDashboard(false);
      ANIMATE_MAP && 
      this.moveMapTo(
        Number(center.latitude),
        Number(center.longitude),
        Math.abs(bounds.maxLat - bounds.minLat) * 1.3,
        Math.abs(bounds.maxLng - bounds.minLng) * 1.3
      );
    }

    // } else {
    //     this.props.updateMall();
    //     this.moveMapTo(this.props.location.lat, this.props.location.lng, 0.0008, 0.0008);
    // }
  };

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
        {this.state.location_loader && <ActivityIndicator />}

        {this.props.isLocation ? (
          <View style={styles.trc_info}>
            <Image
              style={styles.img_geo}
              source={{ uri: ICONS.COMMON.GEOLOCATION_ENABLED }}
            />
            {this.props.selectedMall.active ? (
              <TrcInformation
                info={this.props.selectedMall}
                distance={this.props.distance}
              />
            ) : null}
          </View>
        ) : null}

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
        >
          <Marker
            coordinate={{
              latitude: this.props.location.lat,
              longitude: this.props.location.lng
            }}
          >
            <UserMarker />
          </Marker>
          {this.props.outlets.map(marker => (
            <TRCMarker
              marker={marker}
              key={marker.id}
              selected={this.props.selectedMall.id}
              onPress={() => {
                this.selectTRC(marker);
              }}
            />
          ))}
        </MapView>
        {!this.props.isLocation ? (
          <LocationDisabled />
        ) : (
            this.props.isConnected && (
              <CurrentGeolocation
                onPress={() => {
                  this.getCurrentGeolocation();
                }}
              />
            )
          )}
        <FooterNavigation />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLocation: state.isLocation,
    isConnected: state.isConnected,
    location: state.location,
    selectedMall: state.selectedMall,
    dashboard: state.dashboard,
    distance: state.distance,
    loader: state.loader,
    token: state.token,
    outlets: state.outlets,
    timer_status: state.timer_status,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMall,
      showDashboard,
      setLocation,
      setDistance,
      loaderState,
      setOutlets,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
