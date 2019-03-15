import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "native-base";
import FastImage from 'react-native-fast-image'
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
import { ICONS } from "../../../constants/icons";
//containers
import HistoryNavButton from "./../../containers/history-nav-button/history-nav-button";
import PartnersList from "./../../containers/partners-list/partners-list";
import Barcode from "../../containers/barcode/barcode"
//services
import NavigationService from "./../../../services/route";


class Partners extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        pickedShops: true,
        showBarcode: false,
        phone: "0000000000000",
        shopLink: ""
    }
    navigateBack = () => {
        NavigationService.navigate("Main")
    }
    componentWillMount = () => {
        AsyncStorage.getItem('user_info').then((value) => {
            let object = JSON.parse(value);
            this.setState({
                phone: object.phone.replace(/\D/g, '')
            });
        });
    }
    toggleShops = () => {
        this.setState({ pickedShops: !this.state.pickedShops });
    };
    render() {
        return (
            <View style={styles.container}>
                {this.state.showBarcode &&
                    <Barcode
                        shopLink={this.state.shopLink}
                        phone={this.state.phone}
                        closeBarcode={() => { this.setState({ showBarcode: !this.state.showBarcode }) }} />}
                <LinearGradient
                    colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={styles.grad}
                >
                    <View style={styles.history_nav}>
                        <Text style={styles.partners_text}>{RU.PARTNERS.HERE_YOU_CAN_BUY_BY_EPC}</Text>
                        <View style={[styles.block]}>
                            <Button
                                rounded
                                block
                                transparent
                                onPress={() => this.navigateBack()}
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
                    </View>
                    <View style={styles.list_container}>
                        <View style={styles.nav_buttons}>
                            <HistoryNavButton
                                handler={
                                    !this.state.pickedShops
                                        ? () => this.toggleShops()
                                        : null
                                }
                                title={RU.PARTNERS.ONLINE_SHOPS.toUpperCase()}
                                disabled={this.state.pickedShops}
                            />
                            <HistoryNavButton
                                handler={
                                    this.state.pickedShops
                                        ? () => this.toggleShops()
                                        : null
                                }
                                title={RU.PARTNERS.SHOPS.toUpperCase()}
                                disabled={!this.state.pickedShops}
                            />
                        </View>
                        <PartnersList
                            picked_shops={this.state.pickedShops}
                            openBarcode={(shopLink) => {
                                this.setState({ shopLink, showBarcode: !this.state.showBarcode })
                            }}
                            shops={[
                                {
                                    name: "varus",
                                    icon: null,
                                    link: "http://varus.com"
                                },
                                {
                                    name: "silpo",
                                    icon: null,
                                    link: "http://silpo.com"
                                },
                                {
                                    name: "title looooooooooooong",
                                    icon: null,
                                    link: "http://title.com"
                                },
                            ]}
                            onlineShops={[
                                {
                                    name: "allo",
                                    icon: null,
                                    link: "http://google.com"
                                },
                                {
                                    name: "rozetka",
                                    icon: null,
                                    link: "http://google.com"
                                },
                            ]} />
                    </View>
                </LinearGradient>
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
)(Partners);
