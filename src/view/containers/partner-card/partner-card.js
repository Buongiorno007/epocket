import React from "react";
import { View, Text, FlatList, Linking } from "react-native";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class PartnerCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let item = this.props.item
        return (
            <Button
                rounded
                block
                onPress={() => {
                    if (!this.props.picked_shops) {
                        this.props.openBarcode(item.link)
                    }
                    else {
                        this.prosp.openLink(item.link)
                    }
                }}
                style={styles.partner_card}
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.icon}
                    source={{ uri: item.icom ? item.icon : ICONS.COMMON.PARTNERS }}
                />
                <View style={styles.border} />
                <Text numberOfLines={1} style={styles.partner_title}>{item.name.toUpperCase()}</Text>
            </Button>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.token,
        userColor: state.userColor,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerCard);
