import React from "react";
import { View, Text, AsyncStorage, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
import FastImage from "react-native-fast-image";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loaderState } from "../../../reducers/loader";
//constants
import styles from "./styles";
import { ICONS } from "../../../constants/icons";
//containers
import HistoryNavButton from "./../../containers/history-nav-button/history-nav-button";
import PartnersList from "./../../containers/partners-list/partners-list";
import Barcode from "../../containers/barcode/barcode";
import ActivityIndicator from "../../containers/activity-indicator/activity-indicator";
//services
import NavigationService from "./../../../services/route";
import { httpPost } from "../../../services/http";
import { urls } from "../../../constants/urls";
import { handleError } from "../../../services/http-error-handler";
import I18n from "@locales/I18n";

class Partners extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    pickedShops: true,
    showBarcode: false,
    phone: "0000000000000",
    shopLink: "",
    shops: [],
    onlineShops: [],
    currency: ""
  };
  navigateBack = () => {
    NavigationService.navigate("Main");
  };
  componentDidMount = () => {
    AsyncStorage.getItem("user_info").then(value => {
      let object = JSON.parse(value);
      this.setState({
        phone: object.phone.replace(/\D/g, ""),
        currency: object.currency
      });
    });
  };
  componentDidMount = () => {
    this.props.loaderState(true);
    let body = JSON.stringify({
      latt: this.props.location.lat,
      long: this.props.location.lng
    });
    let promise = httpPost(urls.get_partners, body, this.props.token);
    promise.then(
      result => {
        console.log(result);
        let shops = [];
        let onlineShops = [];
        result.body.forEach(element => {
          if (element.online) {
            onlineShops.push(element);
          } else {
            shops.push(element);
          }
        });
        if (onlineShops.length % 2 !== 0) {
          onlineShops.push({ invisible: true });
        }
        if (shops.length % 2 !== 0) {
          shops.push({ invisible: true });
        }
        let sortedShops = this.sortShops(shops);
        let sortedOnlineShops = this.sortShops(onlineShops);
        this.setState({ shops: sortedShops, onlineShops: sortedOnlineShops });
        this.props.loaderState(false);
      },
      error => {
        this.props.loaderState(false);
        let error_respons = handleError(
          error,
          body,
          urls.get_partners,
          this.props.token,
          this.constructor.name,
          "componentDidMount"
        );
      }
    );
  };
  sortShops = shops => {
    return shops.sort(function(a, b) {
      if (!a.invisible && b.invisible) {
        return -1;
      }
      if (a.invisible && !b.invisible) {
        return 1;
      }
      return 0;
    });
  };
  toggleShops = () => {
    this.setState({ pickedShops: !this.state.pickedShops });
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"transparent"}
          translucent={true}
        />
        {this.props.loader && <ActivityIndicator />}
        {this.state.showBarcode && (
          <Barcode
            shopLink={this.state.shopLink}
            phone={this.state.phone}
            closeBarcode={() => {
              this.setState({ showBarcode: !this.state.showBarcode });
            }}
          />
        )}
        <LinearGradient
          colors={[
            this.props.userColor.first_gradient_color,
            this.props.userColor.second_gradient_color
          ]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.grad}
        >
          <View style={styles.history_nav}>
            <Text style={styles.partners_text}>
              {I18n.t("PARTNERS.HERE_YOU_CAN_BUY_BY_EPC", {
                currency: this.state.currency
              })}
            </Text>
            <View style={[styles.block]}>
              <Button
                rounded
                block
                transparent
                onPress={() => this.navigateBack()}
                style={styles.navigation_item}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.icon}
                  source={{ uri: ICONS.COMMON.NAVIGATE_BACK }}
                />
                <Text style={[styles.text, styles.title]}>
                  {I18n.t("HISTORY")}
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.list_container}>
            <View style={styles.nav_buttons}>
              <HistoryNavButton
                handler={
                  !this.state.pickedShops ? () => this.toggleShops() : null
                }
                title={I18n.t("PARTNERS.ONLINE_SHOPS").toUpperCase()}
                disabled={this.state.pickedShops}
              />
              <HistoryNavButton
                handler={
                  this.state.pickedShops ? () => this.toggleShops() : null
                }
                title={I18n.t("PARTNERS.SHOPS").toUpperCase()}
                disabled={!this.state.pickedShops}
              />
            </View>
            <PartnersList
              picked_shops={this.state.pickedShops}
              openBarcode={shopLink => {
                this.setState({
                  shopLink,
                  showBarcode: !this.state.showBarcode
                });
              }}
              shops={this.state.shops}
              onlineShops={this.state.onlineShops}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userColor: state.userColor,
    token: state.token,
    location: state.location
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Partners);
