import React from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";
import FastImage from 'react-native-fast-image'
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGameStatus } from "../../../reducers/game-status"
//constants
import styles from './styles';
import { colors } from './../../../constants/colors';
import { RU } from '../../../locales/ru';
import { ICONS } from "../../../constants/icons";
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import CustomProgressBar from '../../containers/custom-progress-bar/custom-progress-bar';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
//services
import "../../../services/correcting-interval";
import NavigationService from "./../../../services/route";

class GameStart extends React.Component {
    state = {};
    componentDidMount = () => { }
    render() {
        return (
            <View style={styles.main_view}>
                <View style={styles.container}>
                    <Text style={styles.zifi_text}>{RU.GAME.ZIFI.WAIT}</Text>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.zifi}
                        source={{ uri: ICONS.ZIFI.SURPRISED }}
                    />
                </View>
                <View style={styles.btn_container}>
                    < CustomButton
                        active
                        gradient
                        title={RU.GAME.RESULT.PUBLISH_AND_CONTINUE.toUpperCase()}
                        color={colors.white}
                        handler={() => {
                            this.props.setGameStatus("start")
                        }}
                    />
                </View>
                <FooterNavigation />
            </View>
        );
    }
}
//
const mapStateToProps = (state) => {
    return {
        game_info: state.game_info,
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setGameStatus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
