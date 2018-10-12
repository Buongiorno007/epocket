import React from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions } from 'react-native';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTempTime } from "../../../reducers/tempTime"
import { setFixedTime } from "../../../reducers/fixedTime"
//constants
import styles from './styles';
import { colors } from '../../../constants/colors';
import { RU } from '../../../locales/ru';
//containers
import CustomButton from '../../containers/custom-button/custom-button';
import CustomProgressBar from '../../containers/custom-progress-bar/custom-progress-bar';
import FooterNavigation from '../../containers/footer-navigator/footer-navigator';
//services
import "../../../services/correcting-interval";
import NavigationService from "../../../services/route";

class GameResult extends React.Component {
    state = {};
    componentDidMount = () => { }
    render() {
        return (
            <View style={styles.main_view}>
                <Text>Game failed, sry</Text>
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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameResult);
