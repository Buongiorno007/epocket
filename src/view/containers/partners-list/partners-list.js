import React from "react";
import { View, Text, FlatList, Linking } from "react-native";
import { Button } from "native-base";
import FastImage from "react-native-fast-image";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";
//containers
import PartnerCard from "./../../containers/partner-card/partner-card";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "@locales/I18n";

class PartnersList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    limitShops: 10,
    limitOnlineShops: 10
  };
  componentDidMount = () => {
    this.refreshList();
  };
  refreshList = () => {};
  openLink = link => {
    Linking.canOpenURL(link)
      .then(supported => {
        if (!supported) {
          console.log("Not supported");
        } else {
          Linking.openURL(link);
        }
      })
      .catch(err => console.log(err));
  };
  _renderItem = ({ item, index }) => {
    return (
      <PartnerCard
        picked_shops={this.props.picked_shops}
        index={index}
        item={item}
        openBarcode={this.props.openBarcode}
        openLink={this.openLink}
      />
    );
  };
  _keyExtractor = (item, index) => index;
  render() {
    return (
      <View style={styles.container}>
        {!this.props.picked_shops ? (
          <View>
            <View>
              {this.props.shops.length > 0 ? (
                <FlatList
                  style={styles.list}
                  data={this.props.shops}
                  horizontal={false}
                  numColumns={2}
                  removeClippedSubviews={true}
                  contentContainerStyle={styles.contentContainerStyle}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                  onScrollBeginDrag={() => {
                    let old_limitShops = this.state.limitShops;
                    this.setState({ limitShops: old_limitShops + 10 });
                    this.refreshList();
                  }}
                >
                  <View style={styles.filler} />
                </FlatList>
              ) : (
                <View style={styles.empty}>
                  <Text style={styles.no_shops}>
                    {I18n.t("PARTNERS.NO_SHOPS")}
                  </Text>
                  <View style={styles.filler} />
                </View>
              )}
            </View>
          </View>
        ) : (
          <View>
            <View>
              {this.props.onlineShops.length > 0 ? (
                <FlatList
                  style={styles.list}
                  data={this.props.onlineShops}
                  keyExtractor={this._keyExtractor}
                  horizontal={false}
                  numColumns={2}
                  contentContainerStyle={styles.contentContainerStyle}
                  renderItem={this._renderItem}
                  removeClippedSubviews={true}
                  onScrollBeginDrag={() => {
                    let old_limitOnlineShops = this.state.limitOnlineShops;
                    this.setState({
                      limitOnlineShops: old_limitOnlineShops + 10
                    });
                    this.refreshList();
                  }}
                >
                  <View style={styles.filler} />
                </FlatList>
              ) : (
                <View style={styles.empty}>
                  <Text style={styles.no_shops}>
                    {I18n.t("PARTNERS.NO_SHOPS")}
                  </Text>
                  <View style={styles.filler} />
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.token,
    userColor: state.userColor
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnersList);
