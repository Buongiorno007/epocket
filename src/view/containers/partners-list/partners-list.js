import React from "react";
import { View, Text, FlatList, Linking } from "react-native";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { colors } from "./../../../constants/colors";
import { ICONS } from "../../../constants/icons";
//containers
import HistoryCard from "./../../containers/history-card/history-card";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class HistoryList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        limitShops: 10,
        limitOnlineShops: 10,
    };
    componentDidMount = () => {
        this.refreshList();
    };
    refreshList = () => {
    };
    openLink = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                console.log("Not supported")
            } else {
                Linking.openURL(link);
            }
        }).catch(err => console.log(err));
    }
    _renderItem = ({ item }) => {
        return (
            <Button
                rounded
                block
                onPress={() => {
                    if (!this.props.picked_shops) {
                        this.props.openBarcode(item.link)
                    }
                    else {
                        this.openLink(item.link)
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
        )
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
                                    contentContainerStyle={styles.contentContainerStyle}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this._renderItem}
                                    onScrollBeginDrag={() => {
                                        let old_limitShops = this.state.limitShops;
                                        this.setState({ limitShops: old_limitShops + 10 });
                                        this.refreshList();
                                    }}
                                >
                                    {/* render cards here (use flatlist) */}
                                    <View style={styles.filler} />
                                </FlatList>
                            ) : (
                                    <View style={styles.empty}>
                                        <Text style={styles.no_shops}>{RU.PARTNERS.NO_SHOPS}</Text>
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
                                        onScrollBeginDrag={() => {
                                            if (!this.props.receivedBonusesJSX.loader || !this.props.spentBonusesJSX.loader) {
                                                let old_limitOnlineShops = this.state.limitOnlineShops;
                                                this.setState({ limitOnlineShops: old_limitOnlineShops + 10 });
                                                this.refreshList();
                                            }
                                        }}
                                    >
                                        {/* render cards here (use flatlist) */}
                                        <View style={styles.filler} />
                                    </FlatList>
                                ) : (
                                        <View style={styles.empty}>
                                            <Text style={styles.no_shops}>{RU.PARTNERS.NO_SHOPS}</Text>
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
        userColor: state.userColor,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryList);
