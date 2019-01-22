import React from "react";
import { View, Text, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
import Barcode from 'react-native-barcode-builder';
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
import { RU } from "../../../locales/ru";
import { ICONS } from "../../../constants/icons";
const { width, height } = Dimensions.get('window');


class BarcodeView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.image_background}
                    source={require('../../../assets/img/ANIMATED_EARN_MORE.gif')}
                />
                <LinearGradient
                    colors={this.props.userColor.earn_more}
                    start={{ x: 0.0, y: 1.4 }}
                    end={{ x: 1.0, y: 0.0 }}
                    style={styles.grad}
                />
                <View style={[styles.block]}>
                    <Button
                        rounded
                        block
                        transparent
                        onPress={() => this.props.closeBarcode()}
                        style={styles.navigation_item}
                    >
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.icon}
                            source={{ uri: ICONS.COMMON.NAVIGATE_BACK }}
                        />
                        <Text style={[styles.text, styles.title]}>{RU.HISTORY}</Text>
                    </Button>
                </View>
                <View style={styles.barcode_container}>
                    <View style={styles.barcode_text_container}>
                        <Text style={styles.barcode_text}>{RU.HISTORY_PAGE.SHOW_THIS_BARCODE}</Text>
                    </View>
                    <View style={styles.barcode}>
                        {this.props.phone &&
                            <Barcode width={2.5} value={this.props.phone} format="EAN13" text={this.props.phone} flat onError={(e) => { console.log("barcode error", e) }} />
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userColor: state.userColor,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BarcodeView);
