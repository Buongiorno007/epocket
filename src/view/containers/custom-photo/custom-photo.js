import React, { Component } from "react";
import { View, Image, Platform } from "react-native";
import FastImage from 'react-native-fast-image'
import Icon from "react-native-vector-icons/dist/Entypo";
import { Button } from "native-base";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import LinearGradient from "react-native-linear-gradient";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors_men";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
{
  /* 
call example
status - default false (will be shown icon), if true will be shown photo from src
src - photo's source 

<CustomPhoto status={this.state.user.status} src={this.state.user.photo}/>

*/
}
class CustomPhoto extends Component {
  render() {
    return (
      <View style={styles.custom_photo}>
        {
          this.props.edit &&
          <Button
            transparent
            block
            rounded
            style={styles.edit_photo_btn}
            onPress={() => this.props.PhotoEdit()}>
            <LinearGradient
              colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
              start={{ x: 0.5, y: -0.5 }}
              end={{ x: 0.6, y: 1.0 }}
              style={styles.edit_photo_container}>
              <View style={styles.edit_photo_background}>
                <Icon name='plus' style={styles.edit_photo_img} />
              </View>
            </LinearGradient>
          </Button>
        }

        <LinearGradient
          colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.6, y: 1.0 }}
          style={styles.photo_container}
        >
          {this.props.src ? (
            Platform.OS === "ios" ?
              <FastImage
                style={styles.photo}
                resizeMode={FastImage.resizeMode.сover}
                source={{ uri: "data:image/jpeg;base64," + this.props.src }}
              />
              :
              <Image
                style={styles.photoAndroid}
                source={{ uri: "data:image/jpeg;base64," + this.props.src }}
              />
          ) : (
              <FastImage
                style={styles.icon}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../../assets/img/UNSET_PROILE.png')}
              />
            )}
        </LinearGradient>

      </View>
    );
  }
}
const mapStateToProps = state => ({
  userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomPhoto);