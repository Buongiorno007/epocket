import React from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Keyboard,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'native-base';
import FastImage from 'react-native-fast-image';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loaderState } from '../../../reducers/loader';
//constants
import styles from './styles';
import { ICONS } from '../../../constants/icons';
//containers
import HistoryNavButton from './../../containers/history-nav-button/history-nav-button';
import PartnersList from './../../containers/partners-list/partners-list';
import Barcode from '../../containers/barcode/barcode';
import ActivityIndicator from '../../containers/activity-indicator/activity-indicator';
//services
import NavigationService from './../../../services/route';
import { httpPost } from '../../../services/http';
import { urls } from '../../../constants/urls';
import { handleError } from '../../../services/http-error-handler';
import I18n from '@locales/I18n';
//
//
//
// get_received_bonuses get max refill
//
//
//
//
class Partners extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    currency: '',
    text: '',
    done: false
  };
  navigateBack = () => {
    NavigationService.navigate('Main');
  };
  componentDidMount = () => {
    this.props.loaderState(true);
    // this.setState({
    //   currency: this.props.navigation.state.params.currency || 'грн'
    // });
  };

  handleChange(text) {
    if (!text.includes('.') && !text.includes(',')) {
      this.setState({ text });
    } else {
      Alert.alert(
        'Allow only numbers',
        '',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  checkValidation() {
    Keyboard.dismiss();
    this.setState({ done: !this.state.done });
  }

  render() {
    console.log(this.props, 'PROPS');
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        {!this.state.done ? (
          <LinearGradient
            colors={[
              this.props.userColor.first_gradient_color,
              this.props.userColor.second_gradient_color
            ]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.grad}
          >
            <Button
              transparent
              onPress={() => this.navigateBack()}
              style={styles.navigation_item}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.icon}
                source={{ uri: ICONS.COMMON.NAVIGATE_BACK }}
              />
              <Text style={styles.back}>{I18n.t('HISTORY')}</Text>
            </Button>

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.avoiding}
              enabled
            >
              <ScrollView
                scrollEnabled={false}
                keyboardShouldPersistTaps={'handled'}
                //   style={styles.scrollView}
                contentContainerStyle={styles.scrollView}
              >
                <View>
                  <Text style={styles.header}>
                    Пополнение вашего мобильного
                  </Text>
                </View>
                <View>
                  <Text style={styles.subHead}>Введите сумму пополнения</Text>
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={text => this.handleChange(text)}
                  value={this.state.text}
                />
                <View>
                  <Text style={styles.subHead2}>
                    Максимальная сумма пополнения 200 грн
                  </Text>
                </View>

                <Button
                  rounded
                  block
                  style={styles.button}
                  onPress={() => {
                    this.checkValidation();
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: this.props.userColor.second_gradient_color }
                    ]}
                  >
                    {I18n.t('ACCEPT')}
                  </Text>
                </Button>
              </ScrollView>
            </KeyboardAvoidingView>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={[
              this.props.userColor.first_gradient_color,
              this.props.userColor.second_gradient_color
            ]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.grad}
          >
            <View style={styles.scrollView}>
              <Text style={styles.header}>Спасибо</Text>
              <Text style={styles.successText}>
                {"Ваш счет скоро будет пополнен \n +38 (093) 356 56 56"}
              </Text>
              <Button
                rounded
                block
                style={styles.button}
                onPress={() => {
                  this.navigateBack();
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: this.props.userColor.second_gradient_color }
                  ]}
                >
                  {I18n.t('OK')}
                </Text>
              </Button>
            </View>
          </LinearGradient>
        )}
        {this.props.loader && <ActivityIndicator />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userColor: state.userColor,
    token: state.token,
    location: state.location
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Partners);
