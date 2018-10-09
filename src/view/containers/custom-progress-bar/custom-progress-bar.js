import React, { Component } from "react";
import { View, Animated } from "react-native";
import FastImage from 'react-native-fast-image'
import Icon from "react-native-vector-icons/dist/Entypo";
import { Button } from "native-base";
import { Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//constants
import styles from "./styles";
import { colors } from "./../../../constants/colors";
const { width } = Dimensions.get("window");

{
    /* 
  call example
  
  <CustomProgressBar status={this.state.user.status} src={this.state.user.photo}/>
  
  */
}
class CustomProgressBar extends Component {
    state = {
        width: new Animated.Value(width * 0.85),
    }
    componentDidMount() {
        Animated.timing(this.state.width, {
            toValue: 0,
            duration: this.props.fixedTime * 1000,
        }).start();
    }
    render() {
        return (
            <View style={styles.gradient}>
                {
                    <Animated.View style={[styles.gradient_container, {
                        width: this.state.width
                    }]}>
                        <LinearGradient
                            colors={['rgba(138, 109, 247, 0.75)', 'rgba(245, 88, 144, 0.75)']}
                            start={{ x: 0.0, y: 1.0 }}
                            end={{ x: 1.0, y: 0.0 }}
                            style={[styles.gradient_inner]}
                        />
                    </Animated.View>
                }
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        fixedTime: state.fixedTime
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomProgressBar);

