import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  findNodeHandle,
  Picker
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { LinearTextGradient } from 'react-native-text-gradient';
import { Button } from 'native-base';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBirthDay } from '../../../reducers/birthday';
//containers
import { DatePicker } from 'react-native-wheel-pick';
//constants
import styles from './styles';
import { ICONS } from '../../../constants/icons';
import { colors } from '../../../constants/colors_men';
import Blur from '../blur/blur';

const firstDay = new Date('1901-01-01');

const today = new Date();

const months = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
];

class CustomAlert extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    chosenDay: '',
    chosenMonth: '',
    chosenYear: '',
    birthday: ''
  };
  componentDidMount() {
    let birthday = `${this.props.birthday.split('.')[1]}-${
      this.props.birthday.split('.')[0]
    }-${this.props.birthday.split('.')[2]}`;
    this.setState({
      birthday: new Date(birthday)
    });
  }

  pickBirthDay(value) {
    this.setState({
      chosenDay: value.getUTCDate(),
      chosenMonth: value.getMonth(),
      chosenYear: value.getFullYear()
    });
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <Blur />
        <View style={styles.content}>
          <View
            style={
              this.props.datepicker
                ? styles.big_content_inner
                : styles.content_inner
            }
          >
            <View style={styles.cross_view}>
              <Button
                transparent
                style={styles.cross_button}
                onPress={() => this.props.decline_btn_handler()}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.cross}
                  source={{ uri: ICONS.COMMON.CLOSE }}
                />
              </Button>
            </View>
            {this.props.datepicker ? (
              <View style={styles.date_modal}>
                <DatePicker
                  order={'D-M-Y'}
                  style={styles.newWheelPicker}
                  textSize={16}
                  itemSpace={15}
                  labelUnit={{ month: months, date: '', year: '' }}
                  locale={'ru'}
                  date={this.state.birthday}
                  minimumDate={firstDay}
                  maximumDate={today}
                  onDateChange={date => {
                    this.pickBirthDay(date);
                  }}
                />
              </View>
            ) : (
              <View style={styles.modal_title}>
                <Text style={styles.modal_title_text}>{this.props.title}</Text>
                {this.props.subtitle && (
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[
                      this.props.userColor.first_gradient_color,
                      this.props.userColor.second_gradient_color
                    ]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={styles.modal_title_text}
                  >
                    {this.props.subtitle}
                  </LinearTextGradient>
                )}
              </View>
            )}
            {this.props.second_btn_title ? (
              <View style={styles.modal_buttons}>
                <Button
                  transparent
                  style={styles.fisrt_small_btn}
                  onPress={() => this.props.first_btn_handler()}
                >
                  <LinearTextGradient
                    locations={[0, 1]}
                    colors={[
                      this.props.userColor.first_gradient_color,
                      this.props.userColor.second_gradient_color
                    ]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={styles.alert_text}
                  >
                    {this.props.first_btn_title}
                  </LinearTextGradient>
                </Button>
                <Button
                  transparent
                  style={styles.second_small_btn}
                  onPress={() => this.props.second_btn_handler()}
                >
                  <Text style={styles.alert_text}>
                    {this.props.second_btn_title}
                  </Text>
                </Button>
              </View>
            ) : (
              <View style={styles.modal_buttons}>
                <Button
                  transparent
                  style={styles.big_centered_button}
                  onPress={() => {
                    this.props.datepicker
                      ? (this.props.setBirthDay({
                          day: this.state.chosenDay + 1,
                          month: this.state.chosenMonth + 1,
                          year: this.state.chosenYear
                        }),
                        this.props.first_btn_handler())
                      : this.props.first_btn_handler();
                  }}
                >
                  {this.props.datepicker || this.props.subtitle ? (
                    <LinearTextGradient
                      locations={[0, 1]}
                      colors={[
                        this.props.userColor.first_gradient_color,
                        this.props.userColor.second_gradient_color
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 1.0, y: 1.0 }}
                      style={styles.alert_text}
                    >
                      {this.props.first_btn_title}
                    </LinearTextGradient>
                  ) : (
                    <Text style={styles.alert_text}>
                      {this.props.first_btn_title}
                    </Text>
                  )}
                </Button>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  userColor: state.userColor,
  birthday: state.birthday
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setBirthDay
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAlert);
