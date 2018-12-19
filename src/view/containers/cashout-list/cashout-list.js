import React from "react";
import { View, ScrollView, Text, TouchableOpacity, FlatList, Animated, Image, Easing, Dimensions } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image'
//containers
import Item from "./../../containers/cashout-list-item/cashout-list-item";
import CustomButton from "./../../containers/custom-button/custom-button";
import CustomAlert from "../custom-alert/custom-alert";
import HistoryNavButton from "./../../containers/history-nav-button/history-nav-button";
import CartCard from "./../../containers/cashout-cart-card/cashout-cart-card"
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";
import { urls } from "../../../constants/urls";
import { colors } from "../../../constants/colors_men";
import { ICONS } from "./../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSocket } from "../../../reducers/socket";
import { loaderState } from "../../../reducers/loader";
//services
import NavigationService from "./../../../services/route";
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";

const { width, height } = Dimensions.get("window");

class CashoutList extends React.Component {
  state = {
    errorVisible: false,
    errorText: "",
    pickedCart: true,
    orderCopy: [],
    activeSections: [],
    rotateAngle: new Animated.Value(0)
  };
  order = [];

  pickCart = () => {
    let pick = this.state.pickedCart;
    this.setState({ pickedCart: !pick, activeSections: [] });
  };
  pickAll = () => {
    let pick = this.state.pickedCart;
    this.setState({ pickedCart: !pick });
  };
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  addItemToOrder = order_item => {
    this.order = this.order.filter(filter_item => {
      return filter_item.id !== order_item.id;
    });
    if (order_item.count) {
      this.order.push(order_item);
      this.setState({ orderCopy: this.order })
    }
  };
  deleteElem = order_item => {
    let copy = [...this.order];
    let spliceId;
    let order_item_category = order_item.category.id;
    for (let i = 0; i < this.order.length; i++) {
      if (this.order[i].id === order_item.id) {
        spliceId = i;
      }
    }
    copy.splice(spliceId, 1);
    this.order = copy;
    this.setState({
      orderCopy: copy
    });
    let deletedCatIndex = this.props.data.findIndex(x => x.id === order_item_category);
    let deletedCat = this.props.data[deletedCatIndex];
    let pickedProduct = deletedCat.products.find(x => x.id === order_item.id);
    pickedProduct.count = 0;
  };
  sendOrder = () => {
    total_price = 0;
    let copyForCategoryClean = [...this.order];
    copyForCategoryClean.forEach(item => {
      /*
        ВОТ ЭТА СТРОЧКА
        item.amount = item.count;
        НУЖНА ДЛЯ КОРЕКТНОЙ ПЕРЕДАЧИ ВЫБРАНОГО КОЛЛИЧЕСТВА ПРОДУКТОВ КОБНАЛИЧИВАНИЮ
        ОНА НУЖНА ПОТОМУ ЧТО БЕКЕНД ПРИНИМАЕТ ПОЛЕ amount 
      */
      item.amount = item.count;
      item.category.products = [];
      total_price += item.count * item.price;
    });
    if (total_price) {
      this.setModalVisible(false);
      this.props.loaderState(true);
      let body = {
        outletId: this.props.selectedMall.id,
        products: copyForCategoryClean
      };
      console.log(body)
      let promise = httpPost(
        urls.create_order,
        JSON.stringify(body),
        this.props.token
      );
      promise.then(
        result => {
          this.setModalVisible(false);
          this.props.loaderState(false);
          NavigationService.navigate("QrCode", {
            total_price: total_price,
            link: result.body.link,
            orderId: result.body.orderId,
            general_info: this.props.general_info,
            copyOfCards: this.props.dataInit
          });
        },
        error => {
          let error_respons = handleError(error, this.constructor.name, "sendOrder");
          this.setState({ errorText: error_respons.error_text });
          this.setModalVisible(error_respons.error_modal);
          this.props.loaderState(false);
        }
      );
    }
  };
  componentWillReceiveProps = (nextProps) => {
    console.log("componentWillReceiveProps", nextProps.draggedDown)
  }
  checkForActive = (section, isActive) => {
    spin = '0deg';
    if (isActive) {
      Animated.timing(
        this.state.rotateAngle,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ).start()
      spin = this.state.rotateAngle.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      })
    }
    return spin;
  }
  _renderHeader = (section, index, isActive, sections) => {
    spin = '0deg';
    spin = this.checkForActive(section, isActive)
    return (
      <View style={styles.header}>
        <View style={[styles.header_container, section.id != this.props.data[0].id && styles.borderTop]}>
          <View style={styles.left_part}>
            <FastImage
              style={styles.round_image}
              resizeMode={FastImage.resizeMode.contain}
              source={require("../../../assets/img/settings.png")}
            />
            <View style={styles.header_text}>
              <Text style={styles.header_name}>{section.name.toUpperCase()}</Text>
              <Text style={styles.positions}>{
                section.products.length === 1 ?
                  section.products.length + " " + RU.CASHOUT_LIST.POSITIONS_1 :
                  section.products.length > 1 && section.products.length <= 4 ?
                    section.products.length + " " + RU.CASHOUT_LIST.POSITIONS_2 :
                    section.products.length + " " + RU.CASHOUT_LIST.POSITIONS_3
              }</Text>
            </View>
          </View>
          <Animated.Image
            style={[styles.arrow, {
              transform: [
                {
                  rotate: spin
                }
              ]
            }]}
            source={require('../../../assets/img/arrow_down.png')}
          />
        </View>
      </View>
    );
  };
  _renderContent = section => {
    return (
      <View style={styles.content}>
        {section.products.map((item, i) => (
          <Item
            key={i}
            item={item}
            copyOfCards={this.props.dataInit}
            addItemToOrder={this.addItemToOrder}
            general_info={this.props.general_info}
          />
        ))}
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  _renderRow = item => (
    <Item
      key={item.item.id}
      item={item.item}
      copyOfCards={this.props.dataInit}
      addItemToOrder={this.addItemToOrder}
    />
  );
  _renderItem = item => (
    <CartCard
      key={item.item.id}
      cardInfo={item.item}
      deleteElem={this.deleteElem}
    />
  );
  render = () => {
    return (
      <View style={styles.container}>
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
            this.sendOrder();
          }}
          decline_btn_handler={() => {
            this.setModalVisible(!this.state.errorVisible);
          }}
        />
        <View style={styles.nav_buttons}>
          <HistoryNavButton
            handler={
              !this.state.pickedCart
                ? () => this.pickAll()
                : null
            }
            title={RU.CASHOUT_LIST.LIST_OF_PRODUCTS}
            disabled={this.state.pickedCart}
          />
          <HistoryNavButton
            handler={
              this.state.pickedCart
                ? () => this.pickCart()
                : null
            }
            title={RU.CASHOUT_LIST.CART}
            disabled={!this.state.pickedCart}
            cartCount={this.state.orderCopy.length}
          />
        </View>
        {this.props.data.length > 0 ? (
          <View style={styles.container_for_scroll}>
            {this.state.pickedCart ?
              <ScrollView
                style={[styles.scroll, this.props.draggedDown && { height: height * 0.55 }]}
                showsVerticalScrollIndicator={false}
              >
                <Accordion
                  activeSections={this.state.activeSections}
                  onChange={this._updateSections}
                  sectionContainerStyle={styles.header}
                  touchableComponent={TouchableOpacity}
                  sections={this.props.data}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                />
                <View style={styles.filler} />
              </ScrollView>
              :
              <View style={[styles.cart_container, this.props.draggedDown && { height: height * 0.55 }]}>
                {this.state.orderCopy.length ?
                  <FlatList
                    listKey={"cart"}
                    contentContainerStyle={{
                      alignItems: "center",
                    }}
                    showsVerticalScrollIndicator={false}
                    style={[styles.scroll_fixed, this.props.draggedDown && { height: height * 0.55 }]}
                    data={this.state.orderCopy}
                    renderItem={this._renderItem}>
                  </FlatList>
                  :
                  <View style={styles.empty_cart}>
                    <Text>{RU.CASH.NO_CART}</Text>
                  </View>
                }
                {this.state.orderCopy.length ?
                  <View style={styles.button}>
                    <CustomButton
                      active
                      gradient
                      short
                      title={RU.CASH.BUTTON}
                      color={this.props.userColor.white}
                      handler={() => this.sendOrder()}
                    />
                  </View>
                  :
                  null
                }
              </View>
            }

          </View>
        ) : (
            <View style={styles.empty}>
              <Text>{RU.CASH.NO_CASH}</Text>
            </View>
          )}
      </View>
    );
  };
}
const mapStateToProps = state => ({
  selectedMall: state.selectedMall,
  userColor: state.userColor,
  token: state.token,
  loader: state.loader
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSocket,
      loaderState
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashoutList);
