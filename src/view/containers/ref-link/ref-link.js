import React from "react";
import { View, Text, Platform, FlatList } from "react-native";
import FastImage from "react-native-fast-image";
import { Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import PickedLanguage from "./../../../locales/language-picker";
import { ICONS } from "../../../constants/icons";
import { colors } from "./../../../constants/colors";
//services
import {
  shareToAllSocial,
  shareToOneSocial
} from "./../../../services/share-ref-link";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTabState } from "../../../reducers/tabs";
class RefLink extends React.Component {
  state = {
    shareMenuOpen: false,
    share_link: "",
    social: []
  };
  componentWillReceiveProps = nextProps => {
    this.setState({
      share_link: nextProps.link,
      social: [
        {
          title: PickedLanguage.REF_LINK.COPY,
          subTitle: nextProps.link,
          iconUrl: ICONS.REF_LINK.COPY_ICON,
          type: "copy"
        },
        {
          title: PickedLanguage.REF_LINK.VIBER,
          iconUrl: ICONS.REF_LINK.VIBER_ICON,
          type: "viber"
        },
        {
          title: PickedLanguage.REF_LINK.TELEGRAM,
          iconUrl: ICONS.REF_LINK.TELEGRAM_ICON,
          type: "telegram"
        },
        Platform.OS === "ios"
          ? null
          : {
              title: PickedLanguage.REF_LINK.INSTAGRAM,
              iconUrl: ICONS.REF_LINK.INSTAGRAM_ICON,
              type: "instagram"
            },
        {
          title: PickedLanguage.REF_LINK.FACEBOOK_MESSENGER,
          iconUrl: ICONS.REF_LINK.FACEBOOK_ICON,
          type: "facebook-messenger"
        },
        {
          title: PickedLanguage.REF_LINK.MORE,
          iconUrl: ICONS.REF_LINK.MORE_ICON,
          lastOne: true,
          type: "all"
        }
      ]
    });
  };
  openShareMenu = () => {
    this.setState({ shareMenuOpen: !this.props.toogle });
  };
  _renderItem = item =>
    item.item ? (
      <Button
        transparent
        style={[styles.list_item, item.item.lastOne && styles.last_list_item]}
        onPress={() => {
          shareToOneSocial(
            this.state.share_link,
            this.props.price,
            item.item.type
          );
        }}
      >
        <FastImage
          style={styles.list_item_image}
          resizeMode={FastImage.resizeMode.contain}
          source={{ uri: item.item.iconUrl }}
        />
        <View style={styles.list_item_text}>
          <Text style={styles.list_item_title}>{item.item.title}</Text>
          {item.item.subTitle ? (
            <Text style={styles.list_item_subtitle}>{item.item.subTitle}</Text>
          ) : null}
        </View>
      </Button>
    ) : null;
  render = () => {
    return (
      <View
        style={
          this.props.toogle ? styles.opened_share_menu : styles.container
        }
      >
        <Button
          transparent
          style={[styles.container, styles.gradient_background]}
          onPress={() => {
            this.props.setToogle(true);
          }}
        >
          <LinearGradient
            colors={[
              this.props.userColor.first_gradient_color,
              this.props.userColor.second_gradient_color
            ]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={[styles.container, styles.gradient_background]}
          />
          <FastImage
            style={styles.add_friend_image}
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: ICONS.REF_LINK.ADD_FRIEND }}
          />
          <Text style={styles.ref_link_text}>
            + {this.props.price} {PickedLanguage.REF_LINK.GET_EPC}
          </Text>
          <FastImage
            style={styles.navigate_forward}
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: ICONS.REF_LINK.ARROW_RIGHT }}
          />
        </Button>
        {this.props.toogle ? (
          <View style={styles.opened_share_menu}>
            <View style={styles.top_container}>
              <LinearGradient
                colors={[
                  this.props.userColor.first_gradient_color,
                  this.props.userColor.second_gradient_color
                ]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={[styles.top_container_gradient_background]}
              />
              <Button
                rounded
                block
                transparent
                androidRippleColor={this.props.userColor.card_shadow}
                style={styles.button_close}
                onPress={() => {
                  this.props.setToogle(false)
                //   this.props.setTabState(0);
                //   this.props.setTabState(3);
                }}
              >
                <FastImage
                  style={styles.icon_close}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{ uri: ICONS.COMMON.CLOSE_WHITE }}
                />
              </Button>
              <Text style={styles.opened_share_title}>
                + {this.props.price}{" "}
                {PickedLanguage.REF_LINK.FOR_YOU_AND_YOUR_FRIEND}
              </Text>
            </View>
            <View style={styles.share_list}>
              <FlatList
                listKey={"social"}
                contentContainerStyle={styles.list_content}
                style={styles.list}
                data={this.state.social}
                removeClippedSubviews={true}
                keyExtractor={(item, index) => "_" + index}
                renderItem={this._renderItem}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };
}

const mapStateToProps = state => ({
  userColor: state.userColor
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTabState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefLink);
