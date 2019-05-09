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
import { setBalance } from '@reducers/user-balance';
//constants
import styles from './styles';
import { ICONS } from '../../../constants/icons';
//containers
import ActivityIndicator from '../../containers/activity-indicator/activity-indicator';
//services
import NavigationService from './../../../services/route';
import { httpPost } from '../../../services/http';
import { urls } from '../../../constants/urls';
import I18n from '@locales/I18n';

class RefillMobile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    currency: '',
    amount: '',
    done: false,
    maxValue: 0,
    phone: ''
  };
  navigateBack = () => {
    NavigationService.navigate('Main');
  };
  componentDidMount = () => {
    this.props.loaderState(true);
    this.setState({
      currency: this.props.navigation.state.params.currency || 'грн',
      maxValue: this.props.navigation.state.params.maxValue || 0,
      phone: this.props.navigation.state.params.phone || ''
    });
    this.props.loaderState(false);
  };

  firstScreen() {
    return (
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
                {'Пополнение вашего мобильного'}
              </Text>
            </View>
            <View>
              <Text style={styles.subHead}>{'Введите сумму пополнения'}</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={amount => this.handleChange(amount)}
              value={this.state.amount}
            />
            <View>
              <Text style={styles.subHead2}>
                {`Максимальная сумма пополнения ${this.state.maxValue} ${
                  this.state.currency
                }`}
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
    );
  }

  doneScreen() {
    return (
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
          <Text style={styles.header}>{'Спасибо'}</Text>
          <Text style={styles.successText}>
            {`Ваш счет скоро будет пополнен \n ${this.state.phone}`}
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
    );
  }

  noMoneyScreen() {
    return (
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
        <View style={styles.scrollView}>
          <Text style={styles.noMoney}>
            {'Ваш лимит пополнения в этом месяце исчерпан'}
          </Text>
        </View>
      </LinearGradient>
    );
  }

  handleChange(amount) {
    if (!amount.includes('.') && !amount.includes(',')) {
      this.setState({ amount });
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
    this.props.loaderState(true);
    let body = {
      type: 'true',
      amount: this.state.amount
    };
    httpPost(urls.refill_mobile, JSON.stringify(body), this.props.token).then(
      result => {
        console.log(result, 'REFILL MOBILE RESULT');
        this.setState({ done: !this.state.done });
        this.props.loaderState(false);
        this.props.setBalance(result.body.user_wallet_amount);
      },
      error => {
        console.log(error, 'REFILL MOBILE ERROR');
        Alert.alert(
          `code: ${error.code}`,
          '',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false }
        );
        this.props.loaderState(false);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        {this.state.maxValue
          ? !this.state.done
            ? this.firstScreen()
            : this.doneScreen()
          : this.noMoneyScreen()}
        {this.props.loader && <ActivityIndicator />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userColor: state.userColor,
    token: state.token,
    location: state.location,
    loader: state.loader
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState,
      setBalance
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefillMobile);
