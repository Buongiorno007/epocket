import React from "react";
import { View, Text, StatusBar, ScrollView, AsyncStorage } from "react-native";
//containers
import Status from "./../../containers/trade-status/trade-status";
import Title from "./../../containers/trade-title/trade-title";
import List from "./../../containers/trade-list/trade-list";
import Price from "./../../containers/trade-price/trade-price";
import CustomButton from "./../../containers/custom-button/custom-button";
//constants
import styles from "./styles";
import { RU } from "./../../../locales/ru";
import { colors } from "../../../constants/colors";

import { connect } from "react-redux";
//services
import NavigationService from "./../../../services/route";
class Trade extends React.Component {

  totalApprove = (product_list) => {
    let result = true;
    product_list.forEach((item)=>{
      if (item.approve === false || item.amount === 0) {
        return result = false
      } 
    });
    return result;
  }

  render = () => {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <Status status={this.props.socket.status} total_approve={this.totalApprove(this.props.socket.products)}/>
          <View style={styles.scroll}>
            <Title date={this.props.socket.time} />
            <ScrollView>
              <List list={this.props.socket.products} />
            </ScrollView>
            {this.props.socket.status !== -1 && <Price price={this.props.socket.total} />}
          </View>
        <View style={styles.button}>
          <CustomButton
            active
            gradient
            short
            title={RU.OK}
            color={colors.white}
            handler={() => { NavigationService.navigate("Main"); }}
          />
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => ({
  socket: state.socket,
});

export default connect(
  mapStateToProps,
)(Trade);