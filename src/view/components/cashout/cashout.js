import React from "react";
import styles from "./styles";
import { View, PanResponder, Animated, Dimensions, Easing, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FastImage from 'react-native-fast-image'
//containers
import List from "../../containers/cashout-list/cashout-list";
import Balance from "../../containers/cashout-balance/cashout-balance";
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
import CustomAlert from "../../containers/custom-alert/custom-alert";
import TimerModal from "../../containers/timer-modal/timer-modal";
//constants
import { urls } from "../../../constants/urls";
import { RU } from "../../../locales/ru";
import { colors } from "../../../constants/colors_men";
//redux
import { setBalance } from "../../../reducers/user-balance";
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//services
import { httpPost } from "../../../services/http";
import { handleError } from "../../../services/http-error-handler";

const { width, height } = Dimensions.get('window');

class Cashout extends React.Component {
  state = {
    errorVisible: false,
    errorText: "",
    products: [],
    topScaleY: new Animated.Value(1),
    topHeight: new Animated.Value(height * 0.15),
    topBigHeight: new Animated.Value(height * 0.35),
    topImageOpacity: new Animated.Value(1),
    draggedDown: true
  };
  setModalVisible = visible => {
    this.setState({ errorVisible: visible });
  };
  separateProducts = (list_of_products) => {
    let categoryList = [];
    let addedIds = [];
    let separatedList = [];
    if (list_of_products.length > 0) {
      addedIds.push(list_of_products[0].category.id)
      for (let i = 0; i < list_of_products.length; i++) {
        if (!addedIds.includes(list_of_products[i].category.id)) {
          addedIds.push(list_of_products[i].category.id)
        }
      }
      addedIds.forEach(element => {
        let category = list_of_products.find(x => x.category.id === element).category;
        categoryList.push(category)
      });
      separatedList = [...categoryList];
      separatedList.map(function (element) {
        element.products = []
      })
      categoryList.forEach(category => {
        list_of_products.forEach(product => {
          if (product.category.id === category.id) {
            let categoryCopy = categoryList.find(x => x.id === category.id);
            categoryCopy.products.push(product)
          }
        });
      });
    }
    return separatedList;
  }
  componentDidMount = () => {
    console.log()
    let data = this.separateProducts(this.props.navigation.state.params.cashout_data)
    this.setState({ products: data })
  };
  animateTop = (topScaleProps, topHeightProps, topImageOpacityProps, topBigHeightProps) => {
    Animated.parallel([
      Animated.timing(this.state.topScaleY,
        {
          toValue: topScaleProps.toValue,
          duration: topScaleProps.duration,
          easing: Easing.linear
        }),
      Animated.timing(this.state.topHeight,
        {
          toValue: topHeightProps.toValue,
          duration: topHeightProps.duration,
          easing: Easing.linear
        }),
      Animated.timing(this.state.topImageOpacity,
        {
          toValue: topImageOpacityProps.toValue,
          duration: topImageOpacityProps.duration,
          easing: Easing.linear
        })
      ,
      Animated.timing(this.state.topBigHeight,
        {
          toValue: topBigHeightProps.toValue,
          duration: topBigHeightProps.duration,
          easing: Easing.linear
        })
    ]).start();
  }
  getDirectionAndColor = (dy, moveY) => {
    const draggedDown = dy > 30;
    const draggedUp = dy < -30;
    console.log(dy)
    if (moveY < 233) {
      if (draggedDown) {
        console.log('draggedDown ')
        this.animateTop(
          {
            toValue: 1,
            duration: 150
          },
          {
            toValue: height * 0.15,
            duration: 100,
          },
          {
            toValue: 1,
            duration: 150,
          },
          {
            toValue: height * 0.35,
            duration: 150,
          }
        );
        this.setState({ draggedDown: true })
      }
      if (draggedUp) {
        console.log('draggedUp ')
        this.animateTop(
          {
            toValue: 0,
            duration: 100,
          },
          {
            toValue: 0,
            duration: 150,
          },
          {
            toValue: 0,
            duration: 150,
          },
          {
            toValue: height * 0.12,
            duration: 150,
          }
        );
        this.setState({ draggedDown: false })
      }
    }
  }
  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.getDirectionAndColor(gestureState.dy, gestureState.moveY);
      },
      onPanResponderRelease: (evt, gestureState) => {
      }
    })
  }
  render = () => {
    return (
      <View
        style={styles.container}
      >
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
            //this.loadData();
          }}
          decline_btn_handler={() => {
            this.setModalVisible(!this.state.errorVisible);
            this.props.loaderState(false);
          }}
        />
        <Animated.View
          style={[styles.top, {
            height: this.state.topBigHeight,
          }]}
          {...this._panResponder.panHandlers}
        >
          <Balance
            navigation={{
              title: "Карта",
              direction: "Main"
            }}
          />
          <Animated.View
            style={[styles.cashout_top,
            {
              height: this.state.topHeight,
              transform: [
                {
                  scaleY: this.state.topScaleY
                }
              ]
            }
            ]}>
            <Text numberOfLines={1} style={styles.general_text} >{this.props.navigation.state.params.general_info.adress}</Text>
            <Text numberOfLines={1} style={styles.general_text_big}>{this.props.navigation.state.params.general_info.name}</Text>
          </Animated.View>
        </Animated.View>
        <LinearGradient
          colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
          start={{ x: 0.0, y: 5.0 }}
          end={{ x: 1.0, y: 5.0 }}
          style={styles.grad}
        />
        <Animated.Image
          style={[styles.background_image, {
            opacity: this.state.topImageOpacity
          }]}
          source={{ uri: this.props.navigation.state.params.general_info.photo }}
        />
        <Animated.View style={[styles.background_image_mask, {
          opacity: this.state.topImageOpacity
        }]} />
        <List
          general_info={this.props.navigation.state.params.general_info}
          draggedDown={this.state.draggedDown}
          data={this.state.products}
          dataInit={this.props.navigation.state.params.cashout_data} />
        <TimerModal />
      </View>
    );
  };
}
const mapStateToProps = state => ({
  selectedMall: state.selectedMall,
  token: state.token,
  userColor: state.userColor,
  loader: state.loader
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setBalance,
      loaderState
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cashout);
