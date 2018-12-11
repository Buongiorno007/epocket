import React from "react";
import { View, Text, Image } from "react-native";
import FastImage from 'react-native-fast-image'
import { Button } from "native-base";
import Close from "react-native-vector-icons/Feather";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors_men";
//services
import NavigationService from "./../../../services/route";
//redux
import { loaderState } from "../../../reducers/loader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ICONS } from "./../../../constants/icons";
import { RU } from "./../../../locales/ru";

class CartCard extends React.Component {
    state = {
        count: 0,
    };
    cardInfo = this.props.cardInfo
    deleteElement = () => {
        this.props.deleteElem(this.cardInfo)
    }
    render = () => {
        return (
            <View style={styles.container}>
                <View style={styles.left_image_container}>
                    <FastImage
                        style={styles.left_image}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: this.cardInfo.photo }}
                    />
                </View>
                <View style={styles.info}>
                    <View style={styles.left_info}>
                        <View style={styles.title_and_count}>
                            <Text numberOfLines={1} style={styles.name_text}>{this.cardInfo.name.toUpperCase()} </Text>
                            <Text numberOfLines={1} style={styles.count_text}> x {this.cardInfo.count}</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.count_text}>Description in progress</Text>
                    </View>
                    <View style={styles.right_info}>
                        <Text numberOfLines={1} style={styles.price_text}>{this.cardInfo.price} {RU.EPC}</Text>
                        <Button
                            rounded
                            block
                            transparent
                            androidRippleColor={this.props.userColor.card_shadow}
                            style={styles.button_close}
                            onPress={() => this.deleteElement()}
                        >
                            <Close name="x" style={styles.icon} />
                        </Button>
                    </View>
                </View>
            </View >
        );
    };
}

const mapStateToProps = state => ({
    userColor: state.userColor,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartCard);
