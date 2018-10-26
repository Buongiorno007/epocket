import React, { Component, PureComponent } from "react";
import { View, Animated, Easing } from "react-native";
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
  
  <CustomProgressBar />
  
  */
}
class CustomProgressBar extends React.Component {
    state = {
        scaleX: new Animated.Value(1),
        translateX: new Animated.Value(0),
    }
    componentDidMount() {
        Animated.timing(this.state.scaleX, {
            toValue: 0.01,
            duration: this.props.fixedTime * 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }
    render() {
        return (
            <View style={styles.gradient}>
                <Animated.View style={{
                    borderRadius: 12,
                    width: width * 0.85,
                }}>
                    <Animated.View style={[styles.gradient_container, {
                        width: width * 0.85,
                        transform: [
                            { scaleX: this.state.scaleX },
                        ]
                    }]}>
                        <LinearGradient
                            colors={[colors.pink, colors.light_orange]}
                            start={{ x: 0.0, y: 1.0 }}
                            end={{ x: 1.0, y: 0.0 }}
                            style={[styles.gradient_inner]}
                        />
                    </Animated.View>
                </Animated.View>
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

