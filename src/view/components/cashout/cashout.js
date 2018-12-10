import React from "react";
import styles from "./styles";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
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

class Cashout extends React.Component {
  state = {
    errorVisible: false,
    errorText: "",
    products: []
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
    let data = this.separateProducts(this.props.navigation.state.params.cashout_data)
    console.log(data)
    this.setState({ products: data })
  };
  render = () => {
    return (
      <View style={styles.container}>
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
        <Balance
          navigation={{
            title: "Карта",
            direction: "Main"
          }}
        />
        <LinearGradient
          colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
          start={{ x: 0.0, y: 5.0 }}
          end={{ x: 1.0, y: 5.0 }}
          style={styles.grad}
        />
        <List data={this.state.products} dataInit={this.props.navigation.state.params.cashout_data} />
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
