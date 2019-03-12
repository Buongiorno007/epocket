import React from "react";
import {
    View,
    Text,
    Platform,
    Linking
} from "react-native";
import { Button } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import Permissions from "react-native-permissions";
import AndroidOpenSettings from 'react-native-android-open-settings'
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateRootStatus } from "../../../reducers/root-status"
//components
import Blur from "../blur/blur";


class LocationDisabled extends React.Component {
    openSettings = () => {
        if (Platform.OS === "ios") {
            Linking.canOpenURL('app-settings:').then(supported => {
                if (!supported) {
                    console.log('Can\'t handle settings url');
                    Permissions.openSettings();
                } else {
                    return Linking.openURL('app-settings:');
                }
            }).catch(err => console.error('An error occurred', err));
        } else {
            AndroidOpenSettings.generalSettings()
        }
    }
    render() {
        return (
            <View style={styles.main_view}>
                <Blur strong />
                <View style={styles.circle_container}>
                    <Text style={styles.location_disable_text}>
                        {RU.DEVELOPER_ENABLED} {Platform.OS === "ios" ? RU.ROOT_ENABLED_IOS : RU.ROOT_ENABLED_ANDROID}
                    </Text>
                </View>
                <View style={[styles.enable_location, styles.btnContainer]}>
                    <Button
                        transparent
                        style={styles.enable_location}
                        onPress={() => {
                            this.openSettings();
                        }}
                    >
                        <LinearGradient
                            colors={[this.props.userColor.first_gradient_color, this.props.userColor.second_gradient_color]}
                            start={{ x: 0.0, y: 1.0 }}
                            end={{ x: 1.0, y: 1.0 }}
                            style={styles.enable_location}
                        />
                        <Text style={styles.location_enable_text}>
                            {RU.DEVICE_SETTINGS.toUpperCase()}
                        </Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            updateRootStatus
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationDisabled);