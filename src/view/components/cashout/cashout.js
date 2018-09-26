import React from "react";
import styles from "./styles";
import { View, AsyncStorage } from "react-native";
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
import { colors } from "../../../constants/colors";
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
  loadData = () => {
    this.setModalVisible(false);
    this.props.loaderState(true);
    let body = {
      outletId: this.props.selectedMall.id
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
        AsyncStorage.setItem("balance", String(result.body.balance), () => {
          this.props.setBalance(result.body.balance);
        });
        this.setState({ products: result.body.products });
      },
      error => {
        // this.props.loaderState(false);
        let error_respons = handleError(error, this.constructor.name, "loadData");
        this.setState({ errorText: error_respons.error_text });
        this.setModalVisible(error_respons.error_modal);
      }
    );
  };
  componentDidMount = () => {
    this.props.selectedMall.id && this.loadData();
    // this.props.loaderState(true);
  };

  render = () => {
    return (
      <View style={styles.container}>
        <CustomAlert
          title={this.state.errorText}
          first_btn_title={RU.REPEAT}
          visible={this.state.errorVisible}
          first_btn_handler={() => {
            this.loadData();
          }}
          decline_btn_handler={() => {
            this.setModalVisible(!this.state.errorVisible);
            this.props.loaderState(false);
          }}
        />
        <LinearGradient
          colors={[colors.orange, colors.pink]}
          start={{ x: 0.0, y: 5.0 }}
          end={{ x: 1.0, y: 5.0 }}
          style={styles.grad}
        />
        <Balance />
        <List data={this.state.products} />
        <TimerModal />
        <FooterNavigation />
      </View>
    );
  };
}
const mapStateToProps = state => ({
  selectedMall: state.selectedMall,
  token: state.token,
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
